import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.buttonLabel}</button>
  )
}

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad

  if (all !== 0) {
    return (
      <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text='Good' value={props.good} />
          <StatisticsLine text='Neutral' value={props.neutral} />
          <StatisticsLine text='Bad' value={props.bad} />
          <StatisticsLine text='All' value={all} />
          <StatisticsLine text='Average' value={(props.good - props.bad) / all} />
          <StatisticsLine text='Positive' value={props.good / (all) * 100} />
        </tbody>
      </table>
      </>
    )
  } else {
    return (
      <>
        <h2>No Statistics</h2>
      </>
    )
  }
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value} {props.text === 'Positive' ? '%' : ''}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} buttonLabel='good'></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} buttonLabel='neutral'></Button>
      <Button handleClick={() => setBad(bad + 1)} buttonLabel='bad'></Button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
