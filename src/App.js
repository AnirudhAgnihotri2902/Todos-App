import './App.scss'
import 'antd/dist/antd.css'
import Header from './Header'
import AddTodo from './AddTodo'
import { useEffect, useState } from 'react'
import Main from './Main'

function App() {
	const [addTodo, setAddTodo] = useState(false)
	const [todoList, setTodoList] = useState([])

	useEffect(() => {
		console.log(todoList)
	}, [todoList])

	return (
		<div className='App'>
			{addTodo ? (
				<AddTodo
					setTodoList={setTodoList}
					todoList={todoList}
					setAddTodo={setAddTodo}
					addTodo={addTodo}
				/>
			) : (
				<></>
			)}
			<Header setAddTodo={setAddTodo} addTodo={addTodo} />
			<Main setTodoList={setTodoList} todoList={todoList} />
		</div>
	)
}

export default App
