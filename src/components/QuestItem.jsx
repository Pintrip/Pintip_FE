function QuestItem({ title, content, onClick }) {
    return (
        <div className='w-[240px] h-[340px] border border-grey-1 shrink-0 mr-[10px]' style={{ position: 'relative' }} onClick={onClick}>
            <div className="size- px-3 py-2 absolute top-3 right-3 bg-orange-6 rounded-xl inline-flex justify-center items-center gap-2.5 w-[45px] h-[32px]" >
                <div className="justify-center text-stone-50 text-xs font-semibold font-['Pretendard'] leading-4">완료</div>
            </div>
            <div className='w-full h-[252px] bg-cover bg-no-repeat' style={{backgroundImage: 'url(/alternative_image.png)', borderRadius: 12}}></div>
            <div className='flex flex-col p-3'>
                <span className='font-semibold text-grey-10' style={{fontSize: 16}}>{title}</span>
                <span className='font-medium text-grey-6' style={{fontSize: 14}}>{content}</span>
            </div>
        </div>
    );
}

export default QuestItem;