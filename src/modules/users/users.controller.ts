import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Permissions } from 'src/common/guards/permissions.decorator';
import { UserPermission } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Permissions(UserPermission.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Permissions(UserPermission.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Permissions(UserPermission.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.findUserNme(createUserDto.userName);
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @Permissions(UserPermission.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions(UserPermission.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
