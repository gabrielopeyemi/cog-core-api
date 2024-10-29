import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  LandlordDocument,
  Property,
  PropertyDocument,
} from 'src/schema/property.schema';
import { Model } from 'mongoose';
import { Landlord } from 'src/schema/landlord.schema';
import { ActivitiesService } from 'src/activities/activities.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    @InjectModel(Landlord.name) private landlordModel: Model<LandlordDocument>,
    private activitiesService: ActivitiesService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, req: any) {
    const { landlord, ...rest } = createPropertyDto;

    // Start a session
    const session = await this.propertyModel.db.startSession();
    session.startTransaction();

    try {
      // Create the landlord document using new + save
      const newLandlord = new this.landlordModel(landlord);
      const createdLandlord = await newLandlord.save({ session });

      // Create the property document and link the landlord's ID
      const newProperty = new this.propertyModel({
        ...rest,
        landlordId: createdLandlord._id,
        creatorId: req._id
      });

      const property = await newProperty.save({ session });

      // Commit the transaction
      await session.commitTransaction();

      // Log activity for property creation
      await this.activitiesService.create({
        entityId: property._id,
        entityType: 'Property',
        activityType: 'Created',
        description: `Property ${property.property.propertyName} created with landlord ${createdLandlord.name}.`,
      });

      return {
        ...property.toObject(),
        landlord: createdLandlord.toObject(),
      };
    } catch (error) {
      // Abort the transaction in case of an error
      await session.abortTransaction();
      console.error('Transaction failed:', error);
      throw new BadRequestException('Failed to create property');
    } finally {
      // End the session
      session.endSession();
    }
  }

  async findAll(userId: string) {
    return await this.propertyModel
      .find({
        creatorId: userId
      })
      .populate({
        path: 'landlordId',
        model: this.landlordModel,
        select: '-password -__v',
      })
      .exec();
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
      throw new NotFoundException(`Property with ID "${id}" not found`);
    }

    // Log activity for property update
    await this.activitiesService.create({
      entityId: updatedProperty._id,
      entityType: 'Property',
      activityType: 'Updated',
      description: `Property ${updatedProperty?.property} updated.`,
    });

    return updatedProperty;
  }

  async remove(id: string) {
    const deletedProperty = await this.propertyModel
      .findOneAndDelete({ _id: id })
      .exec();
    if (!deletedProperty) {
      throw new NotFoundException(`Property with ID "${id}" not found`);
    }

    // Log activity for property deletion
    await this.activitiesService.create({
      entityId: deletedProperty._id,
      entityType: 'Property',
      activityType: 'Deleted',
      description: `Property ${deletedProperty?.property} deleted.`,
    });

    return deletedProperty;
  }
}
