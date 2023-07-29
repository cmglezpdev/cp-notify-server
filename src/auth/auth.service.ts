import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dth';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      user.password = bcrypt.hashSync(user.password, 10);
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({ userId: user.id })
      }
    } catch (error) {
      this.throwErrorMessages(error);
    }
  }

  async loginUser(user: LoginUserDto) {
    const { email, password } = user;
    const userFromDb = await this.userRepository.findOneBy({ email });
    if(!userFromDb) throw new BadRequestException('The user doesn\'t exist.')
    const checkPassword = bcrypt.compareSync(password, userFromDb.password);
    if(!checkPassword) throw new UnauthorizedException("The password is incorrect.");
    delete userFromDb.password;
    return {
      ...userFromDb,
      token: this.getJwtToken({ userId: userFromDb.id })
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token; 
  }

  private throwErrorMessages(error: any) {
    switch( error.code ) {
      case "23505":
        throw new BadRequestException(this.throwErrorMessages(error));
      default:
        throw new InternalServerErrorException("Internal Server Error. Please Check Server Logs");
    }
  }
}
