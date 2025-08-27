import { IsNotEmpty, IsString, Length } from 'class-validator';
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  userName: string; // changed to match your request

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  password: string;
}
