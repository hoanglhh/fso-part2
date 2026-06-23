import { useState, useEffect } from 'react'
import axios, { create } from 'axios'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? returnedPerson : person
            ))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Added ${existingPerson.name}`)
            setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
          })
          .catch(error => {
            const backendErrorMessage = error.response.data.error

            if (error.response && error.response.status === 400) {
              setNotificationMessage(backendErrorMessage)
            } else {
              setNotificationMessage(`Information of ${personObject.name} has already been removed from server`)
            }

            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
      })
      }
      return 
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        const backendErrorMessage = error.response.data.error

        if (error.response && error.response.status === 400) {
          setNotificationMessage(backendErrorMessage)
        } else {
          setNotificationMessage(`Information of ${personObject.name} has already been removed from server`)
        }

        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
  })
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleRemovePerson = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id != id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter}
      handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addName={addName}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleRemovePerson={handleRemovePerson}/>
    </div>
  )
}

export default App