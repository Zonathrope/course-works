import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { Zone, ZoneSchema } from 'src/schemas/zone.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Zone.name, schema: ZoneSchema }])],
  controllers: [ZoneController],
  providers: [ZoneService]
})
export class ZoneModule {}
