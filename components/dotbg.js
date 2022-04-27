import { useMemo, useState } from "react";
import { useAnimationFrame } from "../lib/animeFrame";
const starNum = 29;
const Dot = ({ w, h, t, l }) => {
  const [xPos, setXPos] = useState(t);
  useAnimationFrame((deltaTime) => {
    setXPos((prev) => (prev + deltaTime * 0.005) % 100);
  });
  return (
    <div
      className="stack-bg bg-white"
      style={{ width: w, height: h, bottom: `${xPos}%`, left: `${l}%` }}
    ></div>
  );
};

export const generateRandom = () => {
  const temp = [],
    xPos = [],
    yPos = [];
  for (let i = 0; i < starNum; i++) {
    temp.push([0.8, 1.6, 2.4][Math.floor(Math.random() * 3)]);
    xPos.push(Math.floor(Math.random() * 100));
    yPos.push(Math.floor(Math.random() * 100));
  }
  return {
    dimentions: temp,
    pos: { x: xPos, y: yPos },
  };
};

export const DotBg = ({ children, random }) => {
  return (
    <div className="relative bg-[#040d21] min-w-full min-h-screen overflow-hidden">
      <div className="stack-bg w-40 h-40 lg:w-60 lg:h-60 rounded-full blur-3xl bg-[#043a8a] -top-16 -left-14 "></div>
      <div className="stack-bg w-40 h-52 lg:w-60 lg:h-60 rounded-full blur-3xl bg-[#043a8a] -top-12 -right-24 "></div>
      <div className="stack-bg w-52 h-52 lg:w-60 lg:h-60 rounded-full blur-3xl bg-[#db469f]/60 -bottom-12 -right-20"></div>
      {[...Array(starNum)].map((e, i) => (
        <Dot
          key={i}
          w={random.dimentions[i]}
          h={random.dimentions[i]}
          t={random.pos.y[i]}
          l={random.pos.x[i]}
        />
      ))}
      <main className="absolute bg-[#040d21]/40 inset-0 z-10 overflow-y-auto pb-10 px-6">{children}</main>
    </div>
  );
};
