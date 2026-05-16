import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import axios from "axios";

function SectionCreate() {
  const navigate = useNavigate();
  console.log("SectionCreate: render start");

  const selectedImageCard = JSON.parse(
    localStorage.getItem("selectedImageCard"),
  );

  console.log("SectionCreate: loaded selectedImageCard from localStorage", selectedImageCard);

  const quests = selectedImageCard?.quests || [];

  const handleCreateSession = async () => {
    console.log("SectionCreate: handleCreateSession start", { selectedImageCard });
    if (!selectedImageCard) {
      console.error("SectionCreate: selectedImageCard is missing in localStorage.");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/trip-sessions`,
        {
          dongId: selectedImageCard.dongId,
          imageCardId: selectedImageCard.imageCardId,
        },
      );

      console.log("SectionCreate: trip-sessions POST response", response.data);

      localStorage.setItem("tripSessionId", response.data.sessionId);
      localStorage.setItem("sessionId", response.data.sessionId);
      localStorage.setItem("tripSession", JSON.stringify(response.data));

      navigate("/record");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#FFFFFF] flex flex-col overflow-hidden">
      <div className="shrink-0 bg-[#FFFFFF]">
        <Header title="세션 만들기" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mt-3 px-5 flex flex-col gap-[8px]">
          <h2 className="text-body-3 font-semibold text-[#242424]">
            오늘의 핀트립
          </h2>

          <p className="text-caption-2 font-medium text-grey-5 leading-[20px]">
            오늘 당신이 발견할 새로운 동네 이야기
          </p>
        </div>

        <div className="mt-[36px] px-5 pb-[10px] flex flex-col gap-[8px]">
          {quests.map((quest, index) => (
            <div
              key={quest.questId}
              className="min-h-[194px] rounded-[16px] bg-orange-0 p-4 box-border overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <div className="h-[28px] flex items-center">
                  <p className="text-body-3 font-semibold text-[#242424]">
                    {index + 1}. {quest.quest}
                  </p>
                </div>

                <div className="mt-[8px]">
                  <p className="text-body-6 font-medium text-grey-7 leading-6 whitespace-pre-line">
                    {quest.questDescription}
                  </p>
                </div>

                <div className="mt-[16px] bg-orange-2 rounded-[12px] p-3 box-border w-full">
                  <p className="text-caption-3 font-semibold text-orange-6 leading-4">
                    기록 가이드
                  </p>

                  <p className="mt-[2px] text-caption-2 font-medium text-grey-10 leading-5 whitespace-normal break-words">
                    간단한 기록과 사진으로 오늘의 핀트립을 남겨보세요!
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 bg-[#FFFFFF] p-3">
        <Button className="w-full" onClick={handleCreateSession}>
          세션 만들고 시작하기
        </Button>
      </div>
    </div>
  );
}

export default SectionCreate;
