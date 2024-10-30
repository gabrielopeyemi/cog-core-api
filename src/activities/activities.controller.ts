import {
  Controller,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindActivitiesDto } from './dto/find-activities.dto';
import { RequestWithEmail } from 'src/utills/types';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @ApiBearerAuth()
  @Get(':type')
  findAll(
    @Param() params: FindActivitiesDto,
    @Request() req: RequestWithEmail,
  ) {
    console.log({ 'req?.user': req?.user });
    return this.activitiesService.findAll(params.type, req?.user?.details?._id);
  }
}
