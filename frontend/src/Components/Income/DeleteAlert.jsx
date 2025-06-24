

const DeleteAlert = ({ onDelete, content }) => {
    return (
        <div className="">
            <p className="text-sm">{content}</p>

            <div className="flex justify-end items-center">
                <button type="button"
                className="add-btn add-btn-fill"
                onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert
