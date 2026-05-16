function QuestDong({name}) {
    return (
        <div className='rounded-2xl h-18 w-full text-orange-6 font-semibold flex items-center p-5 mt-3' style={{backgroundImage: 'url(/pin.png), linear-gradient(to right, var(--color-orange-1), var(--color-orange-2))', backgroundRepeat: 'no-repeat, no-repeat', backgroundPosition: 'right 20px center, center'}}>{name}</div>
    )
}

export default QuestDong;