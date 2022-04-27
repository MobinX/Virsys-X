import { useState, useEffect ,useMemo} from "react";
import {
  ArrowNarrowRightIcon,
  MicrophoneIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import {RiSendPlane2Fill} from "react-icons/ri"
import { Typer } from "../components/typer";
import { useTTS, useSpeechRecognizer } from "../lib/speech";
import { IconContext } from "react-icons";

export const Prompt = ({ prmt,cb ,setMsg,out,fullInp=false}) => {
    const [hasShownPromt,setShowPromp] = useState(false)
    const [inp, setInp] = useState("");
    const { startTTS, isSpeaking } = useTTS(out);
    
 
    const onStop = () => cb(inp)
    
    const {
        transcript,
        startListening,
        listening,
        isMicrophoneAvailable,
        browserSupportsSpeechRecognition,
      } = useSpeechRecognizer(false, onStop ,() =>
        setMsg("Please allow microphone service")
      );
    
      
      useEffect(() => {
        if (transcript.length > 0) {
          setInp(transcript.toLowerCase());
        }
        if (!browserSupportsSpeechRecognition)
          setMsg("Your browser don't support voice listening");
      }, [transcript, browserSupportsSpeechRecognition]);
    
  
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
          cb(inp);
        }
      };
  return (
    <>
      <span className="col">
       
          <h1 className="text-teal-300">
            <Typer
              str={prmt}
              cb={() => setShowPromp(true)}
            />
          </h1>
       
        {hasShownPromt && (
          <span className="row items-start mt-2 justify-between">
            <ArrowNarrowRightIcon className="text-emerald-400 w-4 h-4" />
            {fullInp ?  <textarea
              type="text"
              onChange={(e) => setInp(e.target.value)}
              onKeyDown={handleEnterPress}
              value={inp}
              autoFocus
              className="bg-transparent w-[86%] h-32 border border-gray-800 rounded-lg  text-gray-400 focus:border-none focus:outline-none"
            /> : <input
            type="text"
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={handleEnterPress}
            value={inp}
            autoFocus
            className="bg-transparent w-[86%] text-gray-400 focus:border-none focus:outline-none"
          />}
            {fullInp ? <div className="col justify-between  items-center h-full"><MicrophoneIcon
              className={`w-4 font-extrabold text-green-300 cursor-pointer h-4 hover:scale-125 ${
                listening
                  ? "animate-heartBeat animate-infinite animate-slow"
                  : ""
              }  `}
              onClick={startListening}
            /> <IconContext.Provider value={{ className: "w-4 font-extrabold text-green-300 cursor-pointer h-4 hover:scale-125" }}> <RiSendPlane2Fill onClick={()=>cb(inp)} /></IconContext.Provider></div>: <MicrophoneIcon
            className={`w-4 font-extrabold text-green-300 cursor-pointer h-4 hover:scale-125 ${
              listening
                ? "animate-heartBeat animate-infinite animate-slow"
                : ""
            }  `}
            onClick={startListening}
          /> }
            
          </span>
        )}
      </span>
      {hasShownPromt && (
      <span className=" row justify-between items-end ">
        <h1 className="text-gray-400 w-[86%] overflow-y-auto no-scrollbar max-h-96">
          {((out != undefined) && (out.indexOf("undefined") == -1)) && out}
        </h1>
        {((out != undefined) && (out.indexOf("undefined") == -1) && (out != "")) &&  (
          <VolumeUpIcon
            onClick={startTTS}
            className={`text-emerald-400 w-4 h-4 cursor-pointer hover:scale-125 ${
              isSpeaking
                ? "animate-heartBeat animate-infinite animate-slow"
                : ""
            }`}
          />
        )}
      </span>
       )}
    </>
  );
};
