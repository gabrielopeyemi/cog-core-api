import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export enum LandlordType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
}

export class CreateLandlordDto {
  @ApiProperty({
    default: LandlordType.INDIVIDUAL
  })
  @IsEnum(LandlordType)
  landlordType: LandlordType;

  @ApiProperty({
    default: 'John oluwadeji'
  })
  @IsString()
  landlordName: string;

  @ApiProperty({
    default: 'No 18, Marvel st, Agege, Lagos'
  })
  @IsString()
  landlordAddress: string;

  @ApiProperty({
    default: '+2348190234799'
  })
  @IsString()
  landlordNumber: string;
}
