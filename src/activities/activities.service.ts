  import { Injectable } from '@nestjs/common';
  import { CreateActivityDto } from './dto/create-activity.dto';
  import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from 'src/schema/activities.schema';
import { Model } from 'mongoose';

  @Injectable()
  export class ActivitiesService {
    constructor(
      @InjectModel(Activity.name)
      private activityModel: Model<ActivityDocument>,
    ) {}
    // Create a new activity
    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
      console.log({ createActivityDto });
      const newActivity = new this.activityModel(createActivityDto);
      return await newActivity.save();
    }

    // Find all activities
    async findAll(type: string, userId: string): Promise<Activity[]> {
      return await this.activityModel
        .find({ entityType: type, creatorId: userId })
        .exec();
    }

    // Find a specific activity by ID
    async findOne(id: string): Promise<Activity> {
      return await this.activityModel.findById(id).exec();
    }

    // Update a specific activity by ID
    async update(
      id: string,
      updateActivityDto: UpdateActivityDto,
    ): Promise<Activity> {
      return await this.activityModel
        .findByIdAndUpdate(id, updateActivityDto, { new: true })
        .exec();
    }

    // Remove a specific activity by ID
    async remove(id: string) {
      // return await this.activityModel.findByOneAndRemove({ _id: id }).exec();
    }
  }
