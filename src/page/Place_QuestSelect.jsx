function Place_QuestSelect() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-14 px-5 my-3 flex items-center">
        {/* Back Button */}
        <button className="w-6 h-6 flex items-center justify-center">
          <img src="/arrow_back_ios.png" alt="뒤로가기" className="w-2.5 h-5" />
        </button>

        {/* Title */}
        <h1
          className="
            absolute
            left-1/2
            -translate-x-1/2
            text-xl
            font-semibold
            text-[#242424]
            leading-8
          "
        >
          세션 만들기
        </h1>
      </div>
    </div>
  );
}

export default Place_QuestSelect;
