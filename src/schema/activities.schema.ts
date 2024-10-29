import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Document Type
export type ActivityDocument = Activity & Document;

// Activities Schema
@Schema({ timestamps: true })
export class Activity {
  @Prop({ required: true })
  entityId: string; // ID of the landlord or property associated with the activity

  @Prop({ required: true })
  entityType: 'Landlord' | 'Property'; //  to distinguish activity type

  @Prop({ required: true })
  activityType: string; // Type of activity, e.g., 'Created', 'Updated', etc.

  @Prop({ required: true })
  description: string; // Description of the activity

  @Prop({ type: Date, default: Date.now })
  timestamp: Date; // Timestamp of when the activity occurred
}

// Create schema from the Activity class
export const ActivitySchema = SchemaFactory.createForClass(Activity);
