// src/property/dto/create-unit.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  unitName: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  wifi?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  parkingSpace?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  heatingSystem?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  securityServices?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  smartHomes?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  loungeAndBar?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  kitchen?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  noKitchen?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  livingRoom?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  noLivingRoom?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  wasteDisposal?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  electricity?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  water?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  cleaningAndSanitation?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  accessControl?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  fitnessCenter?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  recreationalCenter?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  petsAllowed?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  garden?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  bedroom?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  noBedroom?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  restroom?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  noRestroom?: number;
}


