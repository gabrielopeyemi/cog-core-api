import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Document types
export type PropertyDocument = Property & Document;
export type UnitDocument = Unit & Document;
export type LandlordDocument = Landlord & Document;
export type PropertyManagerDocument = PropertyManager & Document;

// Unit Schema
@Schema()
class Unit {
  @Prop()
  amount: string;

  @Prop()
  unitName: string;

  @Prop({ default: false })
  wifi: boolean;

  @Prop({ default: false })
  parkingSpace: boolean;

  @Prop({ default: false })
  heatingSystem: boolean;

  @Prop({ default: false })
  securityServices: boolean;

  @Prop({ default: false })
  smartHomes: boolean;

  @Prop({ default: false })
  loungeAndBar: boolean;

  @Prop({ default: false })
  kitchen: boolean;

  @Prop({ default: 0 })
  noKitchen: number;

  @Prop({ default: false })
  livingRoom: boolean;

  @Prop({ default: 0 })
  noLivingRoom: number;

  @Prop({ default: false })
  wasteDisposal: boolean;

  @Prop({ default: false })
  electricity: boolean;

  @Prop({ default: false })
  water: boolean;

  @Prop({ default: false })
  cleaningAndSanitation: boolean;

  @Prop({ default: false })
  accessControl: boolean;

  @Prop({ default: false })
  fitnessCenter: boolean;

  @Prop({ default: false })
  recreationalCenter: boolean;

  @Prop({ default: false })
  petsAllowed: boolean;

  @Prop({ default: false })
  garden: boolean;

  @Prop({ default: false })
  bedroom: boolean;

  @Prop({ default: 0 })
  noBedroom: number;

  @Prop({ default: false })
  restroom: boolean;

  @Prop({ default: 0 })
  noRestroom: number;
}
const UnitSchema = SchemaFactory.createForClass(Unit);

// Landlord Schema
@Schema()
class Landlord {
  @Prop({ required: true })
  landlordType: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    type: {
      propertyStatus: String,
    },
  })
  propertyDetails: Record<string, string>;
}
const LandlordSchema = SchemaFactory.createForClass(Landlord);

// Property Manager Schema
@Schema()
class PropertyManager {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  number: string;

  @Prop({ default: false })
  water: boolean;

  @Prop({ default: false })
  electricity: boolean;

  @Prop({ default: false })
  security: boolean;

  @Prop({ default: false })
  cleaning: boolean;

  @Prop({ default: false })
  maintenance: boolean;

  @Prop({ default: false })
  reception: boolean;
}
const PropertyManagerSchema = SchemaFactory.createForClass(PropertyManager);

// Property Schema
@Schema({ timestamps: true })
export class Property {
  @Prop({
    type: {
      propertyName: String,
      applicationType: String,
      propertyState: String,
      paymentStyle: String,
      units: [UnitSchema],
    },
  })
  property: Record<string, any>;

  @Prop({
    type: {
      typeOfProperty: String,
      propertyAddress: String,
    },
  })
  general: Record<string, string>;

  @Prop()
  landlordId: string;

  @Prop({ type: [PropertyManagerSchema] })
  propertyManager: PropertyManager[];
}
export const PropertySchema = SchemaFactory.createForClass(Property);
