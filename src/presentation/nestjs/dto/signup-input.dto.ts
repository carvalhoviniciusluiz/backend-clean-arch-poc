import { IsEmail, IsString } from 'class-validator';

export class SignUpInputDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
