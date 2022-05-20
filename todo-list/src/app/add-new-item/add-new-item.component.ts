import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../Todo';


@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {
  title!:string
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter;


  constructor() { }

  ngOnInit(): void {
  }
addItem(){
  const todo = {
    name: this.title
  }
  
  this.todoAdd.emit(todo);
}
}

