import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsAlpha,
  IsEmail,
  IsStrongPassword,
  IsEnum,
  IsDate,
  IsUrl,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';

export class CreateUserDto {
  @IsUrl()
  @ApiProperty({
    description: "URL of the user's profile picture",
    example: 'https://example.com/profile-picture.jpg',
    required: false,
  })
  profilePicture?: string;

  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsStrongPassword()
  @ApiProperty({
    description:
      'The user\'s password. Set to "google" by default for Google authenticated users.',
    example: 'P@ssw0rd!',
  })
  password?: string = 'google';

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty({
    description: 'The gender of the user',
    example: 'Male',
  })
  gender: Gender;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: 'The date of birth of the user',
    example: '1990-01-01',
  })
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Access token for the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string = '';

  @ApiProperty({
    description: 'Refresh token for the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string = '';
}
