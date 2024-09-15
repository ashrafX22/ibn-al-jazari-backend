import { ApiProperty } from '@nestjs/swagger';
import { MeetingProvider } from '../enums/meeting-provider.enum';
import { IsEnum } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty({
    description: 'the name of the meeting provider',
    examples: ['google', 'zoom', 'discord', 'local'],
  })
  @IsEnum(MeetingProvider)
  provider: MeetingProvider;
}
