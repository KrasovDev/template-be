import { Module } from '@nestjs/common';
import { BO_AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { BO_UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';

@Module({
  controllers: [BO_UsersController, BO_AuthController],
  imports: [
    HttpModule,
    MulterModule.register({
      dest: path.join(__dirname, '../upload'),
    }),
  ],
})
export class BackofficeModule {}
