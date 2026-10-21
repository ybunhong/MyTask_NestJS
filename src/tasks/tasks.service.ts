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

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find(task => task.id === id);
  }
}
