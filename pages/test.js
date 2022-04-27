import brain2 from "../assets/brain2.png";
import chat1 from "../assets/chat1.jpeg";
import chat2 from "../assets/chat2.jpeg";
import chat3 from "../assets/chat3.jpeg";
import poem from "../assets/poem.jpeg";
import poem1 from "../assets/poem1.jpeg";
import poem2 from "../assets/poem2.jpeg";
import shortStory from "../assets/shortStory.jpeg";
import fiction from "../assets/fiction.jpeg";
import smart from "../assets/smart.png";
import code from "../assets/code.jpeg";
import code1 from "../assets/code1.jpeg";
import code2 from "../assets/code.jpeg";
import Image from "next/image";
import { useEffect, useState } from "react";

const content = {
  blocks: [
    {
      type: "header",
      left: {
        h1: "Meet Virsys <br /> The smartest ",
        h1arr: [
          "AI Personality Ever.",
          "ChatBot Ever.",
          "and Creative Storyteller Ever.",
        ],
        p: "Virsys can make you smile, excited, sad even cry. Seriously! It's the intelligence you can feel.",
        btn: "Explore",
      },
      right: {
        img: [brain2],
      },
    },
    {
      left: {
        h1: "Smartest Writer You have never seen",
        p: "It can write all kind of fictions, novels, short stories, poems, songs, and more.No more need to read human written stories, just tell and it can write instantly",
      },
      right: {
        img: [shortStory, fiction, poem],
      },
    },
    {
      right: {
        h1: "Every time it can write a unique one",
        p: "Each time, Virsys can write unique, different composition that you have never seen.Virsys challenges you to find a same type of compositon in the internet.Seriously! ",
      },
      left: {
        img: [poem1, poem2, poem],
      },
    },

    {
      left: {
        h1: "It can write even before a human begans to think",
        p: "It can write a whole fiction in just few seconds where human needs couple o months.Seriously it can think faster than you",
      },
      right: {
        img: [poem2, fiction],
        alt: "just in few seconds",
      },
    },
    {
      right: {
        h1: "It is really smart",
        p: "Virsys is so smart that it's gonig to replace writes. Never mind, it is the hardest truth.",
      },
      left: {
        img: [smart],
      },
    },
    {
      left: {
        h1: "Cleverest chatting personality ever",
        p: "It's intelligence can beat you in chating.Every time it gives a cleve and smart reply ",
      },
      right: {
        img: [chat1, chat2, chat3],
      },
    },
    {
      right: {
        h1: "Interestingly, it can code",
        p: "It have little knowledege, but enough to write some little programming task like writing small functions, some general algorithm etc",
      },
      left: {
        img: [code, code1, code2],
      },
    },
  ],
};

const ImgEx = ({ src, initalPos }) => {
  const [pos, setPos] = useState(initalPos);
  useEffect(
    () =>
      setTimeout(() => {
        if (pos <= 50) {
          setPos((prv) => prv + 25);
        } else {
          setPos(0);
        }
        console.log(pos <= 50);
      }, 3000),
    []
  );

  return (
    <div
      className="absolute row center rounded-3xl overflow-hidden"
      style={{ top: `${pos}px`, left: `${pos}px` }}
    >
      <Image src={src} alt="test" className="w-full h-full" />
    </div>
  );
};

const ImgCont = ({ imgs }) => {
  return (
    <div className="relative h-full w-full row center aspect-w-2 aspect-h-[1.5]">
      <div className="absolute inset-0">
        {imgs.map((e, i) => (
          <ImgEx src={e} initalPos={i * 25} key={i} />
        ))}
      </div>
    </div>
  );
};

export default function Index() {
  return (
    <div className="col space-y-4 center min-w-full px-4 md:px-7">
      {content.blocks.map((e, i) => (
        <div
          key={i}
          className={`${
            e.left.h1 ? "col" : "flex flex-col-reverse"
          } md:row center h-screen overflow-hidden flex-wrap md:flex-nowrap w-full`}
        >
          <div className="col w-full h-full md:w-1/2 px-5 center">
            {e.left.h1 && <h1>{e.left.h1}</h1>}
            {e.left.p && <p>{e.left.p}</p>}
            {e.left.img && <ImgCont imgs={e.left.img} />}
          </div>
          <div className="col w-full h-full md:w-1/2 px-5 center ">
            {e.right.h1 && <h1>{e.right.h1}</h1>}
            {e.right.p && <p>{e.right.p}</p>}
            {e.right.img && <ImgCont imgs={e.right.img} />}
          </div>
        </div>
      ))}
    </div>
  );
}
