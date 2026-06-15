const Persons = ({personsToShow, handleRemovePerson}) => {
    return (
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number} <button onClick={() => handleRemovePerson(person.name, person.id)}>delete</button>
          </li>
        ))}
      </ul>   
    )
}

export default Persons