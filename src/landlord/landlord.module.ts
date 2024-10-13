import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordController } from './landlord.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Landlord, LandlordSchema } from 'src/schema/landlord.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Landlord.name, schema: LandlordSchema}
  ])],
  controllers: [LandlordController],
  providers: [LandlordService],
})
export class LandlordModule {}
