import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Schema as MongooseSchema } from 'mongoose';
import { Zoo } from 'src/zoo/entities/zoo.entity';


@Schema()
export class Order extends Document {

  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  email: string

  @Prop({ type: String })
  phone: string

  @Prop({ type: String })
  order_number: string

  @Prop({ type: Number })
  ticket_amount: number

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Zoo.name })
  zoo_id: MongooseSchema.Types.ObjectId
}

export const OrderSchema = SchemaFactory.createForClass(Order)