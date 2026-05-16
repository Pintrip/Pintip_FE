function TextField({ placeholder, className = '', ...props }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`w-full border border-grey-2 rounded-xl px-4 py-3 text-body-5 text-black placeholder:text-grey-4 outline-none focus:border-orange-5 ${className}`}
            {...props}
        />
    );
}

export default TextField;
