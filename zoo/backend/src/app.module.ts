import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZooModule } from './zoo/zoo.module';
import { AnimalModule } from './animal/animal.module';
import { ZoneModule } from './zone/zone.module';
import { OrderModule } from './order/order.module';
import { ZooZoneAnimalModule } from './zoo-zone-animal/zoo-zone-animal.module';
import { LocationModule } from './location/location.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://12345:12345@maincluster.sg7ka.mongodb.net/ZeeZoodb?retryWrites=true&w=majority'),
    ZooModule,
    AnimalModule,
    ZoneModule,
    OrderModule,
    LocationModule,
    ZooZoneAnimalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
