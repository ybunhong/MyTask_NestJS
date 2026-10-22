import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    { id: 1, title: 'Complete project documentation', done: false },
    { id: 2, title: 'Review pull requests', done: true },
    { id: 3, title: 'Set up CI/CD pipeline', done: false },
    { id: 4, title: 'Write unit tests', done: false },
    { id: 5, title: 'Deploy to production', done: true },
  ];
  private nextId = 6;

  private fakeDatabaseDelay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async findAll() {
    await this.fakeDatabaseDelay();
    return this.tasks;
  }

  async findOne(id: number) {
    await this.fakeDatabaseDelay();
    return this.tasks.find(task => task.id === id);
  }

  async create(title: string) {
    await this.fakeDatabaseDelay();
    const newTask = {
      id: this.nextId++,
      title,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async update(id: number, done: boolean) {
    await this.fakeDatabaseDelay();
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.done = done;
      return task;
    }
    return null;
  }

  async remove(id: number) {
    await this.fakeDatabaseDelay();
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      const removed = this.tasks.splice(index, 1);
      return removed[0];
    }
    return null;
  }
}
