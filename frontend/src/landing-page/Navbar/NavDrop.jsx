import React, { useState, useRef, useEffect } from "react";

const NavDrop = ({title, children}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        
      >
      {title}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full mt-3 w-[48rem] bg-white shadow-lg rounded-sm border border-gray-200 z-50">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavDrop;
