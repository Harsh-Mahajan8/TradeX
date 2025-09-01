import BoxLayout from "./BoxLayout";

function ChargesBox() {
  return (
    <>
      <BoxLayout
        title={"Charges for account opening"}
        th1={"Type of account"}
        th2={"	Charges"}
        l1d1={"Online account"}
        l1d3={<></>}
        l2d1={"Offline account"}
        l2d3 ={<></>}
        l3d1={"NRI account (offline only)	"}
        l3d2={"₹ 500"}
        l4d1={"Partnership, LLP, HUF, or Corporate accounts (offline only)"}
        l4d2={"	₹ 500"}
      />
      <BoxLayout
        title={"Demat AMC (Annual Maintenance Charge)"}
        th1={"Value of holdings	"}
        th3={"AMC"}
        l1d1={"Up to ₹4 lakh"}
        l2d2={<></>}
        l1d2={<></>}
        l2d1={"₹4 lakh - ₹10 lakh"}
        l2d3={"₹ 100 per year, charged quarterly*"}
        l3d1={"Above ₹10 lakh	"}
        l3d3={"₹ 300 per year, charged quarterly"}
        btm={
          <>
            {" "}
            Lower AMC is applicable only if the account qualifies as a Basic
            Services Demat Account (BSDA). BSDA account holders cannot hold more
            than one demat account. To learn more about BSDA,
            <a href="#">click here</a>
          </>
        }
      />

      <BoxLayout
        title={"Charges for optional value added services"}
        th1={"Service"}
        th2={"Charges"}
        th3={"Billing Frquency"}
        l1d1={"Tickertape"}
        l1d2={"	Free: 0 | Pro: 249/2399"}
        l1d3={"Monthly / Annual	"}
        l2d1={"Smallcase"}
        l2d2={"Buy & Invest More: 100 | SIP: 10"}
        l2d3={"	Per transaction	"}
        l3d1={"Kite Connect		"}
        l3d2={"Connect: 500 | Personal: Free"}
        l3d3={"Monthly"}
      />
    </>
  );
}

export default ChargesBox;
