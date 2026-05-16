import { useState, useRef } from "react";
import Button from "../components/Button";

function BottomSheet({
  visible,
  onClose,
  place,
  quest,
  image,
  discovery,
  review,
  tags,
  guide,
  completed = false,
  onRecord,
}) {
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startY = useRef(0);
  const sheetRef = useRef(null);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setDragging(true);
  };

  const onTouchMove = (e) => {
    const dy = e.touches[0].clientY - startY.current;

    if (dy > 0) setDragY(dy);
  };

  const onTouchEnd = () => {
    setDragging(false);

    const sheetH = sheetRef.current?.offsetHeight || 300;

    if (dragY > sheetH * 0.3) onClose();

    setDragY(0);
  };

  const hasData = discovery || review || tags?.length;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: `rgba(0,0,0,${visible ? 0.3 : 0})`,
        display: "flex",
        alignItems: "flex-end",
        zIndex: 50,
        transition: "background 0.3s ease",
        pointerEvents: visible ? "all" : "none",
      }}
      onClick={onClose}
    >
      <div
        ref={sheetRef}
        style={{
          background: "white",
          width: "100%",
          borderRadius: "16px 16px 0 0",
          padding: "24px",
          position: "relative",
          transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
          transition: dragging ? "none" : "transform 0.3s ease-out",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 드래그 핸들 */}
        <div
          style={{
            width: 40,
            height: 4,
            background: "#c8c6c5",
            borderRadius: 2,
            margin: "0 auto 16px",
          }}
        />

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 20,
            color: "#7f7a79",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* 완료 배지 */}
        {completed && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#ff5f36",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#ff5f36",
              }}
            >
              퀘스트 완료
            </p>
          </div>
        )}

        {/* 이미지 */}
        {image ? (
          <img
            src={image}
            alt={place}
            style={{
              width: "100%",
              height: 192,
              objectFit: "cover",
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: 192,
              background: "#f2f2f2",
              borderRadius: 12,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                stroke="#c8c6c5"
                strokeWidth="1.5"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                stroke="#c8c6c5"
                strokeWidth="1.5"
              />
              <path
                d="M21 15l-5-5L5 21"
                stroke="#c8c6c5"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        {/* 장소명 & 퀘스트 */}
        <p
          style={{
            fontSize: 13,
            color: "#969291",
            marginBottom: 4,
          }}
        >
          {place}
        </p>

        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#242424",
            marginBottom: 20,
          }}
        >
          {quest}
        </p>

        {hasData ? (
          <>
            {discovery && (
              <div style={{ marginBottom: 16 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "#aeabab",
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>👁</span> 발견한 것
                </p>

                <p
                  style={{
                    fontSize: 15,
                    color: "#393736",
                  }}
                >
                  {discovery}
                </p>
              </div>
            )}

            {review && (
              <div style={{ marginBottom: 16 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "#aeabab",
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>📝</span> 짧은 후기
                </p>

                <p
                  style={{
                    fontSize: 15,
                    color: "#393736",
                    whiteSpace: "pre-line",
                  }}
                >
                  {review}
                </p>
              </div>
            )}

            {tags?.length > 0 && (
              <div
                style={{
                  marginBottom: completed ? 0 : 20,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "#aeabab",
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>😊</span> 이 장소는 어땠나요?
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 999,
                        border: "1px solid #ff5f36",
                        color: "#ff5f36",
                        fontSize: 14,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              background: "#fff4f0",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#ff5f36",
                marginBottom: 4,
              }}
            >
              기록 가이드
            </p>

            <p
              style={{
                fontSize: 14,
                color: "#5a5756",
              }}
            >
              {guide}
            </p>
          </div>
        )}

        {/* 미션 기록하기 버튼 */}
        {!completed && (
          <Button
            onClick={onRecord}
            style={{
              borderRadius: 16,
              width: "100%",
            }}
          >
            미션 기록하기
          </Button>
        )}
      </div>
    </div>
  );
}

export default BottomSheet;
