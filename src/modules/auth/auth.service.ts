import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly JwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { userName, password } = loginDto;

    const user = await this.usersRepo.findOne({
      where: { userName: userName },
    });
    if (!user) throw new UnauthorizedException('Worng credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Wrong password');

    const peyload = { userId: user.id, userName: user.userName , permission: user.permission};
    const token = await this.JwtService.sign(peyload);

    return {
      access_token: token,
      user: {
        userId: user.id,
        userName: user.userName,
        permission: user.permission
      },
    };
  }
}
