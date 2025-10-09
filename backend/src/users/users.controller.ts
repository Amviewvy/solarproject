import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() body: Partial<User>): Promise<User> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request): Promise<User[]> {
    const userPayload = req.user as { email: string; sub: number };
    const user = await this.userService.findByEmail(userPayload.email);

    if (!user) throw new Error('User not found');

    return [user];
  }
}
