import Typewriter from "typewriter-effect";

export const Typer = ({ str, cb=()=>{} }) => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .changeDelay(19)
          .typeString(str)
          .callFunction((state) => {
            cb();
            state.elements.cursor.style.display = "none";
            console.log("String typed out!");
          })
          .start();
      }}
    />
  );
};
