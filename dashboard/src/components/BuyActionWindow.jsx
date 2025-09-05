import { Link } from "react-router-dom";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
function BuyActionWindow({ uid }) {
  const context = useContext(GeneralContext);
  const handleCancelBtn = () => {
    context.closeBuyWindow();
  };

  return (
    // <div className="containerClass" id="buy-window" draggable="true">
    //   <div className="regular-order">
    //     <div className="inputs">
    //       <fieldset>
    //         <legend>Qty.</legend>
    //         <input type="number" name="qty" id="qty" />
    //       </fieldset>
    //       <fieldset>
    //         <legend>Price</legend>
    //         <input type="number" name="price" id="price" step="0.05" />
    //       </fieldset>
    //     </div>
    //   </div>

    <div className="containerClass" id="buy-window" draggable="true">
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "15ch" } }}
        noValidate
        autoComplete="off"
        className="flex"
      >
        <TextField size="small" id="qty" label="Qty." />
        <TextField size="small" id="price" label="Price" />
      </Box>
      <div className="buttons flex mt-4">
        <span className="text-[0.9em]">Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue">Buy</Link>
          <Link to="" className="btn rounded btn-sm btn-grey" onClick={handleCancelBtn}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BuyActionWindow;
