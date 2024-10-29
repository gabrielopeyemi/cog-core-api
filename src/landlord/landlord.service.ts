import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { UpdateLandlordDto } from './dto/update-landlord.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Landlord } from 'src/schema/landlord.schema';
import { LandlordDocument } from 'src/schema/property.schema';
import { ActivitiesService } from 'src/activities/activities.service';
// import { Activity } from 'src/activities/schemas/activity.schema';

@Injectable()
export class LandlordService {
  constructor(
    @InjectModel(Landlord.name) 
    private landlordModel: Model<LandlordDocument>,
    private activitiesService: ActivitiesService,
  ) {}

  // Create a new landlord and log the activity
  async create(createLandlordDto: CreateLandlordDto) {
    const createdLandlord = new this.landlordModel(createLandlordDto);
    const savedLandlord = await createdLandlord.save();

    // Log activity
    await this.activitiesService.create({
      entityId: savedLandlord._id,
      entityType: 'Landlord',
      activityType: 'Created',
      description: `Landlord ${savedLandlord.name} created.`,
    });

    return savedLandlord;
  }

  // Find all landlords
  async findAll() {
    return await this.landlordModel.find().exec();
  }

  // Find a landlord by ID
  async findOne(id: string) {
    const landlord = await this.landlordModel.findById(id);
    if (!landlord) {
      throw new NotFoundException(`Landlord with ID "${id}" not found`);
    }
    return landlord;
  }

  // Update a landlord and log the activity
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

    // Log activity
    await this.activitiesService.create({
      entityId: updatedLandlord._id,
      entityType: 'Landlord',
      activityType: 'Updated',
      description: `Landlord ${updatedLandlord.name} updated.`,
    });

    return updatedLandlord;
  }

  // Remove a landlord and log the activity
  async remove(id: string) {
    const deletedLandlord = await this.landlordModel
      .findOneAndDelete({ _id: id })
      .exec();

    if (!deletedLandlord) {
      throw new NotFoundException(`Landlord with ID "${id}" not found`);
    }

    // Log activity
    await this.activitiesService.create({
      entityId: deletedLandlord._id,
      entityType: 'Landlord',
      activityType: 'Deleted',
      description: `Landlord ${deletedLandlord.name} deleted.`,
    });

    return deletedLandlord;
  }
}
