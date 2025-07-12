import {
  Component,
  computed,
  inject,
  Input,
  signal,
  type OnInit,
  type Signal,
} from '@angular/core';
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

  tasks = signal<string[]>([]);
  filteredTasks = signal<string[]>([]);

  ngOnInit(): void {
    this.taskService.getTasks(this.status).subscribe({
      next: (tasks: string[]) => {
        this.tasks.set(tasks);
        this.filteredTasks.set(tasks);
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  search(data: { searchInput: string; target: string }) {
    if (data.target == this.status) {
      if (!data.searchInput) {
        this.filteredTasks.set(this.tasks());
      }
      this.filteredTasks.update( () => {
        return this.tasks().filter((f:string) => f.toLowerCase().includes(data.searchInput))
      });
    }
  }
}
