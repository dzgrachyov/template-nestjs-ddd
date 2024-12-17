import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntityDto } from '@library/template-domain/dtos/user-entity.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id') id: number): boolean {
    return true
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() form: UserEntityDto): Promise<UserEntityDto | boolean> {
    const errors = this.userService.validateNewUser(form);
    if (errors) {
      return false;
    }

    const user = await this.userService.createNewUser(form);
    if (!user) {
      return false;
    }

    return UserEntityDto.fromEntity(user);
  }
}
