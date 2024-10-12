import { Test, TestingModule } from '@nestjs/testing';
import { PropectService } from './propect.service';

describe('PropectService', () => {
  let service: PropectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropectService],
    }).compile();

    service = module.get<PropectService>(PropectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
