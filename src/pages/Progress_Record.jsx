import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import QuestItem from "../components/QuestItem";
import QuestDong from "../components/QuestDong";

const INITIAL_QUESTS = [
  {
    place: "성수동 매우 엄청 매우 오래된 정말로 공장 골목 거리",
    quest: "낡은 간판 찾기",
    guide: "간판 이름과 첫인상을 한 문장으로 남겨보세요!",
    image: "/alternative_image.png",
    discovery: "오래된 간판과 조용한 골목을 발견했다.",
    review: "유명한 장소는 아니지만,\n평범한 동네를 새롭게 보게 됐다.",
    tags: ["낯설었다", "조용했다", "다시 가고 싶다"],
  },
  {
    place: "성수동 매우 엄청 매우 오래된 정말로 공장 골목 거리",
    quest: "가장 조용한 골목 찾기",
    guide: "가장 조용하다고 느낀 이유를 적어보세요!",
    image: null,
    discovery: null,
    review: null,
    tags: [],
  },
  {
    place: "성수동 매우 엄청 매우 오래된 정말로 공장 골목 거리",
    quest: "오래된 건물 찾기",
    guide: "건물의 특징이나 느낌을 한 문장으로 남겨보세요!",
    image: null,
    discovery: null,
    review: null,
    tags: [],
  },
];

function Record() {
  const navigate = useNavigate();
  const location = useLocation();

  const sliderRef = useRef(null);

  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetCompleted, setSheetCompleted] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);

  useEffect(() => {
    const state = location.state;

    if (state?.completed) {
      setQuests((prev) =>
        prev.map((q) => (q.quest === state.quest ? { ...q, ...state } : q)),
      );

      setSelectedQuest(state);
      setSheetCompleted(true);
      setSheetVisible(true);

      navigate("/record", {
        replace: true,
        state: null,
      });
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
    const gap = 16;

    const index = Math.round(sliderRef.current.scrollLeft / (cardWidth + gap));

    setActiveIndex(index);
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FFFFFF] overflow-hidden">
      {/* 로고 */}
      <div className="mt-[8px] pl-[20px]">
        <img src="/logo.png" />
      </div>

      {/* 진행 중인 핀트립 */}
      <div className="mt-[20px]">
        <div className="h-[32px] flex items-center pl-[20px]">
          <span className="font-semibold text-xl text-[#0A0A0A]">
            진행 중인 핀트립
          </span>
        </div>

        <div className="mt-[12px] px-[20px]">
          <QuestDong name="성수동" />
        </div>
      </div>

      {/* 퀘스트 체크리스트 */}
      <div className="mt-[32px]">
        <div className="h-[40px] flex items-center justify-between pl-[20px] pr-[20px]">
          <span className="font-semibold text-xl text-[#0A0A0A]">
            퀘스트 체크리스트
          </span>

          <span className="text-grey-5 text-base font-semibold">1/3</span>
        </div>

        <div
          ref={sliderRef}
          onScroll={onScroll}
          className="
            w-full
            flex
            flex-row
            items-center
            mt-[20px]
            overflow-x-auto
            no-scrollbar
            snap-x
            snap-mandatory
            scroll-smooth
            gap-[16px]
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "calc(50vw - 120px)",
            paddingRight: "calc(50vw - 120px)",
          }}
        >
          {quests.map((q, i) => (
            <div
              key={i}
              className={`snap-center shrink-0 transition-all duration-500 ${
                activeIndex === i
                  ? "scale-100 opacity-100"
                  : "scale-[0.92] opacity-40"
              }`}
            >
              <QuestItem
                title={q.quest}
                content={q.place}
                onClick={() => openQuest(q)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-1.5 mt-[20px]">
          {quests.map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-md ${
                activeIndex === i ? "bg-orange-6" : "bg-grey-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* footer 버튼 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center w-full">
        <Button
          onClick={() => navigate("/review")}
          style={{
            borderRadius: 16,
            width: "calc(100% - 40px)",
          }}
        >
          여행 마무리 하기
        </Button>
      </div>

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
        onRecord={() => navigate("/mission")}
      />
    </div>
  );
}

export default Record;
