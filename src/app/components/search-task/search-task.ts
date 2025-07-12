import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-task',
  imports: [FormsModule],
  templateUrl: './search-task.html',
  styleUrl: './search-task.css',
})
export class SearchTask {
  @Input() target!: 'Pending' | 'Done';

  searchInput?: string;

  @Output() search = new EventEmitter();

  searchClick() {
    this.search.emit({
      searchInput: this.searchInput,
      target: this.target
    });
  }
}
