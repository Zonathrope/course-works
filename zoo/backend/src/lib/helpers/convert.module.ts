import { Module } from '@nestjs/common';
import { Converter } from './convert';

@Module({
  providers: [Converter]
})
export class ConverterModule {}