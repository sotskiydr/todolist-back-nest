import { CreateUserDto } from "../users/dto/create-user.dto";
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from "../users/dto/login-user.dto";


@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: LoginUserDto){
    const user = await this.validateUser(userDto)
    const token = await this.generateToken(user, 'login')
    await this.userService.saveUserToken(token.token, user.id)
    return token
  }

  async logout(id: string){
    try {
      await this.userService.deleteUserToken(id)
      return 'logout success'
    } catch (e){
      throw new HttpException("logout error", HttpStatus.BAD_REQUEST);
    }
  }

  getCurrentUser(id: string, token: string) {
    const user = this.userService.getCurrentUser(id, token)
    return user
  }

  async registration(userDto: CreateUserDto){
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if(candidate) {
      throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10)
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    const token = await this.generateToken(user, 'registration')
    await this.userService.saveUserToken(token.token, user.id)
    return token
  }

  async generateToken(user, action: string){
    const payload = action === 'registration' ? {name: user.name, email: user.email, id: user.id} :
      {email: user.email, id: user.id}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: LoginUserDto) {
    try {
      const user = await this.userService.getUserByEmail(userDto.email)
      const passwordEquals = await bcrypt.compare(userDto.password, user.password)
      if( user && passwordEquals ) return user;
      throw new UnauthorizedException({message: 'user is not exist or wrong password'})
    }catch (e) {
      throw new UnauthorizedException({message: 'user is not exist or wrong password'})
    }
  }

}