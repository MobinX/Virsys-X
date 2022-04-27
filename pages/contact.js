import { useState } from "react";
import { Prompt } from "../components/prompt";
export default function Contact() {
  const [hasTakenEmail, setTakeEmail] = useState(false);
  const [hasTakenName, setTakeName] = useState(true);
  const [hasTakenFeedback, setTakeFeedBAck] = useState(false);
  const [msg, setMsg] = useState("");

  const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validateTxt = (inp) => inp.length > 2

  return (
    <div className="col w-full h-full justify-start items-center  overflow-auto">
      <div className="p-4 bg-gray-900 border border-gray-800 rounded-md text-base w-[90%] md:w-[45%] mt-[9%] mb-3 md:mt-[8%] pl-6 col space-y-4 shadow-[2px_2px_17px_1px_rgba(7,192,217,0.5)] font-mono">
        {hasTakenName && (
          <Prompt
            prmt={`Enter Your Full Name:`}
            cb={(inp) => validateTxt(inp) ?  setTakeEmail(true) : setMsg("Name should not be so small")}
            out={""}
            setMsg={setMsg}
          />
        )}
        {hasTakenEmail && (
          <Prompt
            prmt={`Enter Your Email:`}
            cb={(inp) => validateEmail(inp) ?  setTakeFeedBAck(true) : setMsg("Enter Correct Email")}
            out={""}
            setMsg={setMsg}
          />
        )}

        {hasTakenFeedback && (
          <Prompt
            prmt={`Enter Your Feedback (Optional):`}
            cb={(inp) => validateTxt(inp) ? setMsg("Thanks for your feedback.") : setMsg("Please provide your feedback..")}
            out={""}
            setMsg={setMsg}
            fullInp
          />
        )}
      </div>
      <div className="text-gray-600 text-sm mt-3 font-mono w-[90%] md:w-[45%] row pl-3">
        <h1>{msg}</h1>
      </div>
    </div>
  );
}
