import {Module} from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';



@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UsersModule,
        AuthModule
    ]
})
export class AppModule {

}