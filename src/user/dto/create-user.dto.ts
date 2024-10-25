// src/users/dto/create-user.dto.ts

import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/utills/enums/roles.enum';
import { UserType } from 'src/utills/enums/user-type.enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'username',
    default: 'adewale@yupmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'adewale',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    default: 'ademola',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    default: 'Adewale@12',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: 'Adewale@12',
  })
  @IsString()
  @IsNotEmpty()
  comfirmPassword: string;

  @ApiProperty({
    default: '+2347045678902',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    default: 'individual',
  })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;

  @ApiProperty({
    default: Role.CLIENT,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
