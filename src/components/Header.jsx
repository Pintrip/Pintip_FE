import { useNavigate } from "react-router-dom";

function Header({ title, hideBackButton = false }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-14 flex items-center px-[25px]">
      <button
        onClick={() => navigate(-1)}
        className={`w-6 h-6 flex items-center justify-center ${
          hideBackButton ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img src="/arrow_back_ios.png" alt="뒤로가기" className="w-6 h-6" />
      </button>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-body-1 font-semibold text-[#242424]">
        {title}
      </h1>
    </div>
  );
}

export default Header;
