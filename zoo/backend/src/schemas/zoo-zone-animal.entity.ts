import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { Zoo } from './zoo.entity'
import { Zone } from './zone.entity'
import { Animal } from './animal.entity'
import { Document } from 'mongoose';

@Schema()
export class ZooZoneAnimal extends Document {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Zoo.name })
  zoo_id: MongooseSchema.Types.ObjectId

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Zone.name })
  zone_id: MongooseSchema.Types.ObjectId

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Animal.name })
  animal_id: MongooseSchema.Types.ObjectId
}

export const ZooZoneAnimalSchema = SchemaFactory.createForClass(ZooZoneAnimal);