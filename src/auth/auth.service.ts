import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';


async function generateHash() {
const password = ['admin1234', 'user1234'];
for (const pwd of password ){
  const hash = await bcrypt.hash(pwd, 10);
  //console.log(hash);
}
}
generateHash();

@Injectable()
export class AuthService {

    

    private readonly users = [
        { 
             username: 'Admin', 
             password: '$2b$10$4xJw9G/L1TjgYw1k.S7aGuE/9pmSzB1D5Bb9idn8ZGCW8g5WQLdzW', 
             userId: 1,
         },
        {  
            username: 'User', 
            password: '$2b$10$6WNiXX5jn2SmMvRpq2rxjeFNn5DHGWvpv/iRWDBtxuvg9q/PlWM/a' , 
            userID: 2,

        },
    ];

    constructor(private readonly jwtService: JwtService) {}

    
    async validateUser(username: string, password: string): Promise<any>{

         //console.log('Username input:', username);
        //console.log('Password input:', password);
        const user = this.users.find(u => u.username == username);
        //console.log('Fund user: ',user);


        if(!user){
            throw new UnauthorizedException('Invalid username or password')
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if(!isPasswordMatching){
           
            throw new UnauthorizedException('Invalid username or password');
        }
        
        const { password: _, ...result } = user;
        return result;
        
    }

    async login(user: any){
        const payload = { username: user.username, sub: user.userId };
        return{
            access_token: this.jwtService.sign(payload, {expiresIn: '3600s'})
        };
    }
}
