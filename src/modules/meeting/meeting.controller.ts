import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { AuthGuard } from '@nestjs/passport';
import { createMeetingSwaggerDoc } from './meeting.swagger-doc';
import { GoogleTokenInterceptor } from '../auth/providers/google/google-token.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) { }

  @createMeetingSwaggerDoc()
  // @Experiences(Experience.SENIOR)
  // @Roles(Role.TEAHCER)
  @UseGuards(AuthGuard('jwt')) // , RolesGuard, ExperienceGuard
  @UseInterceptors(GoogleTokenInterceptor)
  @Post(':classroomId')
  async create(
    @Req() req,
    @Res() res,
    @Param('classroomId') classroomId: string,
    @Body() createMeetingDto: CreateMeetingDto,
  ) {
    console.log(
      'create meeting controller req auth header',
      req.headers['Authorization'],
    );
    console.log(
      'create meeting controller res auth header',
      res.getHeader('Authorization'),
    );

    const meeting = await this.meetingService.create(
      req.user,
      +classroomId,
      createMeetingDto,
    );

    return res.json(meeting);
  }

  @Get()
  async findAll() {
    return this.meetingService.findAll();
  }

  // @getMeetingsByTeacherIdSwaggerDoc()
  @Get('teacher/:teacherId')
  findMeetingsByTeacherId(@Param('teacherId') teacherId: string) {
    return this.meetingService.findMeetingsByTeacherId(+teacherId);
  }

  // @getMeetingsByStudentIdSwaggerDoc()
  @Get('teacher/:teacherId')
  async findMeetingsByStudentId(@Param('studentId') studentId: string) {
    return this.meetingService.findMeetingsByTeacherId(+studentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.meetingService.findOne(+id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
  //     return this.meetingService.update(+id, updateMeetingDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.meetingService.remove(+id);
  }
}
