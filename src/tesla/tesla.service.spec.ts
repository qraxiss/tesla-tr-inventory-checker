import { Test, TestingModule } from '@nestjs/testing';
import { TeslaService } from './tesla.service';

describe('TeslaService', () => {
  let service: TeslaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeslaService],
    }).compile();

    service = module.get<TeslaService>(TeslaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
