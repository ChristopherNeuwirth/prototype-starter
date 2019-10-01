import * as mongoose from 'mongoose';

import { TeamMember } from './team-member.model';
import { Task } from './task.model';

export interface Sprint extends mongoose.Document {
  id: string;
  title: string;
  tasks?: Task[];
  assignee?: TeamMember[];
}

export const SprintSchema = new mongoose.Schema({
  title: String,
  tasks: [],
  assignee: [],
});
