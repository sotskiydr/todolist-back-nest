import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { UsersGuard } from "./user.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Authorization user'})
  @ApiResponse({status: 201, type: LoginUserDto})
  @Post('/login')
  login(@Body() userDto: LoginUserDto){
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 201, type: CreateUserDto})
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }

  @ApiOperation({summary: 'Logout user'})
  @ApiOkResponse({status: 201, description: 'Logout success'})
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() token: any){
    const id = token.user.id
    return this.authService.logout(id)
  }

  @ApiOperation({summary: 'Current user'})
  @ApiOkResponse({status: 201, type: CreateUserDto})
  @Get('/current')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() user: any){
    const token = user.headers.authorization.split(' ')[1]
    const id = user.user.id
    return this.authService.getCurrentUser(id, token)
  }

}