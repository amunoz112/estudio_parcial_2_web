import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [ TypeOrmModule.forFeature([User])],

  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
