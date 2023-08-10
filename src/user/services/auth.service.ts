import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const token = await this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = await this._createToken(user);

    return {
      email: user.mail,
      ...token,
    };
  }

  async handleVerifyToken(token) {
    try {
      const payload = this.jwtService.verify(token); // this.configService.get('SECRETKEY')
      return payload['email'];
    } catch (e) {
      throw new HttpException(
        {
          key: '',
          data: {},
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async validateUser(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async getAccess2FA(user) {
    return this._createToken(user, true);
  }

  // async refresh(refresh_token) {
  //   try {
  //     const payload = await this.jwtService.verify(refresh_token, {
  //       secret: process.env.SECRETKEY_REFRESH,
  //     });
  //     const user = await this.userService.getUserByRefresh(refresh_token, payload.email);
  //     const token = await this._createToken(user, true, false);
  //     return {
  //       email: user.email,
  //       ...token,
  //     };
  //   } catch (e) {
  //     throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  //   }
  // }
  //
  // async logout(user: User) {
  //   await this.userService.update({ email: user.mail }, { refreshToken: null });
  // }

  private async _createToken({ mail }, isSecondFactorAuthenticated = false, refresh = true) {
    const accessToken = this.jwtService.sign({
      mail,
      isSecondFactorAuthenticated,
    });
    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { mail },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.userService.update(
        { mail: mail },
        {
          refreshToken: refreshToken,
        },
      );
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRESIN_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }
}
