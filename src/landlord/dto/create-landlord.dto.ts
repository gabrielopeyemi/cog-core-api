import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsObject,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export enum LandlordType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
}

export class PropertyDetailsDto {
  @ApiProperty({ example: 'new' })
  @IsString()
  propertyStatus: string;

  @ApiProperty({ example: ['dsvweECSVFSECZSX', 'ABCD1234XYZ'], isArray: true })
  @IsString({ each: true })
  propertyId: string[];
}

class ScheduledPayouts {
  @ApiProperty({ example: 1000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2024-01-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: 12 })
  @IsNumber()
  duration: number; // in months

  @ApiProperty({ example: 'monthly' })
  @IsString()
  frequency: string; // e.g., 'monthly', 'quarterly'

  @ApiProperty({ example: '123456789' })
  @IsString()
  accountNumber: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  accountName: string;

  @ApiProperty({ example: 'Bank of Springfield' })
  @IsString()
  bankName: string;
}

export class ScheduledPayoutDto {
  @ApiProperty({ example: 100000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2024-10-01' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: '12 months' })
  @IsString()
  duration: string;

  @ApiProperty({ example: 'monthly' })
  @IsString()
  frequency: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  accountNumber: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  accountName: string;

  @ApiProperty({ example: 'Marvel Bank' })
  @IsString()
  bankName: string;
}

export class CreateLandlordDto {
  @ApiProperty({
    default: LandlordType.INDIVIDUAL,
  })
  @IsEnum(LandlordType)
  landlordType: LandlordType;

  @ApiProperty({ example: 'John Oluwadeji' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'No 18, Marvel st, Agege, Lagos' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'john.oluwadeji@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+2348190234799' })
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsObject()
  propertyDetails: PropertyDetailsDto;

  @ApiProperty({ type: ScheduledPayouts })
  scheduledPayouts: ScheduledPayouts;
}
