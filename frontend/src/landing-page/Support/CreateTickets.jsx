function CreateTickets() {
  return (
    <div className="px-4 bg-gray-50">
      <div className="row justify-between pt-[2rem] pb-[1.5rem]">
        <h1 className="col-auto text-[#333]">Support Portal</h1>
        <button className="col-auto bg-[#347ed1] text-white font-semibold rounded my-2 px-3 mx-3">
          My Tickets
        </button>
        <div className="row my-4">
          <div className="input ms-2 bg-white rounded-sm border border-gray-400">
            <i className="fa-solid text-zinc-500 fa-magnifying-glass px-2 my-auto me-3 col-1"></i>
            <input
              placeholder="Eg: How do I open my account, How do i activate F&O... "
              type="text"
              className="col-9 py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTickets;
