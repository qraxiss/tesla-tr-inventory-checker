import { Module } from '@nestjs/common';
import { TeslaService } from './tesla.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  providers: [TeslaService, TelegramService],
  imports: [TelegramModule]
})
export class TeslaModule { }
