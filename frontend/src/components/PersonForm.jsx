const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
    return (
        <>
            <h2>Add new person</h2>
            <form onSubmit={onSubmit}>
                <div>name: <input value={newName} onChange={onNameChange} /></div>
                <div>number: <input value={newNumber} onChange={onNumberChange} /></div>
                <div><button type="submit">add</button></div>
            </form>
        </>
    )
}

export default PersonForm