import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/result_reducer'
const Main = () => {

    const inputRef=useRef(null)
    const dispatch = useDispatch()

    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <ol>
            <li>You will be asked 10 question.</li>
            <li>10 points will be awarded for each correct answer.</li>
            <li>Each question have three option, you can choose only one</li>
            <li>You can review and change answers before submitting the quiz</li>
            <li>The result will be declared at the end of the quiz</li>
        </ol>
        <form id='form'>
            <input ref={inputRef} className='userid' type="text" placeholder='Username*' />
        </form>
        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>
    </div>
  )
}

export default Main