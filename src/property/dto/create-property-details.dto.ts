// src/property/dto/create-property-details.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum ApplicationType {
  RENTAL = 'RENTAL',
  SALE = 'SALE', // Add other types if applicable
}

export enum TypeOfProperty {
  FLAT = 'FLAT',
  HOUSE = 'HOUSE',
  // Add other types as needed
}

export enum PaymentStyle {
  OFF_PLAN = 'OFF_PLAN',
  ON_PLAN = 'ON_PLAN', // Add other styles if necessary
}

export class CreatePropertyDetailsDto {
  @ApiProperty()
  @IsString()
  propertyName: string;

  @ApiProperty()
  @IsEnum(ApplicationType)
  applicationType: ApplicationType;

  @ApiProperty()
  @IsEnum(TypeOfProperty)
  typeOfProperty: TypeOfProperty;

  @ApiProperty()
  @IsString()
  propertyAddress: string;

  @ApiProperty()
  @IsString()
  propertyState: string;

  @ApiProperty()
  @IsEnum(PaymentStyle)
  paymentStyle: PaymentStyle;
}
