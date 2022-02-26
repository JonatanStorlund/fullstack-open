import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Jonatan Storlund', number: '040-7654321' },
    { name: 'Benjamin Thylin', number: '050-1234567' }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  // const [activeList, setActiveList] = useState()
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
    let filterResult = persons.filter(person => person.name.toLowerCase().includes(filterValue))
    setFilteredPersons(filterResult)
  }

  return (
    <div>
      <AddPersonForm title="Add Person" handleSubmit={handleSubmit} handleNameOnChange={handleNameOnChange} handleNumberOnChange={handleNumberOnChange} />
      <Filter handleFilter={handleFilter} title="Filter by Name" />
      {filteredPersons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App
