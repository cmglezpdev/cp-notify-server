import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ContestModule } from './contest/contest.module';
import { JudgesModule } from './judges/judges.module';
import { ProfileModule } from './profile/profile.module';
import { PlatformModule } from './platform/platform.module';
import { AuthModule } from './auth/auth.module';

import { Platform } from './platform/entities/platform.entity';
import { Contest } from './contest/entities/contest.entity';
import { User } from './user/entities/user.entity';
import { JoiValidationSchema } from './config/app.config';
import { UserModule } from './user/user.module';
import { Handle } from './user/entities/handle.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidationSchema
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Platform, Contest, User, Handle],
      synchronize: true,
      autoLoadEntities: true
    }),
    ContestModule, 
    JudgesModule, 
    ProfileModule,
    PlatformModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {}
