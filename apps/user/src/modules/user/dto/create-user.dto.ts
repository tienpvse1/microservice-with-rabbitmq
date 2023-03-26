import { IsString, IsEmail, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsObject()
  customData: object;
}
