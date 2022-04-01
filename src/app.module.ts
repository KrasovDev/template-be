import { Module } from '@nestjs/common';
import { DBService } from './db.service';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [BackofficeModule],
  controllers: [],
  providers: [DBService],
})
export class AppModule {}
