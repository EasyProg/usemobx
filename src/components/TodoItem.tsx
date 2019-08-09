import * as React from 'react';
import { observer } from 'mobx-react';
import './todoitem.scss';

interface Props {
    title: string;
    index: number;
    done: boolean;
    date: string;
    deleteTodo: (index: number) => void;
    setDone: (index: number) => void;
}

// @observer
export default class TodoItem extends React.Component<Props> {
    public render(): React.ReactNode {
        const { deleteTodo, index, setDone, done, date } = this.props;
        return <div className={done ? 'todoitem__done' : 'todoitem'}>
            <div>{this.props.title}</div>
            <div>
                <input
                    type="checkbox"
                    checked={done}
                    onChange={() => setDone(index)} />
                <div onClick={() => deleteTodo(index)} className="delete">Delete</div>
                <p>{date}</p>
            </div>
            </div>
    }
}