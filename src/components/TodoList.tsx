import * as React from 'react';
import { observable as o, action as a, computed as c } from 'mobx';
import { observer } from 'mobx-react';
import TodoItem from './TodoItem';
import './todolist.scss';

interface Props {
    todos?: Array<any>;
    filterSave?: Array<any>;
    currentTodo?: string;
}

interface TodoItemType {
    title: string;
    done: boolean;
    date?: any;
}

@observer
export default class TodoList extends React.Component<Props> {
    @o private todos: Array<TodoItemType> = [];
    @o private filterSave: Array<TodoItemType> = [];
    @o public currentTodo: TodoItemType = { title: '', done: false };
    public date: any = null;

    public render(): React.ReactNode {
        const todo = this.todos || [];
        return (
            <>
                <div className="mainpage">
                    <input onChange={(e) => this.changeInput(e.target.value)}
                        value={this.currentTodo.title}
                        onKeyUp={(e) => { if (e.key === 'Enter') this.addTodo(); }}>
                    </input>
                    <button onClick={() => this.addTodo()}>
                        Add todo
                </button>
                </div>
                <div className="todolist">{todo.map((item, i) =>
                    <div key={i}>
                        <TodoItem title={item.title}
                            done={item.done}
                            index={i}
                            deleteTodo={this.deleteTodo}
                            setDone={this.setDone}
                            date={item.date}
                        />
                    </div>
                )}
                </div>
                <div>
                    <label htmlFor="completed"> Done {this.completedTodos}</label>
                    <input type="checkbox" name="completed" onChange={(e) => 
                    this.showCompleted(e.target.checked)} />
                </div>
            </>)
    }
    @a
    public addTodo = () => {
        if (this.currentTodo.title) {
            this.todos.push({
                title: this.currentTodo.title, done: false,
                date: new Date().toDateString()
            });
            this.currentTodo.title = '';
            this.filterSave = this.todos;
        }
    }

    @a
    public deleteTodo = (i: number) => {
        this.todos.splice(i, 1);
        this.filterSave = this.todos;
    }

    @a
    public changeInput = (text: string) => {
        this.currentTodo.title = text;
    }

    @a
    public setDone = (index: number) => {
        const todo = this.todos[index];
        todo.done = !todo.done;
    }

    @c
    public get completedTodos() {
        return this.todos.filter((item) => item.done === true).length;
    }

    @a
    public showCompleted(checked: boolean) {
        if (checked)
            this.todos = this.todos.filter((item) => item.done === true);
        else this.todos = this.filterSave;
    }
}