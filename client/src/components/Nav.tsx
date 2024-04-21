import React from "react";
import { useNavigate } from "react-router-dom";

export function Nav() {
  const navigate = useNavigate();

  function goToLogout() {
    navigate("/logout");
  }

  return <nav className="card"></nav>;
}

export default Nav;
