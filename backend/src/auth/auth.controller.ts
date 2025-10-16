import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async signup(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signup(username, email, password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') token: string) {
    return this.authService.refresh(token);
  }

  @Post('logout')
  async logout(@Body('refresh_token') token: string) {
    await this.authService.logout(token);
    return { message: 'Logged out' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const g = req.user as {
      email?: string;
      firstName?: string;
      lastName?: string;
      picture?: string;
      provider: 'google';
      providerId: string;
    };

    if (!g?.email) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_email`);
    }

    let user = await this.userService.findByEmail(g.email);
    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hash = await bcrypt.hash(randomPassword, 10);

      const username =
        g.firstName?.trim() ||
        g.email.split('@')[0] ||
        'user_' + Math.random().toString(36).slice(2, 8);

      user = await this.userService.create({
        username,
        email: g.email,
        password: hash,
      });
    }
    
    const { access_token, refresh_token } = await this.authService.login(user);

    const payload = { access_token, refresh_token };
    const encoded = encodeURIComponent(
      Buffer.from(JSON.stringify(payload)).toString('base64'),
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth/callback?payload=${encoded}`,
    );
  }
}
