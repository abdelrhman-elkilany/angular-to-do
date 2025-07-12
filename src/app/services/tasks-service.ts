import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, type Signal } from '@angular/core';
import { filter, map, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpClient = inject(HttpClient);
  pendingTasks = signal<string[]>([]); 
  doneTasks = signal<string[]>([]); 

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
        )
      );
  }
}
