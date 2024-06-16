import { Controller, Get, Post, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { Task } from '../model/task.model';
import { TasksService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    const taskId = parseInt(id, 10);
    const task = this.tasksService.getTaskById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  @Post()
  createTask(@Body() task: Task): Task {
    return this.tasksService.createTask(task);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() newTask: Task): Task {
    const taskId = parseInt(id, 10);
    const updatedTask = this.tasksService.updateTask(taskId, newTask);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return updatedTask;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Task {
    const taskId = parseInt(id, 10);
    const deletedTask = this.tasksService.deleteTask(taskId);
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return deletedTask;
  }

  @Get('search/title')
  filterTasksByTitle(@Query('keyword') keyword: string): Task[] {
    return this.tasksService.filterTasksByTitle(keyword);
  }
}
