import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Landing() {
  const sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const sessionId = localStorage.getItem("sessionId");

        if (sessionId) {
          try {
            const sessionResponse = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/trip-sessions`,
              {
                headers: {
                  "X-Session-Id": sessionId,
                },
              },
            );

            console.log(sessionResponse.data);

            if (
              sessionResponse.data &&
              sessionResponse.data.status === "ACTIVE"
            ) {
              navigate("/record");

              return;
            }
          } catch (error) {
            console.error(error);

            localStorage.removeItem("sessionId");
          }
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/dongs`,
        );

        console.log(response.data);

        if (!Array.isArray(response.data)) {
          console.error("response.data가 배열이 아님");

          return;
        }

        const activeDongs = response.data.filter((dong) => dong.active);

        const shuffled = [...activeDongs].sort(() => 0.5 - Math.random());

        const selectedThree = shuffled.slice(0, 3);

        localStorage.setItem("randomDongs", JSON.stringify(selectedThree));

        console.log(selectedThree);
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, [navigate]);

  const onScroll = () => {
    const cardWidth = 240;
    const gap = 16;

    const index = Math.round(sliderRef.current.scrollLeft / (cardWidth + gap));

    setActiveIndex(index);
  };

  const handleStart = () => {
    navigate("/place-quest-select");
  };

  return (
    <div
      className="w-full h-full p-5 overflow-x-hidden bg-cover bg-center"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage: "url(/background.png)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          position: "absolute",
          top: 50,
          left: 20,
        }}
      >
        <img src="/logo.png" />
      </div>

      <div className="w-full flex flex-col items-center gap-[4px]">
        <span
          className="font-semibold text-xl"
          style={{
            textAlign: "center",
            color: "#242424",
          }}
        >
          평범한 장소를
        </span>

        <span
          className="font-semibold text-xl"
          style={{
            textAlign: "center",
            color: "#242424",
          }}
        >
          오늘만의 비주류 여행지로
        </span>

        <div
          ref={sliderRef}
          onScroll={onScroll}
          className="w-full flex flex-row items-center mt-11.5 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "calc(50vw - 120px)",
            paddingRight: "calc(50vw - 120px)",
          }}
        >
          <div
            className={`snap-center shrink-0 transition-all duration-500 ${
              activeIndex === 0
                ? "scale-100 opacity-100"
                : "scale-[0.92] opacity-40"
            }`}
          >
            <Card
              title="동 선택"
              text="탐색할 지역을 선택하세요."
              imageUrl={"/select_dong.png"}
            />
          </div>

          <div
            className={`w-[240px] snap-center shrink-0 transition-all duration-500 ${
              activeIndex === 1
                ? "scale-100 opacity-100"
                : "scale-[0.92] opacity-40"
            }`}
          >
            <Card
              title="랜덤 퀘스트"
              text="예측 불가능한 미션"
              imageUrl={"/random_quest.png"}
            />
          </div>

          <div
            className={`snap-center shrink-0 transition-all duration-500 ${
              activeIndex === 2
                ? "scale-100 opacity-100"
                : "scale-[0.92] opacity-40"
            }`}
          >
            <Card title="여행 기록" text="나만의 발자취 저장">
              <div className="flex-1 flex items-center">
                <div className="flex flex-row">
                  <img src="/trip_record1.png" className="mr-[10px]" />

                  <img src="/trip_record2.png" className="mr-[10px]" />

                  <img src="/trip_record3.png" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-center items-center gap-1.5 mt-3">
          <div
            className={`size-2 rounded-md ${
              activeIndex === 0 ? "bg-orange-6" : "bg-[#FFFFFF]"
            }`}
          />

          <div
            className={`size-2 rounded-md ${
              activeIndex === 1 ? "bg-orange-6" : "bg-[#FFFFFF]"
            }`}
          />

          <div
            className={`size-2 rounded-md ${
              activeIndex === 2 ? "bg-orange-6" : "bg-[#FFFFFF]"
            }`}
          />
        </div>
      </div>

      <Button
        style={{
          borderRadius: 16,
          position: "absolute",
          bottom: 12,
          boxSizing: "border-box",
          width: "calc(100% - 40px)",
        }}
        onClick={handleStart}
      >
        핀트립 시작하기
      </Button>
    </div>
  );
}

export default Landing;
