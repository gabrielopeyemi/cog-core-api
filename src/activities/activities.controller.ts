import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ApiTags } from '@nestjs/swagger';
import { FindActivitiesDto } from './dto/find-activities.dto';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get(':type')
  findAll(@Param() params: FindActivitiesDto) {
    return this.activitiesService.findAll(params.type);
  }
}
