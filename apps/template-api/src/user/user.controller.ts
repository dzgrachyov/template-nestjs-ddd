import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntityDto } from '@library/template-domain/dtos/user-entity.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: number): boolean {
    return true
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() form: UserEntityDto): Promise<UserEntityDto | boolean> {
    this.userService.validateNewUser(form);
    const user = await this.userService.createNewUser(form);
    return UserEntityDto.fromEntity(user);
  }
}
