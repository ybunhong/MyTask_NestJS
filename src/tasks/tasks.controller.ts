import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getAllTasks() {
    return 'Here are all your tasks.';
  }

  @Get('welcome')
  getWelcome() {
    return 'Welcome to the Tasks API!';
  }
}
