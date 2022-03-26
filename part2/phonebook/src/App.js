import { useState, useEffect } from 'react'
import services from './services'

const Notification = (props) => {
  const notification = {
    padding: '0 20px',
    borderRadius: 4,
    width: 'fit-content',
    color: 'white',
    display: props.show ? 'block' : 'none'
  }

  const status = props.status === 'success' ? {backgroundColor: 'green'} : {backgroundColor: 'red'}

  return (
    <>
      <div style={{...status, ...notification}} className={props.status}>
        <h2>{props.message}</h2>
      </div>
    </>
  )
}

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
    <>
      <p>{props.name} {props.number}</p>
      <button id={props.id} onClick={props.handleDelete}>delete</button>
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({
    status: '',
    message: ''
  })
  const [showOrNot, setShowOrNot] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    let newPersonObject = {
      name: newName,
      number: newNumber
    }

    let exsistingPerson = persons.find(person => person.name === newName ? person : false)
    let confirmed = exsistingPerson ? window.confirm(`${exsistingPerson.name} already exists, do you want to update the phone number`) : false
    let changedPerson = { ...exsistingPerson, number: newNumber }

    if (exsistingPerson && confirmed) {
      services
      .update(exsistingPerson.id, changedPerson)
      .then(changedPerson => {
        setPersons(persons.map(person => person.id !== exsistingPerson.id ? person : changedPerson))
        setNotification({
          status: 'success',
          message: `you successfully update ${newName}s number`
        })
      })
      .catch(error => {
        console.log(error)
        setPersons(persons.filter(person => person.id !== exsistingPerson.id))
        setNotification({
          status: 'error',
          message: 'User does not exsist'
        })
      })
    }
    
    if (!exsistingPerson) {
      services.create(newPersonObject).then((person) => {
        setPersons(persons.concat(person))
        setNotification({
          status: 'success',
          message: `you successfully added ${newName}`
        })
      })
      .catch(error => {
        setNotification({
          status: 'error',
          message: 'User does not exsist'
        })
      })
    }

    showNotification()
  }

  const showNotification = () => {
    setShowOrNot(true)
    setTimeout(() => {
      setShowOrNot(false)
    }, 3000); 
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

  const handleDelete = person => {
    const id = person.id
    const confirmed = window.confirm(`Are you sure you want to delete ${person.name}`)

    if (confirmed) {
      services.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const filterByName = (person) => {
    if (filterValue === '') return person

    return person.name.toLowerCase().includes(filterValue)
  }

  useEffect(() => {
    services.getAll().then((response) => {
      setPersons(response)
      setLoading(false)
    })
  }, [])

  if (loading) return <h3>Loading...</h3>

  return (
    <div>
      <Notification show={showOrNot} status={notification.status} message={notification.message} />
      <AddPersonForm title="Add Person" handleSubmit={handleSubmit} handleNameOnChange={handleNameOnChange} handleNumberOnChange={handleNumberOnChange} />
      <Filter handleFilter={handleFilter} title="Filter by Name" />
      {persons
        .filter(filterByName)
        .map(person => <Person id={person.id} handleDelete={() => handleDelete(person)} key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App
