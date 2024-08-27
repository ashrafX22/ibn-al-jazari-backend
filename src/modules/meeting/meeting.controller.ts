import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { AuthGuard } from '@nestjs/passport';
import { createMeetingSwaggerDoc } from './meeting.swagger';

@Controller('meeting')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) { }

    @createMeetingSwaggerDoc()
    // @Experiences(Experience.SENIOR)
    // @Roles(Role.TEAHCER)
    @UseGuards(AuthGuard('jwt')) // , RolesGuard, ExperienceGuard
    @Post(':classroomId')
    create(@Req() req, @Param('classroomId') classroomId: string, @Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingService.create(req.user, +classroomId, createMeetingDto);
    }

    @Get()
    findAll() {
        return this.meetingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.meetingService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
        return this.meetingService.update(+id, updateMeetingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.meetingService.remove(+id);
    }
}
