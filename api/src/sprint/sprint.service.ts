import { Injectable, NotFoundException } from '@nestjs/common';
import { Sprint } from '../models/sprint.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SprintService {
  private sprints: Sprint[] = [];

  constructor(@InjectModel('Sprint') private readonly sprintModel: Model<Sprint>) {}

  async addSprint(title: string) {
    const newSprint = new this.sprintModel({ title });
    const result = await newSprint.save();
    return result.id as string;
  }

  async getSprints() {
    const sprints = await this.sprintModel.find().exec(); // exec makes it a real promise
    return sprints.map(sprint => ({
      id: sprint.id,
      title: sprint.title,
      tasks: sprint.tasks,
      assignee: sprint.assignee,
    }));
  }

  async getSprint(sprintId: string) {
    const sprint = await this.findSprint(sprintId);
    return {
      id: sprint.id,
      title: sprint.title,
      tasks: sprint.tasks,
      assignee: sprint.assignee,
    };
  }

  async updateSprint(sprintId: string, sprintTitle: string) {
    const updatedSprint = await this.findSprint(sprintId);

    if (sprintTitle) {
      updatedSprint.title = sprintTitle;
    }
    updatedSprint.save();
  }

  async deleteSprint(sprintId: string) {
    const result = await this.sprintModel.deleteOne({ _id: sprintId }).exec(); // mongoDb stores the id in _id

    // deletedCount and n both hold the count of how many items where deleted
    if (result.n === 0) {
      throw new NotFoundException('Could not find Sprint by given id'); // Send 404 Status
    }
  }

  private async findSprint(id: string): Promise<Sprint> {
    let sprint;
    try {
      sprint = await this.sprintModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Sprint by given id'); // Send 404 Status
    }
    if (!sprint) {
      throw new NotFoundException('Could not find Sprint by given id'); // Send 404 Status
    }
    return sprint;
  }
}
