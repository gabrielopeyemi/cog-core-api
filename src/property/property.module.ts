import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from 'src/schema/property.schema';
import { LandlordService } from 'src/landlord/landlord.service';
import { LandlordModule } from 'src/landlord/landlord.module';
import { Landlord, LandlordSchema } from 'src/schema/landlord.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: Landlord.name, schema: LandlordSchema },
    ]),
    LandlordModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService, LandlordService],
})
export class PropertyModule {}
