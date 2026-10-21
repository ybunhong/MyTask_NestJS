import { Controller, Get, Param } from '@nestjs/common';
import { UserAgent } from '../common/user-agent.decorator.js';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.findAll();
  }

  @Get('welcome')
  getWelcome() {
    return 'Welcome to the Tasks API!';
  }

  @Get('todo')
  getTodoTasks() {
    const allTasks = this.tasksService.findAll();
    return allTasks.filter(task => task.done === false);
  }

  @Get('done')
  getDoneTasks() {
    const allTasks = this.tasksService.findAll();
    return allTasks.filter(task => task.done === true);
  }

  @Get('agent')
  getUserAgent(@UserAgent() userAgent: string) {
    return { userAgent };
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.findOne(parseInt(id));
  }
}
