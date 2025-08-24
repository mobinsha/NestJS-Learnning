import { IsString, IsOptional, IsDefined, Length } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @Length(3, 15)
  userName: string;

  @IsDefined()
  @IsString()
  @Length(5, 30)
  password: string;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  fullName: string;
}
