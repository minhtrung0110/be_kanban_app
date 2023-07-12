import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrioritysRepository } from '../repositories/priority.repository';
import { Priority } from '../model/priority.model';
import { CreatePriorityDto, UpdatePriorityDto } from '../dto/priority.dto';

@Injectable()
export class PriorityService {
  constructor(private readonly priorityRepository: PrioritysRepository) {}

  async findAll(): Promise<Priority[]> {
    return await this.priorityRepository.findAll();
  }

  async getPriorityById(priority_id: string) {
    const priority = this.priorityRepository.findPriorityById(priority_id);
    if (priority) {
      //await priority;
      return priority;
    }
    throw new HttpException('Priority not found', HttpStatus.NOT_FOUND);
  }

  async createPriority(user: CreatePriorityDto) {
    return await this.priorityRepository.create(user);
  }

  async updatePriority(id: string, data: UpdatePriorityDto) {
    return await this.priorityRepository.findByIdAndUpdate(id, data);
  }

  async deletePriority(id: string) {
    return await this.priorityRepository.deleteOne(id);
  }
}
