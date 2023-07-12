import { Document, Schema } from 'mongoose';
import { Project } from '../../project/model/project.model';

const ColumnSchema = new Schema(
  {
    title: String,
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    sort: Number,
    status: Number,
  },
  {
    timestamps: true,
    collection: 'column',
  },
);

export { ColumnSchema };

export interface Column extends Document {
  title: string;
  project_id: Project;
  sort: number;
  status: number;
}
