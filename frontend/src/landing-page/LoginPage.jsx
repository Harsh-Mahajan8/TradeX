import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function LoginPage() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/user/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        
        setTimeout(() => {
          window.location.href = "http://localhost:5173";
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="container m-5 pt-[3rem]">
      <div className="row justify-center bg-gradient-to-b from-indigo-500 to-pink-700 text-white rounded-r-md">
        <div className="col-md-1 bg-white"></div>
        <div className="flex flex-col justify-center items-center col-md-6 bg-white rounded-xl m-1">
          <img
            src="/Navbar/cross-mark.png"
            alt=""
            className="w-[10rem] ps-[]"
          />
          <span className="ps-2 bg-gradient-to-b from-indigo-500 to-pink-700 bg-clip-text text-transparent font-bold text-[3rem]">
            TradeX
          </span>
        </div>
        <div className="col-md-4 p-[2rem] ">
          <div className="row justify-between">
            <h4 className="ps-4 col-auto">Welcome Back!!!</h4>
            <button className="col-auto bg-white border-2 rounded py-1">
              <Link to="..">
                <ArrowBackIcon /> Back
              </Link>
            </button>
          </div>

          <p className="ps-4 text-[#fff!important] text-[1rem]">
            Login to your account
          </p>
          <form action="" className="ps-4 pe-[8rem]" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              name="email"
              onChange={handleChange}
              value={email}
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
              name="password"
              onChange={handleChange}
              value={password}
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
            </span>{" "}
            <br />
            <span>
              Already have an account?{" "}
              <Link className="text-[#ffd165!important]" to={"/signup"}>
                Signup
              </Link>
            </span>
          </form>
        </div>
        <div className="col-1 bg-white"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
