import { Injectable } from '@nestjs/common';
import { CreatePropectDto } from './dto/create-propect.dto';
import { UpdatePropectDto } from './dto/update-propect.dto';

@Injectable()
export class PropectService {
  create(createPropectDto: CreatePropectDto) {
    return 'This action adds a new propect';
  }

  findAll() {
    return `This action returns all propect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propect`;
  }

  update(id: number, updatePropectDto: UpdatePropectDto) {
    return `This action updates a #${id} propect`;
  }

  remove(id: number) {
    return `This action removes a #${id} propect`;
  }
}
