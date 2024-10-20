
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateLandlordDto } from 'src/landlord/dto/create-landlord.dto';

export enum LandlordType {
  INDIVIDUAL = 'Individual',
  COMPANY = 'Company',
  // Add other types if necessary
}

export class CreateLandlordForPropertyDto extends PartialType(CreateLandlordDto) {}
