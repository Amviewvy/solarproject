import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ email: email });
    if (!user) return null;

    return this.userRepo.findOneBy({
      email,
    });
  }

  async updateLastLogin(id: number) {
    await this.userRepo.update(id, { last_login: new Date() });
  }
}
