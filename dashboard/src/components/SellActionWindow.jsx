import { useContext, useState } from "react";
import GeneralContext from "./GeneralContext/GeneralContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function SellActionWindow({ uid }) {
  const [orderData, setOrderdata] = useState({
    name: "",
    price: 0.0,
    qty: 1,
    mode: "Sell",
    product: "",
  });
  const context = useContext(GeneralContext);

  const handleSellClick = async () => {
    context.sellStock({
      name: uid,
      qty: orderData.qty,
      price: orderData.price,
      mode: "SELL",
      product: orderData.product,
      orderStatus: "Executed",
    });
    context.closeSellWindow();
  };
  const handleCancelBtn = () => {
    context.closeSellWindow();
  };

  return (
    <div
      className="shadow-md border-zinc-400 ps-2 pb-3 pt-0 rounded-md"
      id="sell-window"
    >
      <span className="row mb-2 h-10 bg-red-500 px-3 rounded-t text-white font-semibold">
        {uid}
      </span>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "15ch" } }}
        noValidate
        autoComplete="off"
        className="flex pb-3"
      >
        <TextField
          size="small"
          id="qty"
          label="Qty."
          onChange={(e) =>
            setOrderdata({ ...orderData, qty: parseInt(e.target.value) || 1 })
          }
          value={orderData.qty}
        />
        <TextField
          size="small"
          id="price"
          label="Price"
          onChange={(e) =>
            setOrderdata({
              ...orderData,
              price: parseFloat(e.target.value) || 0,
            })
          }
          value={orderData.price}
        />
      </Box>
      <FormControl className="ms-[.82rem!important]">
        <FormLabel id="demo-row-radio-buttons-group-label">Product</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) =>
            setOrderdata({
              ...orderData,
              product: e.target.value,
            })
          }
        >
          <FormControlLabel value="CNC" control={<Radio />} label="CNC" />
          <FormControlLabel value="MIS" control={<Radio />} label="MIS" />
          <FormControlLabel value="NRML" control={<Radio />} label="NRML" />
        </RadioGroup>
      </FormControl>
      <div className="buttons flex justify-between mt-4">
        <span className="text-[0.8em] ps-2">Margin required ₹140.65</span>
        <div className="">
          <button className="buyActionBtn" onClick={handleSellClick}>
            Sell
          </button>
          <button
            className="buyActionBtn bg-[#ff3737!important]"
            onClick={handleCancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellActionWindow;
