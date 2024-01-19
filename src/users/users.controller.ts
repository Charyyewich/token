import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.module';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    create()  {
        return {}
    }

    // @Public()
    @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return ;
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return {};
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {};
  }    
}
