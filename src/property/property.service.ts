import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from 'src/schema/property.schema';
import { Model } from 'mongoose';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  create(createPropertyDto: CreatePropertyDto, req: any) {
    const createdProperty = new this.propertyModel(createPropertyDto);
    return createdProperty.save();
  }

  async findAll() {
    return await this.propertyModel.find().exec();
  }

  async findOne(id: string) {
    const property = await this.propertyModel.findById(id);
       if (!property) {
         throw new NotFoundException(`Property with ID "${id}" not found`);
       }
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
     const updatedProperty = await this.propertyModel
       .findByIdAndUpdate(id, updatePropertyDto, {
         new: true,
         runValidators: true,
       })
       .exec();
     if (!updatedProperty) {
       throw new NotFoundException(`User with ID "${id}" not found`);
     }
     return updatedProperty;
  }

  async remove(id: string) {
    const deletedProperty = await this.propertyModel
      .findOneAndDelete({ _id: id })
      .exec();
    if (!deletedProperty) {
      throw new NotFoundException(`Property with ID "${id}" not found`);
    }
    return deletedProperty;
  }
}
