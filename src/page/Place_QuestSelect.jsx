function Place_QuestSelect() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <div className="relative h-14 flex items-center px-[25px]">
        {/* Back Button */}
        <button className="w-6 h-6 flex items-center justify-center">
          <img src="/arrow_back_ios.png" alt="뒤로가기" className="w-6 h-6" />
        </button>

        {/* Title */}
        <h1
          className="
            absolute
            left-1/2
            -translate-x-1/2
            text-body-1
            font-semibold
            text-[#242424]
          "
        >
          세션 만들기
        </h1>
      </div>
    </div>
  );
}

export default Place_QuestSelect;
