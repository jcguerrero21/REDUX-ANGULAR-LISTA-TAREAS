import { Component, OnInit } from '@angular/core';
import { ToggleAllAction } from './todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
  
  completado: boolean = false;

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  toggleAll(): void {
    this.completado = !this.completado;
    const accion = new ToggleAllAction(this.completado);
    this._store.dispatch(accion);
  }

}
