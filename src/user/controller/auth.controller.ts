import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/user/dto/user.dto';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from 'src/common/response/ApiResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.authService.register(createUserDto);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(400, error.message);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const result = await this.authService.login(loginUserDto);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(400, error.message);
    }
  }

  // @Post('refresh')
  // async refresh(@Body() body) {
  //   return await this.authService.refresh(body.refresh_token);
  // }
  //
  // @UseGuards(AuthGuard())
  // @Post('logout')
  // async logout(@Req() req: any) {
  //   await this.authService.logout(req.user);
  //   return {
  //     statusCode: 200,
  //   };
  // }
}
