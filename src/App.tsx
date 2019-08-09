import * as React from 'react';
import { observer as o } from 'mobx-react';
import TodoList from './components/TodoList';
import './App.scss';

@o
class App extends React.Component<any> {
  render() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
  }
}

export default App;
