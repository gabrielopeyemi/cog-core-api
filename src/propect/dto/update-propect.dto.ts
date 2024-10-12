import { PartialType } from '@nestjs/swagger';
import { CreatePropectDto } from './create-propect.dto';

export class UpdatePropectDto extends PartialType(CreatePropectDto) {}
