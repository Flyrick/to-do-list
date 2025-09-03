import { useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
/* (...) - spread operator(it gets the previous value and updates it when the updated value is added) */

function App() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState(JSON.parse( localStorage.getItem('todos')) || [])
  const [activeEdit, setActiveEdit] = useState(null)
  const [editedText, setEditedText] = useState("")


  function handleSubmit(event, value){
    event.preventDefault()
    setTodos([...todos, value])
    localStorage.setItem('todos', JSON.stringify([...todos, value]))
    setTask('')
  }

  function handleTaskChange(event){
    setTask(event.target.value)
  }

  function handleDelete (index){
    const newTodos = todos.filter((todo, i) => i !== index)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  function handleEdit (event, index){
    setActiveEdit(index)
    setEditedText(todos[index]); 
  }

  function handleCancelEdit(){
    setActiveEdit(null)
  }

  function updatedEdit() {
    const updatedTodos = [...todos];
    updatedTodos[activeEdit] = editedText; 
    // localStorage.setItem('todos', (editedText))
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setActiveEdit(null); 
  }


  return (
  <div className="flex justify-center items-center h-screen">
    <div className="min-w-[500px]">
        <h1 className="font-bold text-xl text-center">To-Do List</h1>
        <ul>
          {todos.map((todo, index) => {
            return <div className="flex items-center justify-between w-full px-4 py-2">
              {
                activeEdit == index
                ? <div className="flex gap-3">
                  <input  value={editedText} onChange={(e) => setEditedText(e.target.value)} className="border-2 border-black rounded-lg" type="text" />

                  <button>
                    <MdCancel className="cursor-pointer" onClick={() => handleCancelEdit()}/>
                  </button>

                  <button>
                    <FaCheck className="cursor-pointer" onClick={() => updatedEdit()}/>
                  </button>
                </div> 
                
                : <li>
                    <span>{index + 1}. </span>{todo}
                  </li>
              }
              

              <div>
              <button>
                <FaRegEdit onClick={(event) => handleEdit(event, index)}  className="cursor-pointer" color="green" size={22}/>
              </button>
              <button><FaRegTrashCan onClick={() => handleDelete(index)} className="cursor-pointer" color="red" size={22}/></button>
              </div>
            </div>
          })}
        </ul>
        <form className="flex flex-col gap-2">
          <input className="border-2 border-black rounded-lg" value={task} onChange={(event) => handleTaskChange(event)}  type="text" placeholder="To-Do" />
          <input className="bg-gray-400 rounded-lg border-2 border-black cursor-pointer font-bold text-white" onClick={(event) => handleSubmit(event, task)} type="submit" />
        </form>
    </div>
  </div>  
  )
}

export default App