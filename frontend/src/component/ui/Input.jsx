function Input({ label, type, value, name, placeholder, onChange }) {
    return (
        <div className='input-wrapper'>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input