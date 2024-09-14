import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsStrongPassword,
  IsEnum,
  IsUrl,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsAlpha,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';
import { hashSync } from 'bcrypt';

export class CreateUserDto {
  @IsOptional()
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

  @IsOptional()
  @IsStrongPassword()
  @ApiProperty({
    description:
      'The user\'s password. Set to "G@$%^&g1e" by default for Google authenticated users.',
    example: 'P@ssw0rd!',
  })
  password?: string = hashSync('G@$%^&g1e', 10);

  @IsEnum(Gender)
  @ApiProperty({
    description: 'The gender of the user',
    example: 'male',
  })
  gender: Gender;

  @IsPhoneNumber()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+201029343723',
  })
  phoneNumber: string;

  @IsDateString()
  @ApiProperty({
    description: 'The date of birth of the user',
    example: '1990-01-01',
  })
  dateOfBirth: Date;

  @IsString()
  @ApiProperty({
    description: 'Access token for the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  googleAccessToken: string;

  @IsString()
  @ApiProperty({
    description: 'Refresh token for the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  googleRefreshToken: string;
}
