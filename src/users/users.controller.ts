import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DBService } from 'src/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private db: DBService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
  }

  @Get()
  findAll() {
    return this.db.user.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.db.user.findUnique({
      where: {
        id: +id,
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: {
        id: +id,
      },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.db.user.delete({
      where: { id: +id },
    });
  }
}
