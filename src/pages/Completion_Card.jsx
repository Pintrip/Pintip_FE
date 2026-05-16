import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Chip from '../components/Chip';
import { api } from '../api/client';

function Ticket({ imageUrl = '', location = '', title = '', quests = [], found = '', review = '', chips = [] }) {
    return (
        <div>
            <div className="bg-repeat w-80 h-[7px]" style={{ backgroundImage: "url('/ticket_triangle.png')" }}></div>

            <div className="w-80 bg-[#FFFFFF] flex flex-col p-4">
                <div
                    className="bg-no-repeat bg-cover w-full h-50 bg-center"
                    style={{
                        backgroundImage: imageUrl ? `url(${imageUrl})` : 'url(/alternative_image.png)',
                        borderRadius: 16,
                    }}
                />

                <div className="flex flex-col mb-2">
                    <span className="font-medium text-[14px] text-grey-5">{location}</span>

                    <span className="font-semibold text-[20px] text-[#242424]">{title}</span>
                </div>

                <div
                    className="bg-orange-1 w-full min-h-[112px] p-4 text-orange-6 font-semibold text-[12px]"
                    style={{ borderRadius: 16 }}
                >
                    <span className="flex flex-row h-[22px] mb-2">
                        <img src="/verified.png" className="pr-1" />
                        완료 퀘스트
                    </span>

                    {quests.filter((q) => q?.completed === true).length > 0 ? (
                        quests
                            .filter((q) => q?.completed === true)
                            .map((q, i) => (
                                <span key={i} className="text-grey-9 font-semibold text-[14px] flex flex-row mt-1">
                                    <img src="/check.png" className="pr-1" />
                                    {q.quest}
                                </span>
                            ))
                    ) : (
                        <span className="text-grey-4 text-[14px]">아직 완료한 퀘스트가 없어요</span>
                    )}
                </div>

                <hr className="border-grey-1 border-t my-4" />

                <div className="flex flex-col">
                    <span className="text-grey-4 font-semibold text-[12px] mb-2">👁 발견한 것</span>

                    <span className="mb-5 text-grey-9 font-semibold text-[14px] whitespace-pre-line">{found}</span>

                    <span className="text-grey-4 font-semibold text-[12px] mb-2">📝 짧은 후기</span>

                    <span className="mb-5 text-grey-9 font-semibold text-[14px] whitespace-pre-line">{review}</span>

                    <span className="text-grey-4 font-semibold text-[12px] mb-2">😊 이 장소는 어땠나요?</span>

                    <div className="mb-5 text-grey-9 font-semibold text-[14px] flex flex-row w-full flex-wrap">
                        {chips.map((c, i) => (
                            <Chip
                                key={i}
                                label={c}
                                className="bg-orange-1 border border-orange-6 mb-2 text-orange-6"
                                style={{
                                    pointerEvents: 'none',
                                    marginRight: 8,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-repeat w-80 h-[7px]" style={{ backgroundImage: "url('/ticket_rtriangle.png')" }}></div>
        </div>
    );
}

function CompletionCard() {
    const navigate = useNavigate();

    const [sessionData, setSessionData] = useState(null);
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const data = await api.get('/trip-sessions');

                setSessionData(data);

                setQuests(data.selectedImageCard?.quests || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSession();
    }, []);

    const handleNewTrip = () => {
        localStorage.clear();

        navigate('/');
    };

    const card = sessionData?.selectedImageCard;

    return (
        <div className="bg-grey-1 min-h-screen w-full flex flex-col">
            <div
                className="font-semibold text-xl text-[#242424] mt-15 mb-2"
                style={{
                    paddingTop: 9,
                    paddingBottom: 9,
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                핀트립 완료 카드
            </div>

            <div className="flex-1 w-full overflow-y-auto scrollbar-none flex flex-col justify-start items-center pb-32">
                <Ticket
                    imageUrl={card?.imageFile ? `/images/${card.imageFile}` : '/alternative_image.png'}
                    location={sessionData?.dong?.name}
                    title={card?.imageHeadline}
                    quests={quests}
                    found=""
                    review=""
                    chips={[]}
                />
            </div>

            <div
                className="bg-grey-1 p-[10px] box-border flex flex-col items-center gap-2"
                style={{
                    width: 'calc(100% - 40px)',
                    zIndex: 2,
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <Button
                    onClick={handleNewTrip}
                    style={{
                        width: '100%',
                        maxWidth: 360,
                        marginBottom: 8,
                    }}
                >
                    새 핀트립 시작하기
                </Button>
            </div>
        </div>
    );
}

export default CompletionCard;
