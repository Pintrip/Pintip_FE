function Button({ children, style, className = '', ...props }) {
    return (
        <button
            className={`bg-orange-6 border-none text-white h-14 text-center ${className}`}
            style={{borderRadius: 16, boxSizing: 'border-box', ...style}}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;