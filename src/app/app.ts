import {
  Component,
  inject,
} from '@angular/core';
import { List } from "./components/task-list/list";
import { Spinner } from "./components/spinner/spinner";
import { TasksService } from './services/tasks-service';

@Component({
  selector: 'app-root',
  imports: [List, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  taskService = inject(TasksService);
  spinner = this.taskService.spinner;

}
