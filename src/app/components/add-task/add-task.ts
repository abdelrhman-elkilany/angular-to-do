import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {

  task?:string;
  tasksService = inject(TasksService);
  isLoading = false;

  addTask(){
    if(this.task){
      this.isLoading = true;
      this.tasksService.addTask(this.task).subscribe({
        next: ()=>{
          this.isLoading = false;
        }
      });
    }

  }
}
