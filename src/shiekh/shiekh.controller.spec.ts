import { Test, TestingModule } from '@nestjs/testing';
import { ShiekhController } from './shiekh.controller';
import { ShiekhService } from './shiekh.service';

describe('ShiekhController', () => {
  let controller: ShiekhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiekhController],
      providers: [ShiekhService],
    }).compile();

    controller = module.get<ShiekhController>(ShiekhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
