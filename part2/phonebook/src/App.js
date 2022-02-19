import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])

  const [newName, setNewName] = useState(false)
  const [newNumber, setNewNumber] = useState(false)

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameOnChange} />
          number: <input onChange={handleNumberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) =>
        <div key={index}>
          <p>{person.name} {person.number}</p>
        </div>)}
    </div>
  )
}

export default App
