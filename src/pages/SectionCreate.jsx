import Header from "../components/Header";
import Button from "../components/Button";

function SectionCreate() {
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

        <div className="mt-[36px] px-5 pb-[20px] flex flex-col gap-[8px]">
          <div className="min-h-[194px] rounded-[16px] bg-orange-0 p-4 box-border overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="h-[28px] flex items-center">
                <p className="text-body-3 font-semibold text-[#242424]">
                  1. 낡은 간판 찾기
                </p>
              </div>

              <div className="mt-[8px]">
                <p className="text-body-6 font-medium text-grey-7 leading-6">
                  평범한 동네를 낡은 간판을 찾는
                  <br />
                  여행지로 바꾸는 미션입니다.
                </p>
              </div>

              <div className="mt-[16px] bg-orange-2 rounded-[12px] p-3 box-border w-full">
                <p className="text-caption-3 font-semibold text-orange-6 leading-4">
                  기록 가이드
                </p>

                <p className="mt-[2px] text-caption-2 font-medium text-grey-10 leading-5 whitespace-normal break-words">
                  간판 이름과 첫인상을 한 문장으로 남겨보세요!
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[194px] rounded-[16px] bg-orange-0 p-4 box-border overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="h-[28px] flex items-center">
                <p className="text-body-3 font-semibold text-[#242424]">
                  2. 가장 조용한 골목 찾기
                </p>
              </div>

              <div className="mt-[8px]">
                <p className="text-body-6 font-medium text-grey-7 leading-6">
                  동네에서 가장 조용하고 평화로운
                  <br />
                  골목이 어디일까요?
                </p>
              </div>

              <div className="mt-[16px] bg-orange-2 rounded-[12px] p-3 box-border w-full">
                <p className="text-caption-3 font-semibold text-orange-6 leading-4">
                  기록 가이드
                </p>

                <p className="mt-[2px] text-caption-2 font-medium text-grey-10 leading-5 whitespace-normal break-words">
                  골목의 첫인상과 느낌을 한 문장으로 남겨보세요.
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[194px] rounded-[16px] bg-orange-0 p-4 box-border overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="h-[28px] flex items-center">
                <p className="text-body-3 font-semibold text-[#242424]">
                  3. 가장 조용한 골목 찾기
                </p>
              </div>

              <div className="mt-[8px]">
                <p className="text-body-6 font-medium text-grey-7 leading-6">
                  동네에서 가장 조용하고 평화로운
                  <br />
                  골목이 어디일까요?
                </p>
              </div>

              <div className="mt-[16px] bg-orange-2 rounded-[12px] p-3 box-border w-full">
                <p className="text-caption-3 font-semibold text-orange-6 leading-4">
                  기록 가이드
                </p>

                <p className="mt-[2px] text-caption-2 font-medium text-grey-10 leading-5 whitespace-normal break-words">
                  골목의 첫인상과 느낌을 한 문장으로 남겨보세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 bg-[#FFFFFF] p-3">
        <Button className="w-full">세션 만들고 시작하기</Button>
      </div>
    </div>
  );
}

export default SectionCreate;
