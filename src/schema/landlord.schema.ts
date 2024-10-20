import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LandlordType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
}

export type LandlordDocument = Landlord & Document;

@Schema()
export class PropertyDetails {
  @Prop()
  status: string; // 'new' or 'existing'
}

@Schema()
export class ScheduledPayout {
  @Prop()
  amount: number;

  @Prop()
  startDate: string; // ISO date string

  @Prop()
  duration: string; // e.g., '12 months'

  @Prop()
  frequency: string; // e.g., 'monthly'

  @Prop()
  accountNumber: string;

  @Prop()
  accountName: string;

  @Prop()
  bankName: string;
}

@Schema()
export class Landlord {
  @Prop({ enum: LandlordType })
  type: LandlordType;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: PropertyDetails})
  propertyDetails: PropertyDetails;
}

export const LandlordSchema = SchemaFactory.createForClass(Landlord);
