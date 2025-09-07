import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
}