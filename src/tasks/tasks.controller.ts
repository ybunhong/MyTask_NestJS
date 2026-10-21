import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
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

  @Post()
  createTask(@Body('title') title: string) {
    return this.tasksService.create(title);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.findOne(parseInt(id));
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body('done') done: boolean) {
    return this.tasksService.update(parseInt(id), done);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.tasksService.remove(parseInt(id));
  }
}
