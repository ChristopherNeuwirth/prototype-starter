import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { SprintService } from './sprint.service';

@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @Post()
  async addSprint(@Body('title') sprintTitle: string) {
    const generatedSprintId = await this.sprintService.addSprint(sprintTitle);
    return { id: generatedSprintId };
  }

  // If two get methods are defined in one controller the first always wins, the second has no chance to execute
  @Get()
  async getAllSprints() {
    return await this.sprintService.getSprints();
  }

  // this gets executed since we differ the route here
  @Get(':id')
  async getSprint(@Param('id') sprintId: string) {
    return await this.sprintService.getSprint(sprintId);
  }

  @Patch(':id')
  async updateSprint(@Param('id') sprintId: string, @Body('title') sprintTitle: string) {
    await this.sprintService.updateSprint(sprintId, sprintTitle);
    return `Sprint with id ${sprintId} updated successful.`;
  }

  @Delete(':id')
  async removeSprint(@Param('id') sprintId: string) {
    await this.sprintService.deleteSprint(sprintId);
    return `Sprint with id ${sprintId} deleted successful.`;
  }
}
