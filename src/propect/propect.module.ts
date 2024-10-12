import { Module } from '@nestjs/common';
import { PropectService } from './propect.service';
import { PropectController } from './propect.controller';

@Module({
  controllers: [PropectController],
  providers: [PropectService],
})
export class PropectModule {}
