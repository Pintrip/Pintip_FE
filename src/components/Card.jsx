function Card({children, title, text, imageUrl}) {
    return (
        <div className='w-60 h-80 p-4 bg-[#fff] rounded-[20px] inline-flex flex-col justify-end items-start gap-1 overflow-hidden mr-[10px] shrink-0 snap-center'>
            {children}
            <img src={imageUrl} className='mb-[46px] bg-cover'/>
            <span className='font-semibold text-base'>{title}</span>
            <span className='font-medium text-sm text-grey-6'>{text}</span>
        </div>
    )
}

export default Card;