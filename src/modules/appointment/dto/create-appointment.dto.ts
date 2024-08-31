import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Day } from 'src/models/enums/day.enum';

export class CreateAppointmentDto {
  @ApiProperty({ enum: Day })
  @IsEnum(Day)
  @IsNotEmpty()
  day: Day;

  @ApiProperty({
    example: '14:00',
    description: 'Start time in HH:mm format',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'startTime must be in the format HH:mm',
  })
  @IsNotEmpty()
  startTime: string;
}
