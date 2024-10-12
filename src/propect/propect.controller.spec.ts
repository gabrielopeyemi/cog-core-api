import { Test, TestingModule } from '@nestjs/testing';
import { PropectController } from './propect.controller';
import { PropectService } from './propect.service';

describe('PropectController', () => {
  let controller: PropectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropectController],
      providers: [PropectService],
    }).compile();

    controller = module.get<PropectController>(PropectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
