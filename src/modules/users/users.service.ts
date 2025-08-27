import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserNme(userName: string) {
    const user = await this.usersRepo.findOne({ where: { userName } });
    if (user) throw new ConflictException('Username already exists');
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    await this.findUserNme(createUserDto.userName);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.usersRepo.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const curretuser = await this.usersRepo.findOne({ where: { id } });
    if (!curretuser) throw new NotFoundException('User not found');

    if (
      updateUserDto.userName &&
      updateUserDto.userName !== curretuser.userName
    ) {
      const username = updateUserDto.userName?.trim();
      // i don't know why here existingUser has a null output... (fix it soo)
      const existingUser = await this.usersRepo.findOne({
        where: { userName: username },
      });

      if (existingUser) {
        throw new ConflictException('Username already exist');
      }
    }

    await this.usersRepo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.usersRepo.delete(id);
    return { deleted: true };
  }
}
