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

class ScheduledPayout {
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

  @ApiProperty({ example: '+2348190234799' })
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsObject()
  propertyDetails: PropertyDetailsDto;

  @ApiProperty({ type: ScheduledPayout })
  @IsObject()
  scheduledPayout: ScheduledPayout;
}
