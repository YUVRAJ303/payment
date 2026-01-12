import { useRef, useState } from "react";
import SkyLogo from "../assets/skylogo.png";

import Slide1 from "../assets/mentor1.png";
import Slide2 from "../assets/mentor2.png";
import Slide3 from "../assets/mentor3.png";

export default function HeroSection() {
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);

  const slides = [Slide1, Slide2, Slide3];

  const handleScroll = () => {
    const scrollX = sliderRef.current.scrollLeft;
    const width = window.innerWidth;
    const index = Math.round(scrollX / width);
    setActive(index);
  };

  return (
    <section className="w-full h-screen relative overflow-hidden font-inter">

      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {slides.map((bg, index) => (
          <div
            key={index}
            className="min-w-full h-full bg-cover bg-center snap-center relative"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative w-full max-w-7xl mx-auto h-full px-4 sm:px-6">

              {/* Ultra Small Sky Touch Box */}
              <div
                className="absolute top-32 md:top-44
                           right-[-6rem] md:right-[-8rem]
                           bg-gradient-to-r from-[#0A77FF] to-[#012A7C]
                           text-white shadow
                           px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <div className="flex items-center gap-3 mr-12">

                  <img
                    src={SkyLogo}
                    className="h-28 w-28 sm:h-32 sm:w-32 object-contain"
                    alt="Sky Touch Academy"
                  />

                  <div className="leading-tight">
                    <p className="text-2xl sm:text-3xl font-bold tracking-wide">
                      Sky Touch
                    </p>
                    <p className="text-xl sm:text-2xl font-semibold tracking-wide ml-3">
                      Academy
                    </p>
                  </div>

                </div>
              </div>

              {/* CTA */}
              <div className="absolute bottom-28 right-20 flex gap-6">
                <button className="px-10 py-4 rounded-xl border-2 border-blue-500 text-blue-600 text-lg font-semibold bg-white hover:bg-blue-50 transition">
                  Free Demo Class
                </button>

                <button className="px-10 py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-[#0A77FF] to-[#012A7C] hover:opacity-90 transition">
                  Start Learning Today
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              active === i ? "bg-blue-600 scale-125" : "bg-blue-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
