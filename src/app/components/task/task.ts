import { Component, inject, Input } from '@angular/core';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Input() data?: string;
  @Input() status?: 'Pending' | 'Done';

  markIcon!: string;
  taskService = inject(TasksService);

  ngOnInit(): void {
    this.markIcon =
      this.status === 'Pending'
        ? 'https://cdn-icons-png.flaticon.com/512/8832/8832108.png'
        : 'https://cdn-icons-png.flaticon.com/512/10308/10308996.png';
  }

  markTask() {
    if (this.status === 'Pending') {
      this.taskService.markAsCompleted(this.data!);
    }
    if (this.status === 'Done') {
      this.taskService.markAsPending(this.data!);
    }
  }
}
