
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export enum LandlordType {
  INDIVIDUAL = 'Individual',
  COMPANY = 'Company',
  // Add other types if necessary
}

export class CreateLandlordDto {
  @ApiProperty()
  @IsEnum(LandlordType)
  landlordType: LandlordType;

  @ApiProperty()
  @IsString()
  landlordName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  landlordAddress?: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber(null)
  landlordNumber: string;
}
