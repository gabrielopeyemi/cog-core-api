import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropectService } from './propect.service';
import { CreatePropectDto } from './dto/create-propect.dto';
import { UpdatePropectDto } from './dto/update-propect.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Propect')
@Controller('propect')
export class PropectController {
  constructor(private readonly propectService: PropectService) {}

  @Post()
  create(@Body() createPropectDto: CreatePropectDto) {
    return this.propectService.create(createPropectDto);
  }

  @Get()
  findAll() {
    return this.propectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropectDto: UpdatePropectDto) {
    return this.propectService.update(+id, updatePropectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propectService.remove(+id);
  }
}
