import { ApiProperty } from '@nestjs/swagger';
export class CreateShiekhDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  token: string;
}
