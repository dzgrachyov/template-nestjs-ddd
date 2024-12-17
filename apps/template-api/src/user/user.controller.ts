import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserEntityDto } from '@library/template-domain/dtos/user-entity.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string): boolean {
    return true
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() form: UserEntityDto, @Res() response: Response): Promise<UserEntityDto | boolean> {
    try {
      await this.userService.validateNewUser(form);
      const user = await this.userService.createNewUser(form);
      return UserEntityDto.fromEntity(user);
    }
    catch (error) {
      response.status(error.status).send(error);
    }
  }
}
