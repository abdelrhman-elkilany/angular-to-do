import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTask } from './search-task';

describe('SearchTask', () => {
  let component: SearchTask;
  let fixture: ComponentFixture<SearchTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
