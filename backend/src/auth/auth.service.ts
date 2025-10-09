import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

import { RefreshToken } from './entities/refresh-token.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, email: string, password: string) {
    const existing = await this.userService.findByEmail(email);
    if (existing) throw new ConflictException('Email is already registered');

    const hash = await bcrypt.hash(password, 10);
    return this.userService.create({
      username,
      email,
      password: hash,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(
      { sub: user.id },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    await this.refreshRepo.save({
      token: refresh_token,
      user,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.userService.updateLastLogin(payload.sub);
    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(refresh_token: string) {
    try {
      this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const tokenInDb = await this.refreshRepo.findOne({
        where: { token: refresh_token },
        relations: ['user'],
      });
      if (!tokenInDb)
        throw new UnauthorizedException('Refresh token not found');

      const newPayload = {
        sub: tokenInDb.user.id,
        email: tokenInDb.user.email,
        role: tokenInDb.user.role,
      };

      const access_token = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      });
      return { access_token };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refresh_token: string) {
    const result = await this.refreshRepo.delete({ token: refresh_token });

    if (result.affected === 0)
      throw new NotFoundException('Refresh token not found');

    return { message: 'Logged out successfully' };
  }
}
