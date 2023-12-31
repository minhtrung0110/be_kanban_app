import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { User } from '../model/user.model';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async countDocuments(filter) {
    return this.userModel.countDocuments(filter);
  }
}
