import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserAgent } from '../common/user-agent.decorator.js';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return this.tasksService.findAll();
  }

  @Get('welcome')
  getWelcome() {
    return 'Welcome to the Tasks API!';
  }

  @Get('todo')
  async getTodoTasks() {
    const allTasks = await this.tasksService.findAll();
    return allTasks.filter(task => task.done === false);
  }

  @Get('done')
  async getDoneTasks() {
    const allTasks = await this.tasksService.findAll();
    return allTasks.filter(task => task.done === true);
  }

  @Get('agent')
  getUserAgent(@UserAgent() userAgent: string) {
    return { userAgent };
  }

  @Post()
  async createTask(@Body('title') title: string) {
    return this.tasksService.create(title);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.findOne(parseInt(id));
    return task;
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body('done') done: boolean) {
    return this.tasksService.update(parseInt(id), done);
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    return this.tasksService.remove(parseInt(id));
  }
}
