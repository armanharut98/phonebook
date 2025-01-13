const Person = ({ name, number, onDelete }) => {
    return (
        <p>
            <strong>{name}:</strong> {number}
            <button onClick={onDelete}>delete</button>
        </p>
    )
}

const Persons = ({ persons, deletePerson }) => {
    return (
        <>
            <h2>Numbers</h2>
            {persons.map(person =>
                <Person
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    onDelete={() => deletePerson(person.id)}
                />
            )}
        </>
    )
}

export default Persons
