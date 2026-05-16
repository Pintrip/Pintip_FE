function Chip({ label, selected = false, onClick, className = '', ...props }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 rounded-xl text-sm font-semibold font-['Pretendard'] leading-5 transition-colors ${
                selected
                    ? 'bg-[#ffefeb] text-[#ff5e36] outline outline-1 outline-offset-[-1px] outline-[#ff5e36]'
                    : 'bg-[#f9f9f9] text-[#5a5756]'
            } ${className}`}
            {...props}
        >
            {label}
        </button>
    );
}

export default Chip;
