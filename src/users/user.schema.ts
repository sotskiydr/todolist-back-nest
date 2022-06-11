import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({default: null})
  token: string;

  @Prop({ default: false})
  banned: boolean;

  @Prop({ default: ''})
  banReason: string;

  @Prop({ default: ['USER']})
  roles: [];


}

export const UserSchema = SchemaFactory.createForClass(User);