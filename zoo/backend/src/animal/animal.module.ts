import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from 'src/schemas/animal.entity';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Animal.name, schema: AnimalSchema }])],
  controllers: [AnimalController],
  providers: [AnimalService]
})
export class AnimalModule {}
