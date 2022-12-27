import { Input, Select, DatePicker } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import TagsInput from './TagsInput'
import { GoPlusSmall } from 'react-icons/go'
import { useState } from 'react'
import { uid } from 'uid'

const AddTodo = ({ setAddTodo, addTodo, todoList, setTodoList }) => {
	const [formValidity, setFormValidity] = useState(true)

	const [title, setTitle] = useState('')
	const [desc, setdesc] = useState('')
	const [date, setdate] = useState('')
	const [tags, settags] = useState()
	const [status, setstatus] = useState('Open')

	const [titleError, settitleError] = useState('')
	const [descError, setdescError] = useState('')
	const [dateError, setdateError] = useState('')

	const onclick = () => setAddTodo(!addTodo)

	const onSubmit = () => {
		const uuid = uid()
		if (formValidity) {
			setTodoList([
				...todoList,
				{
					timestamp: new Date().toUTCString(),
					title,
					description: desc,
					due_date: date,
					tag: tags,
					status,
					key: uuid,
				},
			])

			setTitle('')
			setdesc('')
			setdate('')
			settags([])
			setstatus('Open')

			onclick()
		}
	}

	return (
		<div className='addTodo absolute top-0 left-0 min-h-screen grid z-50 min-w-full bg-black/50 place-items-center' >
			<div className='m-2 modal shadow-2xl bg-white p-4 rounded flex items-start flex-col gap-4'>
				<div className='font-bold text-2xl flex justify-between w-full items-center'>
					<div>Add Todo</div>
					<GoPlusSmall
						className='rotate-45 cursor-pointer'
						size={30}
						onClick={onclick}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Title</div>
					<Input
						onChange={(e) => {
							if (e.target.value.length > 100 || e.target.value.length === 0) {
								setFormValidity(false)
								settitleError(
									'Title should not be over 100 chars or less than 1 char'
								)
							} else {
								settitleError('')
								setFormValidity(true)
							}

							setTitle(e.target.value)
						}}
						max={100}
						placeholder='Title'
						style={{ width: '300px', borderRadius: '0.25rem' }}
					/>
					<div className='text-[#f9503d]'>{titleError}</div>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Description</div>
					<TextArea
						onChange={(e) => {
							if (e.target.value.length > 1000 || e.target.value.length === 0) {
								setFormValidity(false)
								setdescError(
									'Description should not be over 100 chars or less than 1 char'
								)
							} else {
								setdescError('')
								setFormValidity(true)
							}
							setdesc(e.target.value)
						}}
						rows={4}
						max={1000}
						placeholder='Description'
						style={{ width: '300px', borderRadius: '0.25rem' }}
					/>
					<div className='text-[#f9503d] max-w-[300px] text-left'>
						{descError}
					</div>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Due Date</div>
					<DatePicker
						onChange={(date, dateString) => {
							if (new Date(dateString) < new Date()) {
								setdateError('Due date cannot be behind the current date.')
								setFormValidity(false)
							} else {
								setdateError('')
								setFormValidity(true)
							}
							setdate(dateString)
						}}
						style={{ width: '300px', borderRadius: '0.25rem' }}
						renderExtraFooter={() => 'extra footer'}
					/>
					<div className='text-[#f9503d]'>{dateError}</div>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Tags</div>
					<TagsInput
						selectedTags={(tags) => {
							settags(tags)
						}}
						tags={[]}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<div className='font-semibold'>Status</div>
					<Select
						onChange={(value) => setstatus(value)}
						defaultValue='Open'
						style={{
							width: '300px',
							borderRadius: '0.25rem',
							textAlign: 'left',
						}}
						className='w-full'>
						<Select.Option value='Open'>Open</Select.Option>
						<Select.Option value='Working'>Working</Select.Option>
						<Select.Option value='Done'>Done</Select.Option>
						<Select.Option value='Overdue'>Overdue</Select.Option>
					</Select>
				</div>
				<div
					className={`${
						!formValidity
							? 'bg-black/50 cursor-not-allowed pointer-events-none'
							: 'bg-black/90 cursor-pointer'
					}  w-full py-2 hover:bg-black text-white rounded `}
					onClick={onSubmit}>
					{!formValidity ? 'Disabled' : 'Submit'}
				</div>
			</div>
		</div>
	)
}

export default AddTodo
