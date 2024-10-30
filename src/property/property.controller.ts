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
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithEmail } from 'src/utills/types';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @Request() req: RequestWithEmail,
  ) {
    return this.propertyService.create(createPropertyDto, req);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Request() req: RequestWithEmail) {
    console.log({ 'req.user': req.user });
    return this.propertyService.findAll(req.user.details._id);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Request() req: RequestWithEmail,
  ) {
    return this.propertyService.update(id, updatePropertyDto, req.user._id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }
}
