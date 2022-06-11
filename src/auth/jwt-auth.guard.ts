import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      // const userToken = this.userService.getCurrentUser()
      if(bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'user not authorization'});
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    }catch (e) {
      console.log(e)
      throw new UnauthorizedException({message: 'user not authorization'});
    }
  }

}