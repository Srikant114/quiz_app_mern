import React from 'react'
import "../styles/Result.css"
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import {  useDispatch, useSelector } from 'react-redux'
import { attemptNumber , earnPointsNumber , flagResult } from '../helper/helper'


  /**Import Actions */
  import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { usePublishResult } from '../hooks/setResult'

const Result = () => {

  const dispatch = useDispatch()
  const { questions : {queue,answers}, result : {result, userId}} = useSelector(state => state)

  // useEffect(()=>(
  //   console.log(earnPoints)
  // ))

  const totalPoints = queue.length * 10;
  const attempts = attemptNumber(result);
  const earnPoints = earnPointsNumber(result, answers, 10)
  const flag = flagResult(totalPoints , earnPoints)


  /**Store user Result */
  usePublishResult({result, username : userId, attempts,points: earnPoints,achived : flag ? "Passed" : "Failed"})


  const onRestart = () => {
    dispatch(resetAllAction())
    dispatch(resetResultAction ())
  }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <div className="result flex-center">
          <div className="flex">
            <span>User Name :</span>
            <span className="bold">{userId || ""}</span>
          </div>
          <div className="flex">
            <span>Total Quiz Points :</span>
            <span className="bold">{totalPoints || 0 }</span>
          </div>
          <div className="flex">
            <span>Total Questions :</span>
            <span className="bold">{ queue.length || 0}</span>
          </div>
          <div className="flex">
            <span>Total Attempts :</span>
            <span className="bold">{attempts || 0}</span>
          </div>
          <div className="flex">
            <span>Total Earn Points :</span>
            <span className="bold">{earnPoints || 0}</span>
          </div>
          <div className="flex">
            <span>Quiz Result :</span>
            <span className="bold" style={{color : `${flag ? 'green' : 'red'}`}}>{flag ? "Passed" : "Failed"}</span>
          </div>
        </div>
        <div className="start">
          <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>
        
        {/* result table */}
        
        <div className="container">
          <ResultTable></ResultTable>
        </div>
    </div>
  )
}

export default Result