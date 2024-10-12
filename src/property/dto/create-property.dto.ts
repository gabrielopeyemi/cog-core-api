
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateLandlordDto } from './create-landlord.dto';
import { CreatePropertyDetailsDto } from './create-property-details.dto';
import { CreatePropertyManagerDto } from './create-property-manager.dto';
import { CreateUnitDto } from './create-unit.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePropertyDetailsDto)
  @IsNotEmpty()
  property: CreatePropertyDetailsDto;

  @ApiProperty({ type: [CreateUnitDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateUnitDto)
  units: CreateUnitDto[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateLandlordDto)
  @IsNotEmpty()
  landlord: CreateLandlordDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePropertyManagerDto)
  @IsNotEmpty()
  propertyManager: CreatePropertyManagerDto;
}
