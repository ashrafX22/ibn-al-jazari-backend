import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    description: 'The name of the subject',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The price of the subject',
  })
  price: number;
}
