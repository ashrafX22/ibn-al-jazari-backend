import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';
import { Day } from 'src/models/enums/day.enum';

export class CreateAppointmentDto {
  @ApiProperty({ enum: Day })
  @IsEnum(Day)
  @IsNotEmpty()
  day: Day;

  @ApiProperty({
    example: '14:00',
    description: 'Start time in HH:MM format',
  })
  @IsString()
  @IsMilitaryTime()
  @IsNotEmpty()
  startTime: string;
}
