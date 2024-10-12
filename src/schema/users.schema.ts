// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/utills/enums/user-type.enums';
import { Role } from 'src/utills/enums/roles.enum';
import { comparePassword, screenFields, toJSON } from 'src/utills';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, required: true, default: Role.BASIC })
  role: Role;

  @Prop({ default: false })
  is_verified: boolean;

  phoneNumber: string;

  @Prop({ enum: UserType, required: true, default: UserType.INDIVIDUAL })
  userType: UserType;

  @Prop({ default: null })
  passwordToken: string | null;

  @Prop({ default: null })
  passwordResetExpires: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = comparePassword;

UserSchema.methods.toJSON = toJSON;

UserSchema.methods.screenFields = screenFields;

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
