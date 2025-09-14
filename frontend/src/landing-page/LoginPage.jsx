import TextField from "@mui/material/TextField";

function LoginPage() {
  return (
    <div className="container m-5">
      <div className="row justify-center ">
        <div className="flex flex-col justify-center items-center col-md-5">
          <img
            src="/Navbar/cross-mark.png"
            alt=""
            className="w-[10rem] ps-[]"
          />
          <span className="ps-2 bg-gradient-to-b from-indigo-500 to-pink-700 bg-clip-text text-transparent font-bold text-[3rem]">
            TradeX
          </span>
        </div>
        <div className="col-md-4 p-[2rem] bg-gradient-to-b from-indigo-500 to-pink-700 text-white rounded-r-md">
          <h4 className="ps-4">Welcome Back!!!</h4>
          <p className="ps-4 text-[#fff!important] text-[1rem]">
            Login to your account
          </p>
          <form action="" className="ps-4 pe-[8rem]">
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              InputLabelProps={{
                style: { color: "white" }, // label white
              }}
              InputProps={{
                style: { color: "white" }, // text white
              }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white", // default underline
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white", // hover
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white", // focused
                },
              }}
            />
            <br />
            <TextField
              label="Password"
              variant="standard"
              fullWidth
              InputLabelProps={{
                style: { color: "white" }, // label white
              }}
              InputProps={{
                style: { color: "white" }, // text white
              }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white", // default underline
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white", // hover
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white", // focused
                },
              }}
            />
            <br />
            <span className="bg-[#fff] px-3 py-2 rounded ">
              <button className="mt-4 bg-gradient-to-b from-indigo-500 to-pink-700 bg-clip-text text-transparent font-bold my-3 mx-0 hover:text-[#000!important]">
                Login
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
