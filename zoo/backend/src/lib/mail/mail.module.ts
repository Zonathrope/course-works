import { Module } from '@nestjs/common';
import { Mailer } from './mail.service';

@Module({
  providers: [Mailer]
})
export class MailerModule {}