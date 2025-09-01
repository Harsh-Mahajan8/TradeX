function BoxLayout({
  title,
  th1,
  th2,
  th3,
  l1d1,
  l1d2,
  l1d3,
  l2d1,
  l2d2,
  l2d3,
  l3d1,
  l3d2,
  l3d3,
  l4d1,
  l4d2,
  l4d3,
  btm,
}) {
  return (
    <div className="container mt-[5rem] ">
      <h4 className="mx-3 my-3">{title}</h4>
      <div className="tab border mx-3 text-[0.9rem] border-gray-500 rounded px-3 p-2">
        <div className="row pe-3 border-b border-gray-300 py-2 font-semibold">
          <div className="col-5">{th1}</div>
          <div className="col-4">{th3}</div>
          <div className="col-3">{th2}</div>
        </div>

        <div className="row pe-3 pt-3">
          <div className="col-5 py-1 ps-3">{l1d1}</div>
          <div className="col-4 pb-3">
            {l1d3 ? (
              l1d3
            ) : (
              <p className="my-auto w-[3rem] text-center rounded bg-green-600 text-white">
                Free
              </p>
            )}
          </div>
          <div className="col-3">
            {l1d2 ? (
              l1d2
            ) : (
              <p className="mb-3 w-[3rem] text-center rounded bg-green-600 text-white">
                Free
              </p>
            )}
          </div>
        </div>

        <div className="row pe-3 ">
          <div className="col-5 py-2 my-auto ps-3">{l2d1}</div>

          <div className="col-4 ">
            {l2d3 ? (
              l2d3
            ) : (
              <p className="my-auto w-[3rem] text-center rounded bg-green-600 text-white">
                Free
              </p>
            )}
          </div>

          <div className="col-3 py-1">
            {l2d2 ? (
              l2d2
            ) : (
              <p className="my-auto w-[3rem] text-center rounded bg-green-600 text-white">
                Free
              </p>
            )}
          </div>
        </div>

        <div className="row pe-3">
          <div className="col-5 py-1 ps-3">{l3d1}</div>
          <div className="col-4 py-1">{l3d3}</div>
          <div className="col-3 py-1">{l3d2}</div>
        </div>

        {l4d1 && (
          <div className="row pe-3 ">
            <div className="col-5 py-1 ps-3">{l4d1}</div>
            <div className="col-4 py-1">{l4d3}</div>
            <div className="col-3 py-1">{l4d2}</div>
          </div>
        )}
      </div>
      <p className="text-[.8rem] mx-4 pt-2">{btm}</p>
    </div>
  );
}

export default BoxLayout;
