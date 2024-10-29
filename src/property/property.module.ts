import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from 'src/schema/property.schema';
import { LandlordService } from 'src/landlord/landlord.service';
import { LandlordModule } from 'src/landlord/landlord.module';
import { Landlord, LandlordSchema } from 'src/schema/landlord.schema';
import { Activity, ActivitySchema } from 'src/schema/activities.schema';
import { ActivitiesService } from 'src/activities/activities.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: Landlord.name, schema: LandlordSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
    LandlordModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService, LandlordService, ActivitiesService],
})
export class PropertyModule {}
