import {
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { List } from "./components/task-list/list";
import { Spinner } from "./components/spinner/spinner";
import { TasksService } from './services/tasks-service';
import { ErrorModal } from "./components/error-modal/error-modal";

@Component({
  selector: 'app-root',
  imports: [List, Spinner, ErrorModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  taskService = inject(TasksService);
  spinner = this.taskService.spinner;
  errorMessage = this.taskService.errorMessage;

}
