import { Component, computed, inject, Input, type OnInit, type Signal } from '@angular/core';
import { AddTask } from '../add-task/add-task';
import { SearchTask } from '../search-task/search-task';
import { Task } from '../task/task';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-list',
  imports: [AddTask, SearchTask, Task],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  @Input() status!: 'Pending' | 'Done';
  taskService = inject(TasksService);

  tasks = computed(() =>
    this.status === 'Pending'
      ? this.taskService.pendingTasks()
      : this.taskService.doneTasks()
  );

  
  ngOnInit(): void {
    this.taskService.getTasks(this.status).subscribe();
  }
}
