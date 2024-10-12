// src/property/dto/create-property-manager.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreatePropertyManagerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber(null)
  number: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  water?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  electricity?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  security?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  cleaning?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  maintenance?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  reception?: boolean;
}
