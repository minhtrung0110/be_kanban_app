import { Document, Schema } from 'mongoose';

const PrioritySchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },
    collection: 'priority',
  },
);

export { PrioritySchema };

export interface Priority extends Document {
  name: string;
}
