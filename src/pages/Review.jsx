import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Header from '../components/Header';
import TextArea from '../components/TextArea';
import TextField from '../components/TextField';
import ticketStore from '../stores/TicketStore';
import { api } from '../api/client';

const CHIPS = ["낯설었다", "조용했다", "다시 가고 싶다", "생각보다 좋았다"];

function Review() {
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedChips, setSelectedChips] = useState([]);
    const [discovery, setDiscovery] = useState('');
    const [review, setReview] = useState('');
    const [sessionData, setSessionData] = useState(null);
    const [quests, setQuests] = useState([]);
    const fileInputRef = useRef(null);
    const insertTicket = ticketStore((state) => state.insertTicket);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreviewUrl(URL.createObjectURL(file));
    };

    const toggleChip = (label) => {
        setSelectedChips((prev) => (prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]));
    };

    return (
        <div className="w-screen h-screen bg-[#FFFFFF] flex flex-col overflow-hidden p-5">
            <div className="shrink-0 bg-[#FFFFFF]">
                <Header title="여행 후기 작성" />
            </div>

            <div className="bg-orange-1 w-full min-h-[112px] p-4 text-orange-6 font-semibold text-[12px]" style={{ borderRadius: 16 }}>
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

            {/* 입력 폼 */}
            <div className="flex flex-col gap-5 px-5 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <img src="/visibility.svg" alt="눈" className="w-5 h-5" />

                  <p className="text-body-5 text-grey-4">발견한 것</p>
                </div>

                <TextField
                  placeholder="발견한 것을 짧게 적어주세요"
                  value={discovery}
                  onChange={(e) => setDiscovery(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <img src="/text.svg" alt="텍스트" className="w-5 h-5" />

                  <p className="text-body-5 text-grey-4">짧은 후기</p>
                </div>

                <TextArea
                  placeholder="이곳에서의 경험은 어땠나요?"
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <img src="/mood.svg" alt="무드" className="w-5 h-5" />

                  <p className="text-body-5 text-grey-4">이 장소는 어땠나요?</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {CHIPS.map((label) => (
                    <Chip
                      key={label}
                      label={label}
                      selected={selectedChips.includes(label)}
                      onClick={() => toggleChip(label)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-3 left-0 right-0 flex justify-center w-full">
              <Button
                onClick={() => {
                  insertTicket({
                    imageUrl: previewUrl,
                    location: sessionData?.dong?.name,
                    title: sessionData?.selectedImageCard?.imageHeadline,
                    quests: quests.filter((q) => q?.completed === true).map((q) => q.quest),
                    found: discovery,
                    review: review,
                    chips: selectedChips,
                  });
                  navigate('/finish');
                }}
                style={{
                  borderRadius: 16,
                  width: "calc(100% - 40px)",
                }}
              >
                퀘스트 완료하기
              </Button>
            </div>
        </div>
    );
}

export default Review;
