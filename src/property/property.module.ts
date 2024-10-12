import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from 'src/schema/property.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Property.name, schema: PropertySchema}
  ])],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
