import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Platform } from 'src/platform/entities/platform.entity';
import { Handle } from './entities/handle.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JudgesModule } from 'src/judges/judges.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Platform, Handle]),
    AuthModule,
    JudgesModule
  ]
})
export class UserModule {}
