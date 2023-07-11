import { Document, Schema } from 'mongoose';
import { User } from '../../user/model/user.model';

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
