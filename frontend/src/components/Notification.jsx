const Notification = ({ content, type }) => {
    return (
        <div className={type}>
            {content}
        </div>
    )
}

export default Notification
