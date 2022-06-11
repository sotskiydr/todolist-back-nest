import {ApiProperty} from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({example: 'John', description: "user name"})
  @IsString({message: 'email must be string'})
  @Length(3, 16, { message:
      'name must be at least 3 and no more than 16 characters'
  })
  readonly name: string;

  @ApiProperty({example: 'user@gmail.com', description: 'email'})
  @IsString({message: 'email must be is string'})
  @IsEmail({}, {message: 'incorrect email'})
  readonly email: string;

  @ApiProperty({example: '098765Am43', description: 'user password'})
  @IsString({message: 'email must be is string'})
  @Length(6, 16, {
    message: 'password must be at least 6 and no more than 16 characters'
  })
  readonly password: string;
}