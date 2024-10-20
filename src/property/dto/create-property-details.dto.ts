// src/property/dto/create-property-details.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { CreateUnitDto } from './create-unit.dto';
import { Type } from 'class-transformer';

export enum ApplicationType {
  RENTAL = 'RENTAL',
  SALE = 'SALE', // Add other types if applicable
}



export enum PaymentStyle {
  OFF_PLAN = 'OFF_PLAN',
  ON_PLAN = 'ON_PLAN', // Add other styles if necessary
}

export class CreatePropertyDetailsDto {
  @ApiProperty({
    default: 'Two bedroom apartmentt'
  })
  @IsString()
  propertyName: string;

  @ApiProperty({
    default: ApplicationType.SALE
  })
  @IsEnum(ApplicationType)
  applicationType: ApplicationType;

  @ApiProperty({
    default: 'New'
  })
  @IsString()
  propertyState: string;

  @ApiProperty({
    default: PaymentStyle.OFF_PLAN
  })
  @IsEnum(PaymentStyle)
  paymentStyle: PaymentStyle;

  @ApiProperty({ type: [CreateUnitDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateUnitDto)
  units: CreateUnitDto[];
}
