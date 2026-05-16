
import { useRef, useState } from 'react'
import Button from '../components/Button';

function Landing() {
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
        <div className="w-full h-full p-5 overflow-x-hidden bg-cover bg-center" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', backgroundImage: 'url(/background.png)'}}>
            <div style={{display: 'flex', justifyContent: 'flex-start', position: 'absolute', top: 50, left: 20}}>
                <img src='/logo.png' />
            </div>
            <div className="w-full flex flex-col items-center" >
                <span className="font-semibold text-xl" style={{textAlign: 'center', color: '#242424'}}>평범한 장소를</span>
                <span className='font-semibold text-xl' style={{textAlign: 'center', color: '#242424'}}>오늘만의 비주류 여행지로</span>
                <div
                    ref={sliderRef}
                    className='w-full flex flex-row items-center mt-11.5 overflow-x-auto no-scrollbar snap-x snap-mandatory'
                    style={{cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: 'calc(50% - 120px)', paddingRight: 'calc(50% - 120px)'}}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onScroll={onScroll}
                >
                    <div className='w-60 h-80 p-4 bg-[#fff] rounded-[20px] inline-flex flex-col justify-end items-start gap-1 overflow-hidden mr-[10px] shrink-0 snap-center'>
                        <span className='font-semibold text-base'>동 선택</span>
                        <span className='font-medium text-sm text-grey-6'>탐색할 지역을 선택하세요.</span>
                    </div>
                    <div className='w-60 h-80 p-4 bg-[#fff] rounded-[20px] inline-flex flex-col justify-end items-start gap-1 overflow-hidden mr-[10px] shrink-0 snap-center'>
                        <span className='font-semibold text-base'>랜덤 퀘스트</span>
                        <span className='font-medium text-sm text-grey-6'>예측 불가능한 미션</span>
                    </div>
                    <div className='w-60 h-80 p-4 bg-[#fff] rounded-[20px] inline-flex flex-col justify-end items-start gap-1 overflow-hidden shrink-0 snap-center'>
                        <span className='font-semibold text-base'>여행 기록</span>
                        <span className='font-medium text-sm text-grey-6'>나만의 발자취 저장</span>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-1.5 mt-3">
                    <div className={`size-2 rounded-md ${activeIndex === 0 ? 'bg-orange-6' : 'bg-white'}`} />
                    <div className={`size-2 rounded-md ${activeIndex === 1 ? 'bg-orange-6' : 'bg-white'}`} />
                    <div className={`size-2 rounded-md ${activeIndex === 2 ? 'bg-orange-6' : 'bg-white'}`} />
                </div>
            </div>
            <Button style={{borderRadius: 16, position: 'absolute', bottom: 32, boxSizing: 'border-box', width: 'calc(100% - 40px)'}}>핀트립 시작하기</Button>
        </div>
    )
}

export default Landing;
