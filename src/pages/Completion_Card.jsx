import Button from '../components/Button';
import Chip from '../components/Chip';
import ticketStore from '../stores/TicketStore';

function Ticket({imageUrl='', location='', title='', quests=[], found='', review='', chips=[]}) {
    return (
        <div>
            <div className='bg-repeat w-80 h-[7px]' style={{backgroundImage: "url('/ticket_triangle.png')"}}></div>
            <div className='w-80 bg-[#fff] flex flex-col p-4'>
                <div className='bg-no-repeat bg-cover w-full h-50 bg-center' style={{backgroundImage: imageUrl? `url(${imageUrl})` : 'url(/alternative_image.png)', borderRadius: 16}} />
                <div className='flex flex-col mb-2'>
                    <span className='font-medium text-[14px] text-grey-5'>{location}</span>
                    <span className='font-semibold text-[20px] text-[#242424]'>{title}</span>
                </div>
                <div className='bg-orange-1 w-full h-[112px] p-4 text-orange-6 font-semibold text-[12px]' style={{borderRadius: 16}}>
                    <span className='flex flex-row h-[22px] mb-2'><img src='/verified.png' className='pr-1 '/>완료 퀘스트</span>
                    {quests.map((q, i) => <span key={i} className='text-grey-9 font-semibold text-[14px] flex flex-row mt-1'><img src='/check.png' className='pr-1'/>{q}</span>)}
                </div>
                <hr className='border-grey-1 border-t my-4' />
                <div className='flex flex-col'>
                    <span className='text-grey-4 font-semibold font-[12px] mb-2'>👁 발견한 것</span>
                    <span className='mb-5 text-grey-9 font-semibold text-[14px]'>{found}</span>
                    <span className='text-grey-4 font-semibold font-[12px] mb-2'>📝 짧은 후기</span>
                    <span className='mb-5 text-grey-9 font-semibold text-[14px]'>{review}</span>
                    <span className='text-grey-4 font-semibold font-[12px] mb-2'>😊이 장소는 어땠나요?</span>
                    <div className='mb-5 text-grey-9 font-semibold text-[14px] flex flex-row w-full  flex-wrap'>{chips.map((c, i) => <Chip key={i} label={c} className='bg-orange-1 border feborder-orange-6 mb-2 text-orange-6' style={{pointerEvents: 'none', marginRight: 8}}/>)}</div>
                </div>
            </div>
            <div className='bg-repeat w-80 h-[7px]' style={{backgroundImage: "url('/ticket_rtriangle.png')"}}></div>
        </div>
    )
}

function CompletionCard() {
    const tickets = ticketStore((state) => state.tickets);

    return (
        <div className='bg-grey-1 min-h-screen w-full flex flex-col'>
            <div className='font-semibold text-xl text-[#242424] mt-15' style={{paddingTop: 9, paddingBottom: 9, width: '100%', textAlign: 'center'}}>핀트립 완료 카드</div>
            <div className='flex-1 w-full overflow-y-auto scrollbar-none flex flex-col justify-start items-center pb-32'>
                <Ticket imageUrl={tickets[0]?.imageUrl} location={tickets[0]?.location} title={tickets[0]?.title} quests={tickets[0]?.quests} found={tickets[0]?.found} review={tickets[0]?.review} chips={tickets[0]?.chips}/>
            </div>
            <div className='bg-grey-1 p-[10px] box-border flex flex-col items-center gap-2' style={{width: 'calc(100% - 40px)', zIndex: 2, position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)'}}>
                <Button style={{width: '100%', maxWidth: 360, marginBottom: 8}}>카드 저장하기</Button>
                <div className='w-full pt-[9px] pb-[9px] text-grey-6 font-medium text-[18px]' style={{textAlign: 'center'}}>새 핀트립 시작하기</div>
            </div>
        </div>
    );
}

export default CompletionCard;