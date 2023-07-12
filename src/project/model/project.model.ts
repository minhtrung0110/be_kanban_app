import { Document, Schema } from 'mongoose';
import { User } from '../../user/model/user.model';
import { Task } from '../../task/model/task.model';

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    status: Number,
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },
    collection: 'project',
  },
);

export { ProjectSchema };

export interface Project extends Document {
  name: string;
  description: string;
  status: number;
  created_by: User;
  // categories: [Category];
}

export interface ProjectAPI {
  name: string;
  description: string;
  status: number;
  created_by: User;
  board_columns: ColumnIn[];
}

export interface ColumnIn {
  title: string;
  sort: number;
  tasks: Task[];
  status: number;
}
