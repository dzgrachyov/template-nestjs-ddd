import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserEntityDto } from '@library/template-domain';
import { AuthRole, AuthRoles, HttpAuthGuard } from '@library/http-auth';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorInterceptor } from '@library/template-common';

@Controller('user')
@UseInterceptors(ErrorInterceptor)
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @AuthRoles([AuthRole.Admin])
  @UseGuards(HttpAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: HttpStatus.OK })
  getUser(@Param('id') id: string): boolean {
    return true
  }

  @Post()
  @AuthRoles([AuthRole.Admin])
  @UseGuards(HttpAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data provided' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Some unexpected exception' })
  async createUser(@Body() form: UserEntityDto): Promise<UserEntityDto | boolean> {
    await this.userService.validateNewUser(form);
    const user = await this.userService.createNewUser(form);
    return UserEntityDto.fromEntity(user);
  }

  @Put(':id')
  @AuthRoles([AuthRole.Admin])
  @UseGuards(HttpAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data provided' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Some unexpected exception' })
  async updateUser(@Param('id') id: string, @Body() form: UserEntityDto): Promise<UserEntityDto | boolean> {
    await this.userService.validateUpdateUser(form);
    const user = await this.userService.updateUser({ id: +id }, form);
    return UserEntityDto.fromEntity(user);
  }

  @Delete(':id')
  @AuthRoles([AuthRole.Admin])
  @UseGuards(HttpAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data provided' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Some unexpected exception' })
  async deleteUser(@Param('id') id: string): Promise<UserEntityDto | boolean> {
    const user = await this.userService.deleteUser({ id: +id });
    return UserEntityDto.fromEntity(user);
  }
}
