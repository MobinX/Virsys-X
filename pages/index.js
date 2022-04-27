import {
    ArrowNarrowRightIcon,
    MicrophoneIcon,
    VolumeUpIcon,
  } from "@heroicons/react/solid";
  import { useTTS, useSpeechRecognizer } from "../lib/speech";
  import { botCtrl } from "../lib/botCtrl";
  import { useState, useEffect,useCallback } from "react";
  import Typewriter from "typewriter-effect";
  import { Typer } from "../components/typer";
  import { DotBg, generateRandom } from "../components/dotbg";
import { Prompt } from "../components/prompt";
  
  const Typzer = ({ str, dly = 100 }) => {
    const [txt, setTxt] = useState("");
    useEffect(() => {
      let i = 0;
      let intt = setInterval(() => {
        setTxt((prv) => prv + str[i]);
        i++;
      }, 50);
      if (i == str.length) clearInterval(intt);
    });
    return <>{txt}</>;
  };
  
  export default function Index({  }) {
    const [msg, setMsg] = useState("");
    const [inp, setInp] = useState("");
    const [out, setOut] = useState("");
    const [endIntro, setIntro] = useState(false);
    const [endIntro2, setIntro2] = useState(false);
      
    const postInp = (inp) => {
      
      botCtrl(inp, (ans) => setOut(ans),"exp");
    };

  
    return (
     
        <div className="col w-full h-full justify-start items-center py-10 overflow-auto">
          <div className="p-4 bg-gray-900 border border-gray-800 rounded-md text-base w-[90%] md:w-[45%] mt-[15%] mb-3 md:mt-[8%] pl-6 col space-y-4 shadow-[2px_2px_17px_1px_rgba(7,192,217,0.5)] font-mono">
            <span>
              <h1 className="text-gray-400 ">
                <Typer
                  str="Welcome, This is Virsys! <br />Let's begin the adventure"
                  cb={() => setIntro2(true)}
                />
              </h1>
              <h1 className="text-gray-400 "></h1>
              <h1 className="text-gray-400 "></h1>
            </span>
         

           {endIntro2 && <Prompt prmt={`What's going on in your mind ?`} cb={(inp) => postInp(inp)} out={out} setMsg={setMsg} />} 

          </div>
          <div className="text-gray-600 mt-3 text-sm font-mono w-[90%] md:w-[45%] row pl-3">
            <h1>{msg}</h1>
          </div>
        </div>

    );
  }
  
