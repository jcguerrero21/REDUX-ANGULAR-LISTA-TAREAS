import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoActionTodo, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {
  
  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;
  

  chkField: FormControl;
  txtInput: FormControl;
  
  editando: boolean;

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkField.valueChanges.subscribe(() => {
      const accionToogle = new ToggleTodoActionTodo(this.todo.id);
      this._store.dispatch(accionToogle);
    });
  }

  editar(): void{
    this.editando = true;
    
    setTimeout( () => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion(): void {
    this.editando = false;
    
    if(this.txtInput.invalid) {
      return;
    }

    if(this.txtInput.value === this.todo.texto) {
      return;
    }

    const accionEdit = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this._store.dispatch(accionEdit);
  }

  borrarTodo() {
    const accion = new BorrarTodoAction(this.todo.id);
    this._store.dispatch(accion);
  }

}
