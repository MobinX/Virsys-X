import { useState, useEffect } from "react";
import { axios } from "axios";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

const appId = process.env.NEXT_PUBLIC_SPEECH_API;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export default function Demo() {
  const [prompt, setPrompt] = useState("");
  const [complt, setComplt] = useState("");
  const [speechMsg, setSpeechMsg] = useState("");
  const [isSpeaking, setSpeaking] = useState(false);
  

  

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening();
    resetTranscript();
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
    handleStory();
  };

  const startTTS = () => {
    let msg = new SpeechSynthesisUtterance();
    if(isSpeaking) window.speechSynthesis.cancel();  
    msg.text = complt;
    window.speechSynthesis.speak(msg);
    setSpeaking(true)
  };

  const handleStory = async () => {
    
    setComplt("wait....");
    let response = await fetch(`/api/story/${prompt}`);
    if (response.ok) {
      let json = await response.json();
      console.log(json.ans);
      setComplt(json.ans);
      
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  useEffect(() => {
    if (listening) {
      setSpeechMsg("Listening...");
    } else if (!browserSupportsSpeechRecognition) {
      setSpeechMsg("Browser not support");
    } else {
      setSpeechMsg("");
    }
    if (transcript.length > 0) {
      setPrompt(transcript.toLowerCase());
      console.log(transcript);
    }
  }, [browserSupportsSpeechRecognition, listening, transcript]);

  return (
    <div className="bg-primary">
      <input
        type="text"
        value={prompt}
        onChange={(evt) => setPrompt(evt.target.value)}
      />
      <button onClick={handleStory}>Complete Story</button>
      <button onClick={startListening}>Start to Voice Text</button>

      <button onClick={stopListening}>Stop Voice Text</button>

      <p>{speechMsg}</p>

      <h1>{complt}</h1>
      {(complt != "wait..." && complt.length > 0) ? <button onClick={startTTS}>Let I tell you</button> : null}
    </div>
  );
}

