import DropdownLayout from "./DropdownLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdsClickIcon from "@mui/icons-material/AdsClick";

function Support() {
  return (
    <div className="row pt-2">
      <div className="dropdown col-8">
        <DropdownLayout
          title={"Account Opening"}
          icon={<AddCircleOutlineIcon />}
        >
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
        <DropdownLayout
          title={"Funds"}
          icon={<img src="/Support/rupee.svg" className="mx-auto" />}
        >
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
        <DropdownLayout
          title={"Console"}
          icon={<img src="/Support/console.svg" className="mx-auto" />}
        >
          <li>
            <a href="">Portfolio</a>
          </li>
          <li>
            <a href="">Corporate actions</a>
          </li>
          <li>
            <a href="">Funds statement</a>
          </li>
          <li>
            <a href="">Reports</a>
          </li>
          <li>
            <a href="">Profile</a>
          </li>
          <li>
            <a href="">Segments</a>
          </li>
        </DropdownLayout>
        <DropdownLayout
          title={"Coin"}
          icon={<img src="/Support/coin.svg" className="mx-auto" />}
        >
          <li>
            <a href="">Mutual funds</a>
          </li>
          <li>
            <a href="">National Pension Scheme (NPS)</a>
          </li>
          <li>
            <a href="">Fixed Deposit (FD)</a>
          </li>
          <li>
            <a href="">Features on Coin</a>
          </li>
          <li>
            <a href="">Payments and Orders</a>
          </li>
          <li>
            <a href="">General</a>
          </li>
        </DropdownLayout>
      </div>
      <div className="col-4">
        <ul className="py-[1.5rem] mx-4 px-4 ps-5 bg-[#ff91001a] border-l-8 border-[#ff9100] underline text-[#3b7bc9]">
          <li className="mb-3">
            <a href="">
              Exclusion of F&O contracts on 8 securities from August 29, 2025
            </a>
          </li>
          <li>
            <a href="">F&O contract expiry day changes</a>
          </li>
        </ul>

        <div className="sideTable ms-2 me-3">
          <div className="row border font-semibold bg-gray-100">Quick Links</div>
          <div className="row"><a href="">1. Track account opening</a></div>
          <div className="row"><a href="">2. Track segment activation</a></div>
          <div className="row"><a href="">3. Intraday margins</a></div>
          <div className="row"><a href="">4. Kite user manual</a></div>
        </div>
      </div>
    </div>
  );
}

export default Support;
