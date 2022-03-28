import { Module } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [DBService],
})
export class UsersModule {}
