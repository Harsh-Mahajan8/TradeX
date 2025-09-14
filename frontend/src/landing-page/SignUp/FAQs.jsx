import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { useState } from "react";
function FAQs() {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div className="container mt-[4rem]">
      <h4 className="pb-5">FAQs</h4>
      <Accordion
        expanded={expanded}  className="shadow-none"
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className="fs-5">What is a Zerodha account?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className = "text-[#5f5f5f!important]">
            A Zerodha account is a combined demat and trading account that
            allows investors to buy, sell, and hold securities digitally.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded}  className="shadow-none"
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className="fs-5">
            What documents are required to open a demat account?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className = "text-[#5f5f5f!important]">
            The following documents are required to open a Zerodha account
            online:
            <>
              <li>PAN number</li>
              <li>
                Aadhaar Card (Linked with a phone number for OTP verification)
              </li>
              <li>
                Cancelled cheque or bank account statement (To link your bank
                account)
              </li>
              <li>
                Income proof (Required only if you wish to trade in Futures &
                options)
              </li>
            </>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded}  className="shadow-none"
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className="fs-5">
            Is Zerodha account opening free?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className = "text-[#5f5f5f!important]">Yes, It is completely free.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded}  className="shadow-none"
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className="fs-5 ">
            Are there any maintenance charges for a demat account?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className = "text-[#5f5f5f!important]">
            The account maintaince charges is appliacable based on the account
            type. For Basic Services Demat Account: Zero charges if the holding
            value is less than ₹4,00,000. For non-Basic Services Demat Account
            demat accounts: ₹300 per year + GST. To learn more about BSDA, Click
            here.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded}  className="shadow-none"
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className="fs-5">
            Can I open a demat account without a bank account?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className = "text-[#5f5f5f!important]">
            To open a demat account, you must have a bank account in your name.
            If UPI verification is completed successfully, no proof of bank is
            needed. However, if bank verification fails, you'll need to provide
            either a cancelled cheque or a bank statement to link your bank
            account to Zerodha.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FAQs;
