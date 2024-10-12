import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Document types
export type PropertyDocument = Property & Document;
export type UnitDocument = Unit & Document;
export type LandlordDocument = Landlord & Document;
export type PropertyManagerDocument = PropertyManager & Document;

@Schema()
class Unit {
  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
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

@Schema()
class Landlord {
  @Prop({ required: true })
  landlordType: string;

  @Prop({ required: true })
  landlordName: string;

  @Prop()
  landlordAddress: string;

  @Prop({ required: true })
  landlordNumber: string;
}
const LandlordSchema = SchemaFactory.createForClass(Landlord);

@Schema()
class PropertyManager {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ required: true })
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

@Schema({ timestamps: true })
export class Property {
  @Prop({
    type: {
      propertyName: String,
      applicationType: String,
      typeOfProperty: String,
      propertyAddress: String,
      propertyState: String,
      paymentStyle: String,
    },
    required: true,
  })
  property: Record<string, string>;

  @Prop({ type: [UnitSchema], required: true })
  units: Unit[];

  @Prop({ type: LandlordSchema, required: true })
  landlord: Landlord;

  @Prop({ type: PropertyManagerSchema, required: true })
  propertyManager: PropertyManager;
}
export const PropertySchema = SchemaFactory.createForClass(Property);
