import { useState } from "react";
import Button from "../components/Button";

function Place_QuestSelect() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const places = [
    {
      title: "성수동",
      description: "카페거리와 팝업스토어의 중심",
    },
    {
      title: "성수동",
      description: "카페거리와 팝업스토어의 중심",
    },
    {
      title: "성수동",
      description: "카페거리와 팝업스토어의 중심",
    },
  ];

  const handleRoulette = () => {
    if (isRolling) return;

    setIsRolling(true);
    setSelectedIndex(null);

    const finalIndex = Math.floor(Math.random() * 3);

    const rouletteOrder = [0, 1, 2, 0, 1, 2, 0, 1, 2];

    for (let i = 0; i <= finalIndex; i++) {
      rouletteOrder.push(i);
    }

    let current = 0;

    const interval = setInterval(() => {
      setActiveIndex(rouletteOrder[current]);

      current++;

      if (current >= rouletteOrder.length) {
        clearInterval(interval);

        setTimeout(() => {
          setActiveIndex(null);
          setSelectedIndex(finalIndex);
          setIsRolling(false);
        }, 150);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] relative">
      <div className="relative h-14 flex items-center px-[25px]">
        <button className="w-6 h-6 flex items-center justify-center">
          <img src="/arrow_back_ios.png" alt="뒤로가기" className="w-6 h-6" />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-body-1 font-semibold text-[#242424]">
          세션 만들기
        </h1>
      </div>

      <div className="mt-3 px-5 flex flex-col gap-[2px]">
        <div className="h-7 flex items-center">
          <h2 className="text-body-3 font-semibold text-[#242424]">
            동네 룰렛
          </h2>
        </div>

        <div className="h-7 flex items-center">
          <p className="text-caption-2 font-medium text-grey-5">
            3개의 장소 중 랜덤으로 한 곳이 결정됩니다.
          </p>
        </div>
      </div>

      <div className="mt-9 flex flex-col items-center gap-2">
        {places.map((place, index) => {
          const isActive = activeIndex === index;
          const isSelected = selectedIndex === index;

          return (
            <div
              key={index}
              className={`h-[84px] rounded-[12px] border flex items-center transition-all duration-200 ${isSelected ? "bg-orange-1 border-orange-5" : isActive ? "border-orange-5 bg-[#ffffff]" : "border-grey-1 bg-[#ffffff]"}`}
              style={{ width: "calc(100% - 40px)" }}
            >
              <img
                src="/place_small_ex.png"
                alt={place.title}
                className="w-[60px] h-[60px] rounded-[12px] ml-3"
              />

              <div className="ml-3 flex flex-col justify-center">
                <div className="h-7 flex items-center">
                  <p className="text-body-3 font-semibold text-[#000000]">
                    {place.title}
                  </p>
                </div>

                <div className="h-4 flex items-center">
                  <p className="text-[12px] text-[#5E5E5E]">
                    {place.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center w-full">
        <Button
          onClick={handleRoulette}
          style={{ borderRadius: 16, width: "calc(100% - 40px)" }}
        >
          룰렛 돌리기
        </Button>
      </div>
    </div>
  );
}

export default Place_QuestSelect;
