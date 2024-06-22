import { useNavigate } from "react-router-dom";

const useHandleLogout = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
};

export default useHandleLogout;
