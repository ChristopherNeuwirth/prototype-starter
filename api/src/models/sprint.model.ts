import { TeamMember } from './team-member.model';
import { Task } from './task.model';

// export interface Sprint {
//   id: string;
//   title: string;
//   tasks: Task[];
//   assignee: TeamMember[];
// }

export class Sprint {
  constructor(public id: string, public title: string, public tasks?: Task[], public assignee?: TeamMember[]) {}
}
