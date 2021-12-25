import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Zone extends Document {

  @Prop({ type: String })
  type: string

  @Prop({ type: String })
  world_part: string

}

export const ZoneSchema = SchemaFactory.createForClass(Zone)
