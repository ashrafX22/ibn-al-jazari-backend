import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import {
  createMeetingSwaggerDoc,
  findAllMeetingsSwaggerDoc,
  findMeetingsByStudentIdSwaggerDoc,
  findMeetingsByTeacherIdSwaggerDoc,
  findOneMeetingSwaggerDoc,
  removeMeetingSwaggerDoc,
  updateMeetingSwaggerDoc,
} from './meeting.swagger';
import { GoogleTokenInterceptor } from '../auth/providers/google/google-token.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @createMeetingSwaggerDoc()
  @UseInterceptors(GoogleTokenInterceptor)
  @Post('/classroom/:classroomId')
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
      classroomId,
      createMeetingDto,
    );

    return res.json(meeting);
  }

  @Get()
  @findAllMeetingsSwaggerDoc()
  async findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  @findOneMeetingSwaggerDoc()
  async findOne(@Param('id') id: string) {
    return this.meetingService.findOne(id);
  }

  // @Patch(':id')
  //@updateMeetingSwaggerDoc()
  // async update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
  //     return this.meetingService.update(+id, updateMeetingDto);
  // }

  @Delete(':id')
  @removeMeetingSwaggerDoc()
  async remove(@Param('id') id: string) {
    return this.meetingService.remove(id);
  }
}
