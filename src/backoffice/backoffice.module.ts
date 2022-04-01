import { Module } from '@nestjs/common';
import { BackofficeController } from './backoffice.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [BackofficeController],
  imports: [HttpModule],
})
export class BackofficeModule {}
