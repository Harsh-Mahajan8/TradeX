import { useState, useRef, useEffect } from "react";

function Collapse({ children, isOpen }) {
  const ref = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen) {
      setHeight(ref.current.scrollHeight + "px"); // expand
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
    <div className="mt-[3rem]">
      <div className="ms-4 my-[2rem] col-8 rounded">
        <button
          className="col-12 hover:scale-x-101 transition rounded border"
          onClick={() => setOpen(!open)}
        >
          <div className="row text-[1.1rem] fs-5 text-black font-semibol rounded-sm">
            <div className="col-1 py-3 bg-blue-50 text-[#387ed1] ps-2 ms-2 me-2">
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
          <div className="px-4 py-2 bg-white border">{children}</div>
        </Collapse>
      </div>
    </div>
  );
}
