import { Module } from '@nestjs/common';
import { ZooZoneAnimalService } from './zoo-zone-animal.service';
import { ZooZoneAnimalController } from './zoo-zone-animal.controller';
import { ZooZoneAnimal } from './entities/zoo-zone-animal.entity';
import { Converter } from 'src/lib/helpers/convert'
import { ZooZoneAnimalSchema } from 'src/schemas/zoo-zone-animal.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConverterModule } from 'src/lib/helpers/convert.module';

@Module({
  imports: [MongooseModule.forFeature([{name: ZooZoneAnimal.name, schema: ZooZoneAnimalSchema }]), ConverterModule],
  controllers: [ZooZoneAnimalController],
  providers: [ZooZoneAnimalService, Converter]
})
export class ZooZoneAnimalModule {}
