import { Document, Schema } from 'mongoose';
import { Priority } from '../../priority/model/priority.model';
import { User } from '../../user/model/user.model';
import { Column } from '../../column/model/column.model';

const TaskSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    column_id: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
    },
    assignee_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    report_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: String,
    description: String,
    priority: {
      type: Schema.Types.ObjectId,
      ref: 'Priority',
    },
    estimate_point: Number,
    sort: Number,
    status: Number,
  },
  {
    timestamps: true,
    collection: 'task',
  },
);

export { TaskSchema };

export interface Task extends Document {
  project_id: string;
  column_id: Column;
  assignee_user: User;
  report_user: User;
  title: string;
  description: string;
  priority: Priority;
  estimate_point: number;
  sort: number;
  status: number;
}

export interface TaskCompact extends Document {
  project_id: string;
  column_id: Column;
  assignee_user: User;
  title: string;
  priority: Priority;
  sort: number;
  status: number;
}
