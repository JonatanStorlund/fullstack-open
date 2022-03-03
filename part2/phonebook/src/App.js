import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <>
      <h2>{props.title}</h2>
      <input onChange={props.handleFilter} />
    </>
  )
}

const AddPersonForm = (props) => {
  return (
    <>
      <h2>{props.title}</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input onChange={props.handleNameOnChange} />
          number: <input onChange={props.handleNumberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    let personObject = {
      name: newName,
      number: newNumber
    }
    let names = persons.map(person => person.name)
    let numbers = persons.map(person => person.number)

    if (newName && newNumber) {
      numbers.includes(newNumber) || names.includes(newName)
        ? alert(`The number ${newNumber} or the name ${newName} already exsist`)
        : setPersons(persons.concat(personObject))
    } else {
      alert('Please dont have empty fields')
    }
  }

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const filterByName = (person) => {
    if (filterValue === '') return person

    return person.name.toLowerCase().includes(filterValue)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setLoading(false)
      })
  }, [])

  if (loading) return <h3>Loading...</h3>

  return (
    <div>
      <AddPersonForm title="Add Person" handleSubmit={handleSubmit} handleNameOnChange={handleNameOnChange} handleNumberOnChange={handleNumberOnChange} />
      <Filter handleFilter={handleFilter} title="Filter by Name" />
      {persons
        .filter(filterByName)
        .map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App
