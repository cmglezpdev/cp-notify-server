import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestModule } from './contest/contest.module';
import { JudgesModule } from './judges/judges.module';
import { ProfileModule } from './profile/profile.module';
import { PlatformModule } from './platform/platform.module';
import { Platform } from './platform/entities/platform.entity';
import { Contest } from './contest/entities/contest.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ContestModule, 
    JudgesModule, 
    ProfileModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'cp-notify-development-database',
      database: 'CPNotify',
      entities: [Platform, Contest],
      synchronize: true,
      autoLoadEntities: true
    }),
    PlatformModule
  ],
})
export class AppModule {}
