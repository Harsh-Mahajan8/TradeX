import { useState, useRef, useEffect } from "react";

function Collapse({ children, isOpen }) {
  const ref = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen) {
      setHeight((ref.current.scrollHeight+1) + "px"); // expand
    } else {
      setHeight("0px"); // collapse
    }
  }, [isOpen]);

  return (
    <div
      className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      style={{ maxHeight: height }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

export default function DropdownLayout({ title, children, icon }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ms-2">
      <div className="ms-4 mb-[2rem]">
        <button
          className="col-12 hover:scale-x-101 transition border rounded"
          onClick={() => setOpen(!open)}
        >
          <div className="row text-[1.051rem]  text-black font-semibold rounded-t">
            <div className="col-1 rounded-r-sm py-[1.1rem] bg-[#f1f7ff] text-[#387ed1] ps-1 ms-[.81rem] me-2">
              {icon}
            </div>
            <div className="col-auto my-auto">{title}</div>
            <div className="col-auto ms-auto my-auto me-3 text-[#387ed1]">
              {open ? (
                <i class="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </div>
          </div>
        </button>

        <Collapse isOpen={open}>
          <div className="crad px-4 py-2 border">{children}</div>
        </Collapse>
      </div>
    </div>
  );
}
