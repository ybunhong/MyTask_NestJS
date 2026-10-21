import { Controller, Get, Param } from '@nestjs/common';
import { UserAgent } from '../common/user-agent.decorator.js';

@Controller('tasks')
export class TasksController {
  private tasks = [
    { id: 1, title: 'Complete project documentation', done: false },
    { id: 2, title: 'Review pull requests', done: true },
    { id: 3, title: 'Set up CI/CD pipeline', done: false },
    { id: 4, title: 'Write unit tests', done: false },
    { id: 5, title: 'Deploy to production', done: true },
  ];

  @Get()
  getAllTasks() {
    return this.tasks;
  }

  @Get('welcome')
  getWelcome() {
    return 'Welcome to the Tasks API!';
  }

  @Get('todo')
  getTodoTasks() {
    return this.tasks.filter(task => task.done === false);
  }

  @Get('done')
  getDoneTasks() {
    return this.tasks.filter(task => task.done === true);
  }

  @Get('agent')
  getUserAgent(@UserAgent() userAgent: string) {
    return { userAgent };
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasks.find(task => task.id === parseInt(id));
  }
}
