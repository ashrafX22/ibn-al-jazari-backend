import { Test, TestingModule } from '@nestjs/testing';
import { ShiekhService } from './shiekh.service';

describe('ShiekhService', () => {
  let service: ShiekhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiekhService],
    }).compile();

    service = module.get<ShiekhService>(ShiekhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
