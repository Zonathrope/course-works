import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';

import { Location  } from './location.entity'

@Schema()
export class Zoo extends Document  {

  @Prop()
  img: string;

  @Prop()
  name: string;

  @Prop()
  rating: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Location.name })
  location_id: MongooseSchema.Types.ObjectId
}

export const ZooSchema = SchemaFactory.createForClass(Zoo)