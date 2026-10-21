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

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  create(title: string) {
    const newTask = {
      id: this.nextId++,
      title,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, done: boolean) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.done = done;
      return task;
    }
    return null;
  }

  remove(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      const removed = this.tasks.splice(index, 1);
      return removed[0];
    }
    return null;
  }
}
