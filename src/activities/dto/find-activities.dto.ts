import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class FindActivitiesDto {
  @ApiProperty({
    description: 'Type of activity to retrieve',
    enum: ['Landlord', 'Property'],
  })
  @IsEnum(['Landlord', 'Property'])
  type: 'Landlord' | 'Property';
}
