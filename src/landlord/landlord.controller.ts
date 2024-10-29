import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { UpdateLandlordDto } from './dto/update-landlord.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithEmail } from 'src/utills/types';

@ApiTags('Landlord')
@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Body() createLandlordDto: CreateLandlordDto,
    @Request() req: RequestWithEmail,
  ) {
    return this.landlordService.create(createLandlordDto, req.user._id);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Request() req: RequestWithEmail) {
    return this.landlordService.findAll(req.user._id);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landlordService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLandlordDto: UpdateLandlordDto,
  ) {
    return this.landlordService.update(id, updateLandlordDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landlordService.remove(id);
  }
}


