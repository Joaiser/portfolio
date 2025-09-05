import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const fullText = "Hola, soy Aitor. Desarrollador fullstack.";
  const reverseText = "Construyo experiencias web completas, de la interfaz al servidor.";

  const [displayed, setDisplayed] = useState("");
  const [reverseDisplayed, setReverseDisplayed] = useState("");
  const [doneTypingFirst, setDoneTypingFirst] = useState(false);
  const [doneTypingSecond, setDoneTypingSecond] = useState(false);

  //referencias para gsap
  const avatarRef = useRef(null)
  const devicesRef = useRef(null)

  // Frase principal (izquierda → derecha)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        const nextChar = fullText[i];
        setDisplayed((prev) => prev + nextChar);
        i++;
      } else {
        clearInterval(interval);
        setDoneTypingFirst(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Frase secundaria (derecha → izquierda)
  useEffect(() => {
    if (!doneTypingFirst) return;

    let i = reverseText.length;
    const interval = setInterval(() => {
      if (i > 0) {
        setReverseDisplayed(reverseText.slice(i - 1));
        i--;
      } else {
        clearInterval(interval);
        setDoneTypingSecond(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [doneTypingFirst]);

  // Animaciones GSAP
  useEffect(() => {
    if (doneTypingSecond) {
      gsap.fromTo(
        avatarRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
      gsap.fromTo(
        devicesRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
      )
    }
  }, [doneTypingSecond])

  return (
    <section className="bg-white dark:bg-gradient-to-b dark:from-purple-950 dark:to-gray-950 text-black dark:text-gray-100 px-4 pt-20 text-center">
      <div className="container mx-auto max-w-[1440px] flex flex-col items-center">

        {/* Frase principal */}
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight py-3.5">
          {displayed}
          {!doneTypingFirst && (
            <span className="w-5.5 h-5.5 ml-1 inline-block bg-purple-600 rounded-full animate-blink dark:bg-gray-950" />
          )}
        </h1>

        {/* Frase secundaria */}
        <h2 className="text-lg sm:text-xl font-medium text-gray-600 mt-4 flex items-center gap-3 justify-center text-center dark:text-white">
          {!doneTypingSecond && (
            <span className="w-3.5 h-3.5 bg-purple-600 rounded-full animate-blink dark:bg-gray-950" />
          )}
          <span
            style={{
              direction: "rtl",
              unicodeBidi: "plaintext",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {reverseDisplayed}
          </span>
        </h2>

        {/* Avatar */}
        <article className="my-11">
          <img
            ref={avatarRef}
            src="/avatar-mio.png"
            alt="avatar mio"
            loading="lazy"
            className="w-[210px] rounded-full opacity-0"
          />
        </article>

        {/* Imagen ilustrativa */}
        <article ref={devicesRef} className="w-full flex justify-center opacity-0">
          <img
            src="/hero-devices.svg"
            alt="Ilustración de dispositivos"
            loading="lazy"
            className="w-full max-w-xl"
          />
        </article>

      </div>

      <style>
        {`
      @keyframes blink {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.4); }
      }

      .animate-blink {
        animation: blink 0.8s infinite ease-in-out;
        transition: all 0.2s ease;
      }
    `}
      </style>
    </section>

  );
}
