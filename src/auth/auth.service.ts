import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = username === "andrei" ? ["admin"] : []

    const payload = { username: user.username, sub: user.id, roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Create the user
    const newUser = await this.usersService.createUser(createUserDto);

    const roles = newUser.username === "andrei" ? ["admin"] : []

    // Return access token upon successful registration
    const payload = { username: newUser.username, sub: newUser.id, roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
