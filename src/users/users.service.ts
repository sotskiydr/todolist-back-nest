import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userSchema: Model<UserDocument>) {}

  async createUser(userDto: CreateUserDto) {
    const newUser = new this.userSchema(userDto)
    await newUser.save()
    return newUser
  }

  async getUserByEmail(email: string){
    const user = await this.userSchema.findOne({email})
    return user;
  }

  async saveUserToken(token: string, id: number){
    await this.userSchema.findByIdAndUpdate(id, { token });
  }

  async deleteUserToken(id: string){
    await this.userSchema.findByIdAndUpdate(id, { token: null });
  }

  async getCurrentUser(id, token){
    const user = await this.userSchema.findById({_id: id})
    if(user.token === token){
      return user;
    }
    throw new UnauthorizedException({message: 'user not authorization'});
  }

}
