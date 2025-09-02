function CreateTickets() {
  return (
    <div className="px-4 mb-5 bg-gray-50">
      <div className="row justify-between pt-[2rem] pb-[1.5rem]">
        <h1 className=" text-5xl col-auto text-[#333]">Support Portal</h1>
        <button className="col-auto btn">
          My Tickets
        </button>
        <div className="row my-4">
          <div className="input ms-2 bg-white rounded-sm border border-gray-400">
            <i className="fa-solid text-zinc-500 fa-magnifying-glass px-3 my-auto me-4"></i>
            <input
              placeholder="Eg: How do I open my account, How do i activate F&O... "
              type="text"
              className="supInput col-11 py-3 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTickets;
