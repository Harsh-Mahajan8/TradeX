import TextField from "@mui/material/TextField";

function HeroSignUp() {
  return (
    <div className="container">
      <div className="row justify-center">
        <div className="col-md-6 align-self-end">
          <img src="/Signup/account_open.svg" alt="" />
        </div>
        <div className="col-md-4 pt-5">
          <h4>Signup now</h4>
          <p className="text-[#5f5f5f!important] text-[1rem]">
            Or track your existing application
          </p>
          <form action="">
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
            /> <br />
            <TextField id="standard-basic" label="Email" variant="standard" /> <br />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
            /> <br />
            <button className="btn my-3 mx-0 hover:text-[#fff!important] ">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HeroSignUp;
