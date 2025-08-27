import { IsString, IsOptional, IsDefined, IsEmail, Length, IsEnum, Matches } from 'class-validator';
import { UserPermission } from '../entities/user.entity';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @Length(3, 50) 
  userName: string;

  @IsDefined()
  @IsEmail() 
  @Length(5, 100)
  email: string;

  @IsDefined()
  @IsString()
  @Length(5, 50)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{};':",.<>/?\\|-]+$/, {
    message: 'Password must contain letters and numbers',
  })
  password: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  lastName?: string;

  @IsOptional()
  @IsEnum(UserPermission)
  permission?: UserPermission;
}
