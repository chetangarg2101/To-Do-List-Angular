import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NgFor, NgClass]
})
export class AppComponent {
  todoList: TodoItem[] = [];
  newTask: string = '';

  @ViewChild('todoText') todoInputRef: ElementRef<HTMLInputElement> = null!;

  ngOnInit(): void {
    const storedTodoList = localStorage.getItem('todoList'); // ✅ Retrieve stored todos
    if (storedTodoList) {
      this.todoList = JSON.parse(storedTodoList); // ✅ Restore the list on page refresh
    }
  }

  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: text.trim(),
        completed: false
      };
      this.todoList.push(newTodoItem);
      this.saveTodoList(); // ✅ Save after adding a new task
      if (this.todoInputRef && this.todoInputRef.nativeElement) {
        this.todoInputRef.nativeElement.value = '';
      }
    }
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList(); // ✅ Save after deleting a task
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveTodoList(); // ✅ Save after toggling completion status
    }
  }

  saveTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList)); // ✅ Save to localStorage
  }
}
