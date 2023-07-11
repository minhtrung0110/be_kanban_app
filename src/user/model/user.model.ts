import { Document, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    birth_day: String,
    gender: Number,
    status: Number,
    mail: String,
    phone: String,
    avatar: String,
    address: String,
  },
  {
    timestamps: true,
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },
    collection: 'user',
  },
);

export { UserSchema };

export interface User extends Document {
  first_name: string;
  last_name: string;
  birth_day: string;
  gender: number;
  status: number;
  mail: string;
  phone: string;
  avatar: string;
  address: string;
}
