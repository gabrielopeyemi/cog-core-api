import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LandlordDocument, Property, PropertyDocument } from 'src/schema/property.schema';
import { Model } from 'mongoose';
import { Landlord } from 'src/schema/landlord.schema';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    @InjectModel(Landlord.name) private landlordModel: Model<LandlordDocument>,
  ) {}

  // async create(createPropertyDto: CreatePropertyDto, req: any) {
  //   const { landlord, ...rest } = createPropertyDto;

  //   // Start a session
  //   const session = await this.propertyModel.db.startSession();
  //   session.startTransaction();

  //   try {
  //     // Create landlord document within the session
  //     const createdLandlord = await this.landlordModel.create([landlord], {
  //       session,
  //     });

  //     // Create property document and link landlord's ID
  //     const createdProperty = new this.propertyModel({
  //       ...rest,
  //       landlordId: createdLandlord[0]._id,
  //     });

  //     // Save the property within the session
  //     const property = await createdProperty.save({ session });

  //     // Commit the transaction
  //     await session.commitTransaction();

  //     return {
  //       ...property.toObject(),
  //       landlord: createdLandlord[0],
  //     };
  //   } catch (error) {
  //     // Abort the transaction in case of an error
  //     await session.abortTransaction();
  //     throw new BadRequestException('Failed to create property');
  //   } finally {
  //     // End the session
  //     session.endSession();
  //   }
  // }

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
      });

      const property = await newProperty.save({ session });

      // Commit the transaction
      await session.commitTransaction();

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

  async findAll() {
    return await this.propertyModel.find().populate({
      path: 'landlordId',
      model: this.landlordModel, 
      select: '-password -__v',
    }).exec();
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
