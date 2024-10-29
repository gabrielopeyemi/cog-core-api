import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordController } from './landlord.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Landlord, LandlordSchema } from 'src/schema/landlord.schema';
import { ActivitiesService } from 'src/activities/activities.service';
import { Activity, ActivitySchema } from 'src/schema/activities.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Landlord.name, schema: LandlordSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  controllers: [LandlordController],
  providers: [LandlordService, ActivitiesService],
})
export class LandlordModule {}
