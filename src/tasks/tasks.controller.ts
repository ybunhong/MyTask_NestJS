import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserAgent } from '../common/user-agent.decorator.js';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

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
    return allTasks.filter((task) => task.done === false);
  }

  @Get('done')
  async getDoneTasks() {
    const allTasks = await this.tasksService.findAll();
    return allTasks.filter((task) => task.done === true);
  }

  @Get('agent')
  getUserAgent(@UserAgent() userAgent: string) {
    return { userAgent };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto.title);
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.findOne(id);
    return task;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto.done);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
