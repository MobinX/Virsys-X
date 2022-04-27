import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

const appId = process.env.NEXT_PUBLIC_SPEECH_API;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const useSpeechRecognizer = (
  isContinuesListening,
  onListeningStop,
  notSupport = () => {}
) => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [hasListeningStartedAtLestOnce,setListeningStartedAtLeastOnce] = useState(false)

  const startListening = () => {
    if (!isMicrophoneAvailable) notSupport();
    SpeechRecognition.startListening({ continuous: isContinuesListening });

    resetTranscript();
  };
  const stopListening = () => SpeechRecognition.stopListening();

  useEffect(() => {

    if(listening && !hasListeningStartedAtLestOnce) setListeningStartedAtLeastOnce(true);

    if (!listening && hasListeningStartedAtLestOnce ) onListeningStop();

    console.log(listening);
  }, [listening]);

  return {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    startListening,
    stopListening,
    SpeechRecognition,
  };
};

const useTTS = (txt) => {
  const [isSpeaking, setSpeaking] = useState(false);
  const startTTS = () => {
    let msg = new SpeechSynthesisUtterance();
    if (isSpeaking) window.speechSynthesis.cancel();
    msg.text = txt;
    msg.onend = ()=> setSpeaking(false) ;
    window.speechSynthesis.speak(msg);
    setSpeaking(true);
  };
  return { startTTS,isSpeaking };
};

export { useTTS, useSpeechRecognizer };
