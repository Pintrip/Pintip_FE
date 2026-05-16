function QuestItem({ title, content, onClick }) {
  return (
    <div
      className="w-[240px] h-[340px] border border-grey-1 shrink-0 mr-[10px]"
      style={{ position: "relative" }}
      onClick={onClick}
    >
<div
        className="w-full h-[252px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url(/alternative_image.png)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      ></div>
      <div className="flex flex-col p-3">
        <span className="font-semibold text-grey-10" style={{ fontSize: 16 }}>
          {title}
        </span>
        <span className="font-medium text-grey-6" style={{ fontSize: 14 }}>
          {content}
        </span>
      </div>
    </div>
  );
}

export default QuestItem;
