import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserEntityDto, AuthRole, AuthRoles, HttpAuthGuard, ErrorInterceptor } from '@library/template-domain';

@UseInterceptors(ErrorInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @AuthRoles([AuthRole.Admin])
  @UseGuards(HttpAuthGuard)
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string): boolean {
    return true
  }

  @Post()
  @AuthRoles([AuthRole.Admin])
  @UseGuards(HttpAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() form: UserEntityDto, @Res() response: Response): Promise<UserEntityDto | boolean> {
    await this.userService.validateNewUser(form);
    const user = await this.userService.createNewUser(form);
    return UserEntityDto.fromEntity(user);
  }
}
