function TextArea({ placeholder, className = '', ...props }) {
    return (
        <textarea
            placeholder={placeholder}
            className={`w-full border border-grey-2 rounded-xl px-4 py-3 text-body-5 text-black placeholder:text-grey-4 outline-none focus:border-orange-5 resize-none ${className}`}
            {...props}
        />
    );
}

export default TextArea;
