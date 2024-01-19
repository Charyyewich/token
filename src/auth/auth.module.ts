import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './auth.constants';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetMetadata } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type:'postgres',
    host:'192.168.113.12',
    port: 5432,
    password:'map11312!',
    username:'postgres',
    entities:[],
    database:'testdb'
    }),
    UsersModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '60s'},
  }),],
  controllers: [AuthController],
  exports: [UsersModule],
  providers:[AuthService],  
})

export class AuthModule {}
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);