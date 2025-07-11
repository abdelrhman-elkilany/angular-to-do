import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-task',
  imports: [],
  templateUrl: './search-task.html',
  styleUrl: './search-task.css'
})
export class SearchTask {

  @Input() target!: 'Pending' | 'Done';

}
