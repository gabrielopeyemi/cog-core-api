import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schema/users.schema';
import { Model } from 'mongoose';
import { AuthLoginResponse } from 'src/utills/types';
import { throwBadRequest } from 'src/utills/exceptions';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email.toLowerCase(),
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Retrieve all users
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // Find a user by ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  // Update a user by ID
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return updatedUser;
  }

  // Delete a user by ID
  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel
      .findOneAndDelete({ _id: id })
      .exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return deletedUser;
  }

  async userPasswordMatch(
    filter,
    password: string,
  ): Promise<AuthLoginResponse> {
    const ret = {} as AuthLoginResponse;
    await this.userModel.findOneAndUpdate(
      filter,
      { isOnline: true },
      { new: true },
    );
    const userInstance = (await this.userModel.findOne(filter)) as any;
    console.log({ userInstance, filter });
    if (userInstance === null || !userInstance.password) {
      throwBadRequest('Invalid credentials');
    }
    if (!userInstance?.color) {
      await this.userModel.findOneAndUpdate(
        filter,
        { new: true },
      );
    }
    ret.match = await userInstance.comparePassword(password);
    ret.details = userInstance.screenFields();

    return ret;
  }
}
