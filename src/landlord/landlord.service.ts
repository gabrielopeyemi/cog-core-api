import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { UpdateLandlordDto } from './dto/update-landlord.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Landlord } from 'src/schema/landlord.schema';
import { LandlordDocument } from 'src/schema/property.schema';

@Injectable()
export class LandlordService {
  constructor(
    @InjectModel(Landlord.name) private landlordModel: Model<LandlordDocument>,
  ) {}

  async create(createLandlordDto: CreateLandlordDto) {
    const createdLandlord = new this.landlordModel(createLandlordDto);
    return createdLandlord.save();
  }

  async findAll() {
    return await this.landlordModel.find().exec();
  }

  async findOne(id: string) {
     const landlord = await this.landlordModel.findById(id);
     if (!landlord) {
       throw new NotFoundException(`Landlord with ID "${id}" not found`);
     }
     return landlord;
  }

  async update(id: string, updateLandlordDto: UpdateLandlordDto) {
     const updatedLandlord = await this.landlordModel
       .findByIdAndUpdate(id, updateLandlordDto, {
         new: true,
         runValidators: true,
       })
       .exec();
     if (!updatedLandlord) {
       throw new NotFoundException(`Landlord with ID "${id}" not found`);
     }
     return updatedLandlord;
  }

  async remove(id: string) {
    const deletedLandlord = await this.landlordModel
      .findOneAndDelete({ _id: id })
      .exec();
    if (!deletedLandlord) {
      throw new NotFoundException(`Landlord with ID "${id}" not found`);
    }
    return deletedLandlord;
  }
}
