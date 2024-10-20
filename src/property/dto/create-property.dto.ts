
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLandlordForPropertyDto } from './create-landlord.dto';
import { CreatePropertyDetailsDto } from './create-property-details.dto';
import { CreatePropertyManagerDto } from './create-property-manager.dto';
import { ApiProperty } from '@nestjs/swagger';

export enum TypeOfProperty {
  WAREHOUSE = 'Warehouse/storage facility',
  WHOLE_HOME = 'Whole home',
  OFFICE_SPACE = 'Office space',
  RETAIL_SHOP = 'Retail shop space',
}

export class GeneralDto {

  @ApiProperty({
    default: TypeOfProperty.WHOLE_HOME
  })
  @IsEnum(TypeOfProperty)
  typeOfProperty: TypeOfProperty;

  @ApiProperty({
    default: 'Lekki phase one'
  })
  @IsString()
  propertyAddress: string;
}

export class CreatePropertyDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePropertyDetailsDto)
  @IsNotEmpty()
  property: CreatePropertyDetailsDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GeneralDto)
  @IsNotEmpty()
  general: GeneralDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateLandlordForPropertyDto)
  @IsNotEmpty()
  landlord: CreateLandlordForPropertyDto;

  @ApiProperty({ type: [CreatePropertyManagerDto] })
  @ValidateNested()
  @Type(() => CreatePropertyManagerDto)
  @IsNotEmpty()
  propertyManager: CreatePropertyManagerDto[];
}
