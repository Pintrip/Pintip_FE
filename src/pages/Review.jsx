import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Header from '../components/Header';
import TextArea from '../components/TextArea';
import TextField from '../components/TextField';
import ticketStore from '../stores/TicketStore';

const CHIPS = ["낯설었다", "조용했다", "다시 가고 싶다", "생각보다 좋았다"];

const DISTRICT = "성수동";
const PLACE = "성수동 오래된 공장 골목";
const COMPLETED_QUESTS = ["가장 조용한 골목 찾기", "낡은 간판 찾기"];

function Review() {
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedChips, setSelectedChips] = useState([]);
    const [discovery, setDiscovery] = useState('');
    const [review, setReview] = useState('');
    const fileInputRef = useRef(null);
    const insertTicket = ticketStore((state) => state.insertTicket);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreviewUrl(URL.createObjectURL(file));
    };

    const toggleChip = (label) => {
        setSelectedChips((prev) => (prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]));
    };

    return (
        <div className="w-screen h-screen bg-[#FFFFFF] flex flex-col overflow-hidden">
            <div className="shrink-0 bg-[#FFFFFF]">
                <Header title="여행 후기 작성" />
            </div>

            <div className="flex flex-col gap-1 pl-1">
              {COMPLETED_QUESTS.map((quest) => (
                <div key={quest} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#ff5e36"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-body-5 text-grey-4">{quest}</p>
                </div>
              ))}
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

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center w-full">
              <Button
                onClick={() => {
                  insertTicket({
                    imageUrl: previewUrl,
                    location: DISTRICT,
                    title: PLACE,
                    quests: COMPLETED_QUESTS,
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
