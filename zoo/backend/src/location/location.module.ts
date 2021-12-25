import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location, LocationSchema } from 'src/schemas/location.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Location.name, schema: LocationSchema }])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
