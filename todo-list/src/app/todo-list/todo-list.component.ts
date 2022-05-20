import { Component, OnInit } from '@angular/core';
import { Todo } from "../Todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos!: Todo[];
  constructor() { 
    this.todos= [
      {
        name: "Todo Work 1"

      },
      {
        name: "Todo Work 2"

      },
      {

        name: "Todo Work 3"

      },
      {

        name: "Todo Work 4"

      },
      {

        name: "Todo Work 5"

      },
      {

        name: "Todo Work 6"

      }

    ]
  }

  ngOnInit(): void {
  }
  onDel(todo:Todo){
    const idx = this.todos.indexOf(todo)
    this.todos.splice(idx, 1)
  }
  onAdd(todo:Todo){
    console.log(todo.name)
    this.todos.push(todo)
  }

}
