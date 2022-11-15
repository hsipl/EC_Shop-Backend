import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './user_auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secrect",
    });
  }

  async validate(name: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(name, password);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}