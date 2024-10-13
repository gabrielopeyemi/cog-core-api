import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LandlordType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
}

export type LandlordDocument = Landlord & Document;

@Schema()
export class Landlord {
  @Prop({ enum: LandlordType })
  landlordType: LandlordType;

  @Prop()
  landlordName: string;

  @Prop()
  landlordAddress: string;

  @Prop()
  landlordNumber: string;
}

export const LandlordSchema = SchemaFactory.createForClass(Landlord);