import { Module } from '@nestjs/common';
import { ZooService } from './zoo.service';
import { ZooController } from './zoo.controller';
import { Zoo, ZooSchema } from 'src/schemas/zoo.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Zoo.name, schema: ZooSchema }])],
  controllers: [ZooController],
  providers: [ZooService],
})
export class ZooModule {}
