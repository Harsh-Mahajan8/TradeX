import DropdownLayout from "./DropdownLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
function Support() {
  return (
    <div className="dropdown">
      <DropdownLayout title={"Account Opening"} icon={<AddCircleOutlineIcon />}>
        <ul>
          <li>
            <a href="">Resident individual</a>
          </li>
          <li>
            <a href="">Minor</a>
          </li>
          <li>
            <a href="">Non Resident Indian (NRI)</a>
          </li>
          <li>
            <a href="">Company, Partnership, HUF and LLP</a>
          </li>
          <li>
            <a href="">Glossary</a>
          </li>
        </ul>
      </DropdownLayout>
      <DropdownLayout
        title={"Your TradeX Account"}
        icon={<AccountCircleIcon />}
      >
        <ul>
          <li>
            <a href=""> Your Profile</a>
          </li>
          <li>
            <a href="">Account modification</a>
          </li>
          <li>
            <a href="">
              Client Master Report (CMR) and Depository Participant (DP)
            </a>
          </li>
          <li>
            <a href="">Nomination</a>
          </li>
          <li>
            <a href="">Transfer and conversion of securities</a>
          </li>
        </ul>
      </DropdownLayout>
      <DropdownLayout title={"Kite"} icon={<AdsClickIcon />}>
        <li>
          <a href="">IPO</a>
        </li>
        <li>
          <a href="">Trading FAQs</a>
        </li>
        <li>
          <a href="">Margin Trading Facility (MTF) and Margins</a>
        </li>
        <li>
          <a href="">Charts and orders</a>
        </li>
        <li>
          <a href="">Alerts and Nudges</a>
        </li>
        <li>
          <a href="">General</a>
        </li>
      </DropdownLayout>
      <DropdownLayout title={"Funds"} icon={<CurrencyRupeeIcon />}>
        <li>
          <a href="">Add money</a>
        </li>
        <li>
          <a href="">Withdraw money</a>
        </li>
        <li>
          <a href="">Add bank accounts</a>
        </li>
        <li>
          <a href="">eMandates</a>
        </li>
      </DropdownLayout>
    </div>
  );
}

export default Support;
