const Persons = ({personsToSHow}) => {
    return (
        <ul>
        {personsToSHow.map(person => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
    )
}

export default Persons