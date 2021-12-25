import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Animal extends Document {

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  specie: string;

  @Prop({ type: String })
  year_old: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal)
