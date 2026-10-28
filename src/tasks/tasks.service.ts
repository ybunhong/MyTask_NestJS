import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(title: string) {
    this.logger.debug(`Creating new task with title: ${title}`);
    const newTask = this.taskRepository.create({ title, done: false });
    const savedTask = await this.taskRepository.save(newTask);
    this.logger.log(`Task created with ID ${savedTask.id}`);
    return savedTask;
  }

  async update(id: number, done: boolean) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.done = done;
    const updatedTask = await this.taskRepository.save(task);
    this.logger.log(`Task ${id} updated: done=${done}`);
    return updatedTask;
  }

  async remove(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.logger.log(`Task ${id} deleted`);
  }
}
