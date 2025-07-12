import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, type Signal } from '@angular/core';
import { catchError, filter, map, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpClient = inject(HttpClient);
  pendingTasks = signal<string[]>([]);
  doneTasks = signal<string[]>([]);
  spinner = signal(false);
  errorMessage = signal<string | null>(null);

  getTasks(status: 'Pending' | 'Done') {
    return this.httpClient
      .post(
        'https://firestore.googleapis.com/v1/projects/to-do-bda69/databases/(default)/documents:runQuery',
        {
          structuredQuery: {
            from: [{ collectionId: 'toDo' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'status' },
                op: 'EQUAL',
                value: { stringValue: status.toLowerCase() },
              },
            },
          },
        }
      )
      .pipe(
        map((entries) => {
          return entries as any[];
        }),
        map((entries: any[]) =>
          entries
            .filter((entry) => !!entry.document?.fields?.name?.stringValue)
            .map((entry) => entry.document.fields.name.stringValue)
        ),
        tap((tasks: string[]) => {
          if (status === 'Pending') {
            this.pendingTasks.set(tasks);
          }
          if (status === 'Done') {
            this.doneTasks.set(tasks);
          }
        }),
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          this.errorMessage.set('Failed to load tasks');
          return [];
        })
      );
  }

  markAsCompleted(task: string) {
    this.spinner.set(true);
    this.updateTaskStatus(task, 'Done').subscribe({
      next: () => {
        this.pendingTasks.update((tasks) => {
          const index = tasks.indexOf(task);
          if (index > -1) {
            tasks.splice(index, 1);
          }
          return tasks;
        });
        this.doneTasks.update((tasks) => {
          tasks.push(task);
          return tasks;
        });
        this.spinner.set(false);
      },
      error: (error) => {      
          console.error('Error marking task as complete:', error);
          this.errorMessage.set('Failed to mark task as completed');
          this.spinner.set(false);
      },
    });
  }

  markAsPending(task: string) {
    this.spinner.set(true);
    this.updateTaskStatus(task, 'Pending').subscribe({
      next: () => {
        this.doneTasks.update((tasks) => {
          const index = tasks.indexOf(task);
          if (index > -1) {
            tasks.splice(index, 1);
          }
          return tasks;
        });
        this.pendingTasks.update((tasks) => {
          tasks.push(task);
          return tasks;
        });
        this.spinner.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to mark task as Pending');
        this.spinner.set(false);
        console.error(`Error marking task ${task} as Pending:`, error);

      },
    });
  }

  updateTaskStatus(task: string, status: 'Pending' | 'Done') {
    return this.httpClient.patch(
      'https://firestore.googleapis.com/v1/projects/to-do-bda69/databases/(default)/documents/toDo/' +
        task +
        '?updateMask.fieldPaths=name&updateMask.fieldPaths=status',
      {
        fields: {
          name: { stringValue: task },
          status: { stringValue: status.toLowerCase() },
        },
      }
    );
  }

  addTask(task: string) {
    return this.httpClient.patch(
      'https://firestore.googleapis.com/v1/projects/to-do-bda69/databases/(default)/documents/toDo/' +
        task,
      {
        fields: {
          name: { stringValue: task },
          status: { stringValue: 'pending' },
        },
      }
    ).pipe(
      tap( () =>{
        this.pendingTasks.update((tasks) => [...tasks, task]);
      })
    );
  }
}
