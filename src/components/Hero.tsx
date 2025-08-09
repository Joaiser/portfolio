import { useEffect, useState } from "react";

export default function Hero() {
  const fullText = "Hola, soy Aitor. Desarrollador fullstack.";
  const reverseText = "Construyo experiencias web completas, de la interfaz al servidor.";



  const [displayed, setDisplayed] = useState("");
  const [reverseDisplayed, setReverseDisplayed] = useState("");
  const [doneTypingFirst, setDoneTypingFirst] = useState(false);
  const [doneTypingSecond, setDoneTypingSecond] = useState(false);

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

  return (
    <section className="flex flex-col justify-center items-center 
bg-white text-black text-center px-4 min-h-screen pt-20
dark:bg-gradient-to-b dark:from-purple-950 dark:to-gray-950 dark:text-gray-100">

      {/* Frase principal */}
      <h1 className="text-3xl sm:text-5xl font-bold leading-tight py-3.5">
        {displayed}
        {!doneTypingFirst && (
          <span className="w-5.5 h-5.5 ml-1 inline-block bg-purple-600 rounded-full animate-blink" />
        )}
      </h1>

      <h2 className="text-lg sm:text-xl font-medium text-gray-600 mt-4 flex items-center gap-3 justify-center text-center dark:text-white">
        {!doneTypingSecond && (
          <span className="w-3.5 h-3.5 bg-purple-600 rounded-full animate-blink" />
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
          src="/avatar-mio.png"
          alt="avatar mio"
          loading="lazy"
          className="w-[210px] rounded-full"
        />
      </article>

      {/* Imagen ilustrativa */}
      <article>
        <img
          src="/hero-devices.svg"
          alt="Ilustración de dispositivos"
          loading="lazy"
          className="w-full max-w-xl mt-10"
        />
      </article>


      {/* Estilos */}
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
