import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Header from '../components/Header';
import TextArea from '../components/TextArea';
import TextField from '../components/TextField';
import axios from 'axios';

const CHIPS = ['낯설었다', '조용했다', '다시 가고 싶다', '생각보다 좋았다'];

const PLACE = '성수동 오래된 공장 골목';
const QUEST = '가장 조용한 골목 찾기';

function Mission() {
    const navigate = useNavigate();
    const location = useLocation();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedChips, setSelectedChips] = useState([]);
    const [discovery, setDiscovery] = useState('');
    const [review, setReview] = useState('');
    const [questData, setQuestData] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
      console.log("Mission: location.state", location.state);
      if (location.state?.quest) {
        setQuestData(location.state.quest);
      }
    }, [location.state]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!discovery.trim() || !review.trim() || selectedChips.length === 0) {
            setErrorMsg('발견한 것, 짧은 후기, 감정 태그를 모두 입력해주세요.');
            return;
        }
        setErrorMsg('');

        const sessionId = localStorage.getItem('sessionId') || localStorage.getItem('tripSessionId');
        const questId = questData?.questId;
        const imageCardId = questData?.imageCardId;

        console.log("Mission: submit review", { sessionId, questId, imageCardId, discovery, review, selectedChips, previewUrl });

        if (!sessionId || !questId || !imageCardId) {
            console.error('Mission: 세션 또는 퀘스트 정보가 없습니다.', { sessionId, questId, imageCardId });
            navigate('/record');
            return;
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/trip-sessions/${sessionId}/quest-reviews/${questId}`,
                {
                    imageCardId,
                    discoveredNote: discovery,
                    reviewText: review,
                },
            );
            console.log("Mission: PUT response", response.data);

            navigate('/record', {
                state: {
                    completed: true,
                    place: questData.place,
                    quest: questData.quest,
                    image: previewUrl,
                    discovery,
                    review,
                    tags: selectedChips,
                },
            });
        } catch (error) {
            console.error('Review 저장 실패:', error);
            navigate('/record');
        }
    };

    const toggleChip = (label) => {
        setSelectedChips((prev) => (prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]));
    };

    return (
        <div className="w-screen h-screen bg-[#FFFFFF] flex flex-col overflow-hidden">
            <div className="shrink-0 bg-[#FFFFFF]">
                <Header title="미션 후기 작성" />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="px-5 py-5 flex flex-col gap-5">
                    {/* 이미지 업로드 */}
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="w-full h-48 rounded-2xl bg-grey-1 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                    >
                        {previewUrl ? (
                            <img src={previewUrl} alt="업로드 이미지" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <img src="/add_photo.svg" alt="이미지 추가" className="w-8 h-8 mb-2" />
                                <p className="text-body-5 text-grey-4">이미지 업로드하기</p>
                            </>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* 장소 정보 */}
                    <div className="flex flex-col gap-1 pb-4 border-b border-grey-1">
                        <p className="text-body-5 text-grey-4">{questData?.place || PLACE}</p>
                        <p className="text-body-2 font-bold">{questData?.quest || QUEST}</p>
                    </div>

                    {/* 입력 폼 */}
                    <div className="flex flex-col gap-5">
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
                </div>
            </div>

            <div className="shrink-0 bg-[#FFFFFF] px-3 pt-1 pb-3">
                {errorMsg && (
                    <p className="text-red-500 text-xs text-center mb-2">{errorMsg}</p>
                )}
                <Button
                    className="w-full"
                    onClick={handleSubmit}
                >
                    퀘스트 완료하기
                </Button>
            </div>
        </div>
    );
}

export default Mission;
