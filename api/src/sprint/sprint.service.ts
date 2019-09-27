import { Injectable, NotFoundException } from '@nestjs/common';
import { Sprint } from '../models/sprint.model';

@Injectable()
export class SprintService {
  private sprints: Sprint[] = [];
  private id: number = 1;

  addSprint(title: string) {
    const createdSprintId = this.id;
    const newSprint = new Sprint(createdSprintId.toString(), title);
    this.sprints.push(newSprint);
    this.id += 1;
    return createdSprintId;
  }

  getSprints() {
    return [...this.sprints]; // Create a copy of the Sprints to not have direct access to the array itself
  }

  getSprint(sprintId: string) {
    const sprint = this.findsprint(sprintId)[0];
    return { ...sprint }; // Same here create a new object to not return a reference
  }

  updateSprint(sprintId: string, sprintTitle: string) {
    const [sprint, index] = this.findsprint(sprintId);
    const updatedSprint = { ...sprint };
    if (sprintTitle) {
      updatedSprint.title = sprintTitle;
    }
    this.sprints[index] = updatedSprint;
  }

  deleteSprint(sprintId: string) {
    const index = this.findsprint(sprintId)[1];
    this.sprints.splice(index, 1);
  }

  private findsprint(id: string): [Sprint, number] {
    const sprintIndex = this.sprints.findIndex(item => item.id === id);
    const sprint = this.sprints[sprintIndex];
    if (!sprint) {
      throw new NotFoundException('Could not find Sprint by given id'); // Send 404 Status
    }
    return [sprint, sprintIndex];
  }
}
