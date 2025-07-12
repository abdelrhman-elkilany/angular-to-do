import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css'
})
export class ErrorModal {

  elementRef = inject(ElementRef);
  @ViewChild('modalTemplate', { static: false }) modalTemplate!: ElementRef<HTMLDialogElement>;
  tasksService = inject(TasksService);
  errorMessage = this.tasksService.errorMessage;


  ngAfterViewInit(): void {
    this.modalTemplate.nativeElement.showModal();
  }

  closeModal(): void {
    this.tasksService.errorMessage.set(null);
    this.tasksService.spinner.set(false);
    this.modalTemplate.nativeElement.close();
  }
}
