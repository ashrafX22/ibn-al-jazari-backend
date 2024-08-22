import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMeetService } from './google-meet.service';

describe('GoogleMeetService', () => {
  let service: GoogleMeetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleMeetService],
    }).compile();

    service = module.get<GoogleMeetService>(GoogleMeetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
