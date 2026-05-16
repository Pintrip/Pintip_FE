import Button from '../components/Button';
import { useRef, useState } from 'react'
import QuestItem from '../components/QuestItem';
import QuestDong from '../components/QuestDong';

function Record() {
    const sliderRef = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)
    const [activeIndex, setActiveIndex] = useState(0)

    const onScroll = () => {
        const cardWidth = 240 // w-60
        const gap = 10       // mr-[10px]
        const index = Math.round(sliderRef.current.scrollLeft / (cardWidth + gap))
        setActiveIndex(index)
    }

    const onMouseDown = (e) => {
        isDragging.current = true
        sliderRef.current.style.cursor = 'grabbing'
        startX.current = e.pageX - sliderRef.current.offsetLeft
        scrollLeft.current = sliderRef.current.scrollLeft
    }

    const onMouseMove = (e) => {
        if (!isDragging.current) return
        e.preventDefault()
        const x = e.pageX - sliderRef.current.offsetLeft
        sliderRef.current.scrollLeft = scrollLeft.current - (x - startX.current)
    }

    const stopDragging = () => {
        isDragging.current = false
        sliderRef.current.style.cursor = 'grab'
    }

    return (
        <div className='p-5 w-full h-full' style={{position: 'relative'}}>
            <div className='mt-15'>
                <img src='/logo.png' />
            </div>
            <div className='mt-5'>
                <span className='font-semibold text-xl text-[#0A0A0A]'>진행 중인 핀트립</span>
                <QuestDong name='성수동' />
            </div>
            <div className='mt-[34px]'>
                <div className='flex flex-row justify-between w-full mb-4'>
                    <span className='font-semibold text-xl text-[#0A0A0A]'>퀘스트 체크리스트</span>
                    <span className='text-grey-5 text-base font-semibold'>1/3</span>
                </div>
                <div 
                    className='flex flex-row overflow-x-auto no-scrollbar w-full' 
                    style={{paddingLeft: 'calc(50% - 120px)', paddingRight: 'calc(50% - 120px)'}}
                    ref={sliderRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onScroll={onScroll}
                >
                    <QuestItem title='낡은 간판 찾기' content='성수동 골목에서 오래된 간판을 찾아보세요.' />
                    <QuestItem title='낡은 간판 찾기' content='성수동 골목에서 오래된 간판을 찾아보세요.' />
                    <QuestItem title='낡은 간판 찾기' content='성수동 골목에서 오래된 간판을 찾아보세요.' />
                </div>
                <div className="flex justify-center items-center gap-1.5 mt-4">
                    <div className={`size-2 rounded-md ${activeIndex === 0 ? 'bg-orange-6' : 'bg-white'}`}/>
                    <div className={`size-2 rounded-md ${activeIndex === 1 ? 'bg-orange-6' : 'bg-white'}`}/>
                    <div className={`size-2 rounded-md ${activeIndex === 2 ? 'bg-orange-6' : 'bg-white'}`}/>
                </div>
            </div>
            <Button text='여행 마무리 하기' style={{position: 'absolute', bottom: 44, width: 'calc(100% - 40px)'}}>여행 마무리 하기</Button>
        </div>
    )
}

export default Record;