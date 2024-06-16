import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../model/task.model';
import * as _ from 'lodash';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  createTask(task: Task): Task {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    return task;
  }

  updateTask(id: number, newTask: Task): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return null;
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...newTask };
    return this.tasks[taskIndex];
  }

  deleteTask(id: number): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return null;
    }
    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }

  filterTasksByTitle(keyword: string): Task[] {
    return _.filter(this.tasks, task => task.title.includes(keyword));
  }
}
