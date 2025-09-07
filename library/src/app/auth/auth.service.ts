import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {

  private issuer = 'login';
  private audience = 'user';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      })

      return data
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token)
      return true
    } catch (error) {
      return false 
    }
  }

  async login(email: string, password: string) {

    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos!');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Email e/ou senha incorretos!');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto!');
    }

    const token = await this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: this.audience,
      }
    );

    return {token};
  }

  async reset(password: string, token: string) {
    try {
      const data:any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: this.audience,
      })

      if (isNaN(Number(data.id))) {
        throw new BadRequestException("Token é Inválid");
      }

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
  
      const user = await this.prismaService.user.update({
        where: {
          id: Number(data.id),
        },
        data: {
          password,
        },
      });
  
      return this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}