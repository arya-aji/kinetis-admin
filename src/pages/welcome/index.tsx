import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
// import logo from "/public/images/logo-only.png";
import "@/pages/home.css";
import KinetisLogo from "/public/images/logo-color.png";
import BPSLogo from "/public/images/bps.png";
import fotoPesawat from "/public/images/pesawat_edit.jpg";
import fotoMonas from "/public/images/monas_edit.jpg";
import fotoGedung from "/public/images/gedung_edit.jpg";
import fotoKereta from "/public/images/kereta_edit.jpg";

export default function Home() {
  return (
    <>
      <main className="bg-[#FAFAFA] relative main-container overflow-hidden">
        <div className="w-full bg-white max-w-[75rem] mx-auto flex flex-col border-l border-r border-[#F2F2F2] row-span-3">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#F2F2F2]" />
          <div className="px-12 py-16 border-b border-[#F2F2F4] hero-section">
            <div className="bg-[#F4F4F5] px-4 py-3 rounded-full inline-flex gap-4">
              <img src={BPSLogo} alt="BPS Logo" className="h-8" />
              <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
              <img src={KinetisLogo} alt="Kinetis Logo" className="h-8" />
            </div>
          </div>

          <div className="p-10 border-b border-[#F2F2F2] hero-section">
            <h1 className="text-5xl font-bold tracking-tight text-[#131316] relative">
              KINETIS
            </h1>

            <p className="text-[#5E5F6E] pt-3 pb-6 max-w-[30rem] text-[1.0625rem] relative">
              Kinerja Efektif, Efisien, Terintegrasi, Inovatif dan Sinergis
            </p>
            <div className="relative flex gap-3 buttons-container">
              <SignedIn>
                <a
                  href="/"
                  className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
                >
                  Dashboard
                </a>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Log In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
          <div className="flex gap-8 w-full h-[41.25rem] scale-[1.03] device-images">
            <div className="space-y-8 translate-y-12">
              <img
                alt="Monas"
                src={fotoMonas}
                className="flex-none rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5 mobile-image"
              />
            </div>
            <div className="space-y-8 -translate-y-4 hide-on-mobile">
              <img
                alt="Gedung"
                src={fotoGedung}
                className="flex-none rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5"
              />
              <img
                alt="Pesawat"
                src={fotoPesawat}
                className="flex-none rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5"
              />
            </div>
            <div className="space-y-8 -translate-y-[22.5rem] hide-on-mobile">
              <img
                alt="Pesawat"
                src={fotoPesawat}
                className="flex-none rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5"
              />
              <img
                alt="Kereta"
                src={fotoKereta}
                className="flex-none rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5"
              />
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-[18.75rem] bg-gradient-to-t from-white" />
      </main>
      {/* <Footer /> */}
    </>
  );
}
