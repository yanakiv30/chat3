import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e) {
    e.preventDefault();   
    if (!isOpen) {
      navigate("/userOptions");
    } else navigate("");
    setIsOpen(!isOpen);    
  }
  return <button onClick={handleClick}> {isOpen ? "▲" : "▼"}</button>;
}
