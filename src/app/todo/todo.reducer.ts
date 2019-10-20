import * as fromTodo from './todo.actions';
import { Todo } from './models/todo.model';

const todo1 = new Todo('Hacer un viaje a Asturias');
const todo2 = new Todo('Ir a comprar Pan');
const todo3 = new Todo('Echar Gasolina al coche')

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state = estadoInicial,
    action: fromTodo.Acciones): Todo[] {

    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo];
        
        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(value => {
                return{
                    ...value,
                    completado: action.completado
                }
            })

        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.EDITAR_TODO:
            return state.map(value => {
                if (value.id === action.id) {
                    return {
                        ...value,
                        texto: action.texto
                    }
                } else {
                    return value
                }
            });
        
        case fromTodo.BORRAR_TODO:
            return state.filter(value => value.id !== action.id);
            
        case fromTodo.BORRAR_ALL_TODO:
            return state.filter(value => !value.completado);

        default:
            return state;
    }

}