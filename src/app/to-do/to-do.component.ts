import { ToDoService } from './../services/to-do.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  constructor(private toDoService: ToDoService) {}

  toDos: any[] = [];

  ngOnInit(): void {
    this.toDoService.firestoreCollection
      .valueChanges({ idField: 'id' })
      .subscribe((items) => {
        this.toDos = items.sort((a, b) => {
          return a.isDone - b.isDone;
        });
      });
  }

  addToDo(toDoInput: HTMLInputElement) {
    if (toDoInput.value) {
      this.toDoService.addToDo(toDoInput.value);
      toDoInput.value = '';
    }
  }

  onToDoChange(id: string, newStatus: boolean) {
    this.toDoService.updateToDoStatus(id, newStatus);
  }

  deleteToDo(id: string) {
    this.toDoService.deleteToDo(id);
  }
}
