import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { SprintService } from './sprint.service';

@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @Post()
  addSprint(@Body('title') sprintTitle: string) {
    const generatedSprint = this.sprintService.addSprint(sprintTitle);
    return { id: generatedSprint };
  }

  // If two get methods are defined in one controller the first always wins, the second has no chance to execute
  @Get('all')
  getAllSprints() {
    return this.sprintService.getSprints();
  }

  // this gets executed since we differ the route here
  @Get(':id')
  getSprint(@Param('id') sprintId: string) {
    return this.sprintService.getSprint(sprintId);
  }

  @Patch(':id')
  updateSprint(@Param('id') sprintId: string, @Body('title') sprintTitle: string) {
    this.sprintService.updateSprint(sprintId, sprintTitle);
    return `Sprint with id ${sprintId} updated successful.`;
  }

  @Delete(':id')
  removeSprint(@Param('id') sprintId: string) {
    this.sprintService.deleteSprint(sprintId);
    return `Sprint with id ${sprintId} deleted successful.`;
  }
}
