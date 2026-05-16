import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Header from "../components/Header";

function Place_QuestSelect() {
  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const places = JSON.parse(localStorage.getItem("randomDongs")) || [];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const [imageCards, setImageCards] = useState([]);

  const selectedPlace = selectedIndex !== null ? places[selectedIndex] : null;

  const getSubjectParticle = (word) => {
    const lastChar = word[word.length - 1];
    const uni = lastChar.charCodeAt(0);

    const hasFinalConsonant = (uni - 44032) % 28 !== 0;

    return hasFinalConsonant ? "이" : "가";
  };

  const handleRoulette = () => {
    if (isRolling || places.length === 0) return;

    setIsRolling(true);
    setSelectedIndex(null);
    setShowResult(false);

    const finalIndex = Math.floor(Math.random() * places.length);

    const rouletteOrder = [0, 1, 2, 0, 1, 2, 0, 1, 2];

    for (let i = 0; i <= finalIndex; i++) {
      rouletteOrder.push(i);
    }

    let current = 0;

    const interval = setInterval(async () => {
      setActiveIndex(rouletteOrder[current]);

      current++;

      if (current >= rouletteOrder.length) {
        clearInterval(interval);

        const selectedDong = places[finalIndex];

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/dongs/${selectedDong.id}/image-cards`,
          );

          console.log(response.data);

          setImageCards(response.data);
        } catch (error) {
          console.error(error);
        }

        setTimeout(() => {
          setActiveIndex(null);
          setSelectedIndex(finalIndex);
          setCurrentCard(0);
          setIsRolling(false);

          setTimeout(() => {
            setIsTransitioning(true);

            setTimeout(() => {
              setShowResult(true);
              setIsTransitioning(false);
            }, 550);
          }, 700);
        }, 150);
      }
    }, 120);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;

    const cardWidth = 280;
    const gap = 16;

    const index = Math.round(scrollLeft / (cardWidth + gap));

    setCurrentCard(index);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] relative overflow-hidden">
      <div
        className={`transition-all duration-[550ms] ease-out ${
          isTransitioning
            ? "opacity-0 blur-[8px] scale-[0.97]"
            : "opacity-100 blur-0 scale-100"
        }`}
      >
        <Header title="세션 만들기" hideBackButton={showResult} />

        <div className="mt-3 px-5 flex flex-col gap-[6px] transition-all duration-500">
          <div className="overflow-hidden">
            <h2 className="text-body-3 font-semibold text-[#242424] transition-all duration-500">
              {showResult && selectedPlace
                ? `${selectedPlace.name}${getSubjectParticle(
                    selectedPlace.name,
                  )} 뽑혔어요`
                : "동네 룰렛"}
            </h2>
          </div>

          <div className="flex flex-col">
            <p className="text-caption-2 font-medium text-grey-5 leading-[20px] transition-all duration-500">
              {showResult
                ? "동네의 테마들을 보고"
                : "3개의 장소 중 한 곳이 결정됩니다."}
            </p>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                showResult
                  ? "max-h-[40px] opacity-100 mt-0"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-caption-2 font-medium text-grey-5 leading-[20px]">
                이번 핀트립의 퀘스트를 만나보세요
              </p>
            </div>
          </div>
        </div>

        {!showResult ? (
          <div className="mt-9 flex flex-col items-center gap-2">
            {places.map((place, index) => {
              const isActive = activeIndex === index;
              const isSelected = selectedIndex === index;

              return (
                <div
                  key={place.id}
                  className={`h-[84px] rounded-[12px] border flex items-center transition-all duration-200 ${
                    isSelected
                      ? "bg-orange-1 border-orange-5"
                      : isActive
                        ? "border-orange-5 bg-[#FFFFFF]"
                        : "border-grey-1 bg-[#FFFFFF]"
                  }`}
                  style={{
                    width: "calc(100% - 40px)",
                  }}
                >
                  <img
                    src="/place_small_ex.png"
                    alt={place.name}
                    className="w-[60px] h-[60px] rounded-[12px] ml-3"
                  />

                  <div className="ml-3 flex flex-col justify-center">
                    <div className="h-7 flex items-center">
                      <p className="text-body-3 font-semibold text-[#000000]">
                        {place.name}
                      </p>
                    </div>

                    <div className="h-4 flex items-center">
                      <p className="text-[12px] text-[#5E5E5E]">
                        비주류 감성 여행지
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="
                mt-[40px]
                flex
                overflow-x-auto
                overflow-y-hidden
                snap-x
                snap-mandatory
                scroll-smooth
                gap-[16px]
                scrollbar-hide
                px-[calc(50vw-140px)]
              "
            >
              {imageCards.map((card, index) => (
                <div
                  key={card.imageCardId}
                  className={`snap-center shrink-0 transition-all duration-500 ${
                    currentCard === index
                      ? "scale-100 opacity-100"
                      : "scale-[0.92] opacity-40"
                  }`}
                >
                  <div className="relative w-[280px] h-[400px] rounded-[16px] overflow-hidden">
                    <img
                      src="/place_big_ex.png"
                      alt={card.imageHeadline}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute left-[20px] top-[308px] flex flex-col">
                      <div className="h-7 flex items-center">
                        <p className="text-body-3 font-semibold text-[#FFFFFF] text-left">
                          {card.imageHeadline}
                        </p>
                      </div>

                      <div className="mt-[4px]">
                        <p className="text-caption-2 font-medium text-grey-2 leading-[20px] text-left whitespace-pre-line">
                          {card.imageSubDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[20px] flex items-center justify-center gap-[8px]">
              {imageCards.map((_, index) => (
                <div
                  key={index}
                  className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${
                    currentCard === index ? "bg-orange-5" : "bg-grey-2"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-3 left-5 right-5">
        <Button
          onClick={
            showResult ? () => navigate("/sectioncreate") : handleRoulette
          }
          className="w-full"
          style={{
            borderRadius: 16,
          }}
        >
          {showResult ? "이 조합 선택하기" : "룰렛 돌리기"}
        </Button>
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

export default Place_QuestSelect;
