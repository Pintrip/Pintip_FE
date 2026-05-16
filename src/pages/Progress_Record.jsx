import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import BottomSheet from '../components/BottomSheet';
import QuestItem from '../components/QuestItem';
import QuestDong from '../components/QuestDong';

const INITIAL_QUESTS = [
    {
        place: '성수동 오래된 공장 골목',
        quest: '낡은 간판 찾기',
        guide: '간판 이름과 첫인상을 한 문장으로 남겨보세요!',
        image: '/alternative_image.png',
        discovery: '오래된 간판과 조용한 골목을 발견했다.',
        review: '유명한 장소는 아니지만,\n평범한 동네를 새롭게 보게 됐다.',
        tags: ['낯설었다', '조용했다', '다시 가고 싶다'],
    },
    { place: '성수동 오래된 공장 골목', quest: '가장 조용한 골목 찾기', guide: '가장 조용하다고 느낀 이유를 적어보세요!', image: null, discovery: null, review: null, tags: [] },
    { place: '성수동 오래된 공장 골목', quest: '오래된 건물 찾기', guide: '건물의 특징이나 느낌을 한 문장으로 남겨보세요!', image: null, discovery: null, review: null, tags: [] },
];

function Record() {
    const navigate = useNavigate();
    const location = useLocation();

    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeftRef = useRef(0);

    const [quests, setQuests] = useState(INITIAL_QUESTS);
    const [activeIndex, setActiveIndex] = useState(0);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [sheetCompleted, setSheetCompleted] = useState(false);
    const [selectedQuest, setSelectedQuest] = useState(null);

    useEffect(() => {
        const state = location.state;
        if (state?.completed) {
            // 완료된 퀘스트 데이터 업데이트
            setQuests((prev) =>
                prev.map((q) => (q.quest === state.quest ? { ...q, ...state } : q))
            );
            setSelectedQuest(state);
            setSheetCompleted(true);
            setSheetVisible(true);
            // state 소비 후 제거 (새로고침/재진입 방지)
            navigate('/record', { replace: true, state: null });
        }
    }, []);

    const openQuest = (quest) => {
        const hasData = quest.discovery || quest.review || quest.tags?.length;
        setSelectedQuest(quest);
        setSheetCompleted(!!hasData);
        setSheetVisible(true);
    };

    const onScroll = () => {
        const cardWidth = 240;
        const gap = 10;
        const index = Math.round(sliderRef.current.scrollLeft / (cardWidth + gap));
        setActiveIndex(index);
    };

    const onMouseDown = (e) => {
        isDragging.current = true;
        sliderRef.current.style.cursor = 'grabbing';
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeftRef.current = sliderRef.current.scrollLeft;
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        sliderRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current);
    };

    const stopDragging = () => {
        isDragging.current = false;
        sliderRef.current.style.cursor = 'grab';
    };

    return (
        <div className='p-5 w-full h-full' style={{ position: 'relative' }}>
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
                    style={{ paddingLeft: 'calc(50% - 120px)', paddingRight: 'calc(50% - 120px)' }}
                    ref={sliderRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onScroll={onScroll}
                >
                    {quests.map((q, i) => (
                        <QuestItem key={i} title={q.quest} content={q.place} onClick={() => openQuest(q)} />
                    ))}
                </div>
                <div className="flex justify-center items-center gap-1.5 mt-4">
                    {quests.map((_, i) => (
                        <div key={i} className={`size-2 rounded-md ${activeIndex === i ? 'bg-orange-6' : 'bg-white'}`} />
                    ))}
                </div>
            </div>

            <Button
                style={{ position: 'absolute', bottom: 44, width: 'calc(100% - 40px)' }}
                onClick={() => navigate('/review')}
            >
                여행 마무리 하기
            </Button>

            <BottomSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                completed={sheetCompleted}
                guide={selectedQuest?.guide}
                place={selectedQuest?.place}
                quest={selectedQuest?.quest}
                image={selectedQuest?.image}
                discovery={selectedQuest?.discovery}
                review={selectedQuest?.review}
                tags={selectedQuest?.tags}
                onRecord={() => navigate('/mission')}
            />
        </div>
    );
}

export default Record;
