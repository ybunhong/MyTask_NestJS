import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  async create(title: string) {
    const newTask = this.taskRepository.create({ title, done: false });
    return this.taskRepository.save(newTask);
  }

  async update(id: number, done: boolean) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (task) {
      task.done = done;
      return this.taskRepository.save(task);
    }
    return null;
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (task) {
      await this.taskRepository.remove(task);
      return task;
    }
    return null;
  }
}
