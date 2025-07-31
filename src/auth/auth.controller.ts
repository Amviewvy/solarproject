import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    async login(@Body() body: { username: string; password: string}) {
        console.log('login body:',body);
        const user = await this.authService.validateUser(body.username, body.password);
        //const token = await this.authService.login(user);
        //console.log('token: ',token);
        //return token;
        return this.authService.login(user);
    }
}
