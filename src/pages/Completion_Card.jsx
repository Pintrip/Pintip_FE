import Button from '../components/Button';

function Ticket() {
    return (
        <div>
            <div className='bg-repeat w-80 h-[7px]' style={{backgroundImage: "url('/ticket_triangle.png')"}}></div>
            <div className='w-80 h-[692px] bg-[#fff]'></div>
            <div className='bg-repeat w-80 h-[7px]' style={{backgroundImage: "url('/ticket_rtriangle.png')"}}></div>
        </div>
    )
}

function CompletionCard() {
    return (
        <div className='bg-grey-1 w-full h-full flex flex-col justify-center items-center'>
            <div className='font-semibold text-xl text-[#242424] mt-15' style={{paddingTop: 9, paddingBottom: 9, width: '100%', textAlign: 'center'}}>핀트립 완료 카드</div>
            <div className='w-full h-screen scrollbar-none overflow-y-auto flex flex-col justify-start items-center'>
                <Ticket />
            </div>
            <div className='bg-grey-1 p-[10px] box-border' style={{width: 'calc(100% - 40px)', zIndex: 2, position: 'fixed', bottom: 0}}>
                <Button style={{width: '100%', marginBottom: 8}}>카드 저장하기</Button>
                <div className='w-full pt-[9px] pb-[9px] text-grey-6 font-medium text-[18px]' style={{textAlign: 'center'}}>새 핀트립 시작하기</div>
            </div>
        </div>
    );
}

export default CompletionCard;