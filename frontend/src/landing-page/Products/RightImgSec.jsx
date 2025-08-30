function RightImgSec({ img, des, title, link1Text }) {
  return (
    <div className="container">
      <div className="row pt-[4rem]">
        <div className={`col-4 font-normal ms-auto my-auto`}>
          <h4>{title}</h4>
          <p className="pt-4 text-[1.05rem] leading-7">{des}</p>
          <div className="row">
            <div className="col-5 font-medium">
              <a href="">{link1Text}→</a>
            </div>
          </div>
        </div>
        <div className="col-7 ms-5 ">
          <a href="">
            <img className="p-1 me-5" src={img} alt={title} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default RightImgSec;
