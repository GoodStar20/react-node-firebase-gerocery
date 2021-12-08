import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';

@Controller('users-info')
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}

  @Get(':userId')
  getUserInfo(@Param('userId') userId: string) {
    return this.usersInfoService.getUserInfo(userId);
  }

  @Post()
  addNewUserInfo(
    @Body('userId') userId: string,
    @Body('email') email: string,
  ): Promise<HttpStatus> {
    return this.usersInfoService.addUserInfo(userId, email);
  }
}
