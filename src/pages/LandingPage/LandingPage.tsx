import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Header from "@/components/header/Header.tsx";

import { Link } from "react-router-dom";

import IconeTestimoni from "@/components/assets/IconeTestimoni.png";

import StarIcon1 from "@/components/assets/StarIcon1.png";
import StarIcon2 from "@/components/assets/StarIcon2.png";

import Background from "@/components/assets/Background.webp";

import WhatsappIcon from "@/components/assets/WhatsappIcon.png";
import InstagramIcon from "@/components/assets/InstagramIcon.png";
import TiktokIcon from "@/components/assets/TiktokIcon.png";
import DiscordIcon from "@/components/assets/DiscordIcon.png";
import GithubIcon from "@/components/assets/GithubIcon.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import slide1 from "@/components/assets/hero1.webp";
import slide2 from "@/components/assets/hero2.webp";
import slide3 from "@/components/assets/hero3.webp";

import { motion } from "framer-motion";
import logo1 from "@/components/assets/DPM FIK.png";
import logo2 from "@/components/assets/BIRO D4 ANIMASI.png";
import logo3 from "@/components/assets/DPM FT.png";
import logo4 from "@/components/assets/HMTI.png";
import logo5 from "@/components/assets/HMDTI.png";
import logo6 from "@/components/assets/HM Sisfo.png";
import logo7 from "@/components/assets/HM Ilkom.png";
import logo8 from "@/components/assets/HMFTV.png";
import logo9 from "@/components/assets/DKV UDINUS.png";
import logo10 from "@/components/assets/DRC.png";
import logo11 from "@/components/assets/GDGOC.png"

import AnimateOnScroll from "@/components/common/AnimateOnScroll";

//Data untuk hero
const sliderImages = [slide1, slide2, slide3];

// Data untuk sponsor
const sponsors = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
];

// Data untuk setiap divisi
const divisions = [
  {
    title: "Website",
    description: "Mempelajari HTML, CSS, Bootstrap untuk membuat sebuah web.",
    link: "https://drive.google.com/file/d/1yQUysI4eO8JH7fba01iUN12mTVybEm2C/",
  },
  {
    title: "Mobile",
    description: "Mempelajari bahasa dart dan framework flutter untuk membuat aplikasi mobile.",
    link: "https://drive.google.com/file/d/1U4_B-YfsqHqAOHoOvKxLmhRzcqPadiR1/",
  },
  {
    title: "Jaringan",
    description: "Belajar administrasi Linux mulai dari konfigurasi server, jaringan, hingga keamanan dasar.",
    link: "https://drive.google.com/file/d/11We0wo-gbxvGlxceLWv0TKFQz07QcNO8/",
  },
  {
    title: "Game",
    description: "Mempelajari pembuatan game dengan C# dan Unity.",
    link: "https://drive.google.com/file/d/1W_fnYZYL9zCVwYixzHQDbL5AJIBdccVo/",
  },
  {
    title: "Data Science",
    description: "Mempelajari visualisasi data menggunakan model ML dan DL, serta Phyton.",
    link: "https://drive.google.com/file/d/1lG4RSmKLSv4x5SkCl3vUjYteBitBp1sq/",
  },
  {
    title: "Multimedia",
    description:
      "Mempelajari pembuatan UI aplikasi user-friendly dan prototype interaktif.",
    link: "https://drive.google.com/file/d/1EzFd3mw6mAhlHHoSrgKXfZuNmasXzUTU/",
  },
];

// Data untuk Bagian Testimoni
const testimonials = [
  {
    name: "Syakira",
    role: "Peserta BTNG 2024 - Web",
    quote:
      "Materinya mudah dipahami dan langsung bisa dipraktikkan. Sangat bermanfaat untuk pemula di bidang website.",
  },
  {
    name: "Zendry",
    role: "Peserta BTNG 2024 - Game",
    quote:
      "Saya sangat senang mengikuti BTNG 2024. Melalui pelatihan di divisi Game, saya menemukan banyak hal baru dan mendapatkan pembelajaran yang bermanfaat. Pengalaman ini membuat saya semakin termotivasi untuk terus mempelajari dan memperdalam bidang pemrograman game.",
  },
  {
    name: "Iqbal",
    role: "Peserta BTNG 2024 - Web & Multimedia",
    quote:
      'Setelah mengikuti kelas multimedia dan web di btng, saya mendapatkan banyak ilmu dan pengalaman baru di bidang web dan multimedia, mentornya ramah, suasana kelas lumayan asik dan bisa belajar dari dasar" buat yang masi belom terlalu tau tentang multimedia dan web.',
  },
  {
    name: "Adit",
    role: "Peserta BTNG 2024 - Data Science",
    quote:
      "BTNG sangat menarikk, kakanya ramah-ramah dan saya belajar banyak dari BTNG yang saya ikuti.",
  },
];

const LandingPage: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function onScroll(e: any) {
      setOffsetY(e.scroll);
    }
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  const benefits = [
    {
      id: "01",
      text: "Meningkatkan kemampuan hard skills",
    },
    {
      id: "02",
      text: "Memperluas relasi antar peserta dan mentor",
    },
    {
      id: "03",
      text: "Mendapatkan pengalaman belajar bersama",
    },
    {
      id: "04",
      text: "Membangun portofolio dan mendapatkan sertifikasi",
    },
  ];

  return (
    <>
      <head>
        <title>BTNG 2025</title>
      </head>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000]/70 z-[99999]">
          <div className="bg-white rounded-xl shadow-xl mx-2 md:mx-0 p-4 md:p-6 relative">
            <h2 className="text-xl md:text-2xl font-audiowide mb-4">
              Tutorial Pendaftaran BTNG
            </h2>
            <div className="flex flex-row mb-4 w-full items-center">
              <p className="text-xl md:text-xl px-5 text-[#000000]">
                TUTORIAL <br /> MENDAFTAR <br />
                <span className="text-[#BDEE63]">BTNG</span> DI <br /> WEBSITE
              </p>
              <img
                className="w-[212px] h-[151px] md:w-[424px] md:h-[302px]"
                src="/images/btng/images/tutorial_regist.webp"
                alt=""
              />
            </div>
            <div className="flex flex-row gap-3 md:gap-6 justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="w-fit px-6 py-2 rounded-3xl border border-[#D9D9D9] text-[#646464] font-semibold hover:bg-[#000000] hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1RDlYx4IgDagOecV8N-W80JYVWwBu-d-E/view?usp=sharing",
                    "_blank"
                  )
                }
                className="w-fit px-6 py-2 rounded-3xl bg-black text-white font-semibold hover:bg-[#BDEE63] hover:text-black transition-colors"
              >
                Lihat Tutorial
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full flex flex-col bg-white">
        <Header scrollToSection={scrollToSection} />
        <section
          id="hero-section"
          className="relative min-h-screen md:min-h-[1100px] lg:min-h-screen overflow-hidden bg-[#FFFFFF]"
        >
          <div
            className="absolute top-0 left-0 w-full min-h-screen md:min-h-[1100px] lg:min-h-screen bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/btng/images/bg-btng-1.webp')",
              transform: `translateY(${offsetY * 0.2}px)`,
            }}
          >
            <div
              className="absolute w-full"
              style={{
                transform: `translateY(${offsetY * 0.2}px)`,
              }}
            >
              <img
                src="/images/btng/images/bg-asset-1.webp"
                alt=""
                className="absolute -left-20 -top-30 md:-left-35 md:-top-80 lg:-left-90 lg:-top-70"
              />
            </div>
          </div>
          <div className="h-screen flex justify-center items-center w-full z-99 relative">
            <div className="font-raleway flex flex-col items-center justify-center text-white">
              <div className="bg-[#333333] px-4 py-2 rounded-[48px] mb-4">
                <p className="font-bold">DNCC Presents</p>
              </div>
              <h1 className="text-[28px] md:text-[64px] mb-6 font-audiowide text-center leading-none">
                Basic Training <br /> For Next Generation
              </h1>
              <p className="px-6 md:px-0 font-semibold text-center mb-8">
                From Basic to Brilliance
              </p>
              <div className="flex gap-4 font-bold">
                <a
                  onClick={() => scrollToSection("divisi")}
                  className="cursor-pointer rounded-3xl text-white bg-[#333333] px-6 py-3 hover:ring-2 ring-inset ring-white transition duration-300 ease-in-out"
                >
                  Explore
                </a>
                <a
                  href="/signup/participant"
                  className="rounded-3xl text-black bg-white px-6 py-3 hover:bg-[#BDEE63] transition duration-300 ease-in-out"
                >
                  Join Now!
                </a>
              </div>
            </div>
          </div>
          <div
            className="
          absolute w-[50%] md:w-[70%] lg:w-fit
          bottom-[-40px] right-[-10px]    
          md:bottom-[-160px] md:right-[-190px]  
          lg:bottom-[-120px] lg:right-0 z-30       
        "
            style={{
              transform: `translateY(${offsetY * 0.3}px)`,
            }}
          >
            <img src="/images/btng/images/bg-asset-2.webp" alt="" />
          </div>
          <div
            className="absolute bottom-0 left-0 w-full h-[80px] md:h-[120px] lg:h-[162.25px] bg-white z-20"
            style={{
              clipPath: "polygon(50% 100%, 100% 0, 100% 100%, 0 100%, 0 0)",
            }}
          ></div>
        </section>
        <section
          id="about-section"
          className="bg-white h-full w-full flex items-center justify-center px-9 md:px-18 pb-16 pt-12 md:pt-20 md:pb-20 lg:pb-[120px]"
        >
          <div
            className="bg-[#000000] w-fit gap-3 lg:gap-5 py-6 px-9 md:px-14 md:py-12 lg:px-18 flex flex-col justify-center items-center text-white lg:[clip-path:polygon(0_0,95%_0,100%_15%,100%_100%,5%_100%,0_85%)]
          [clip-path:polygon(0_0,90%_0,100%_10%,100%_100%,10%_100%,0_90%)]
          md:[clip-path:polygon(0_0,90%_0,100%_18%,100%_100%,10%_100%,0_85%)]"
          >
            <h2 className="font-audiowide text-2xl md:text-[32px] lg:text-[44px]">
              About BTNG
            </h2>
            <p className="font-raleway text-justify lg:text-center text-sm md:text-base md:w-[500px] lg:w-[800px]">
              BTNG (Basic Training for Next Generation) merupakan sebuah
              pelatihan/bootcamp yang diadakan oleh DNCC untuk mahasiswa
              Universitas Dian Nuswantoro. Program ini bertujuan untuk
              mengembangkan keterampilan dasar di bidang teknologi sekaligus
              melatih soft skill agar peserta siap berkontribusi dalam dunia
              akademik maupun industri IT.
            </p>
          </div>
        </section>
        <section
          id="timeline-section"
          className="flex items-center justify-center px-10 md:px-20 lg:px-0 flex-col gap-14 pb-20 lg:pb-30"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-audiowide text-[#000000]">
            Check The Timeline
          </h2>
          <img
            draggable={false}
            src="/images/btng/images/timeline.svg"
            alt=""
            className="hidden md:block"
          />
          <img
            draggable={false}
            src="/images/btng/images/timeline-mobile.svg"
            alt=""
            className="block md:hidden"
          />
        </section>
        <section
          id="benefits-section"
          className="relative overflow-hidden flex justify-center items-center"
        >
          <div
            className="absolute w-full h-full bg-no-repeat bg-top-center bg-cover"
            style={{
              backgroundImage: "url('/images/btng/images/bg-btng-2.webp')",
            }}
          ></div>
          <div
            className="absolute w-fit -left-10 -top-[250%] md:-left-10 md:-top-[240%] lg:-top-[195%] lg:-left-5 z-[10]"
            style={{
              transform: `translateY(${offsetY * 0.5}px)`,
            }}
          >
            <img
              src="/images/btng/images/bg-asset-3.webp"
              alt=""
              draggable={false}
            />
          </div>
          <div className="flex flex-col w-full h-full items-center justify-center mt-8 mb-9 lg:mt-16 lg:mb-18">
            <h2 className="text-black font-audiowide text-2xl md:text-3xl lg:text-4xl z-[20]">
              Benefits
            </h2>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 z-[20] px-8 pt-4 md:pt-7 lg:pt-14">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex flex-row items-center w-full shadow-[0_4px_10px_rgba(176,176,176,0.2)]"
                >
                  <div
                    className="flex bg-[#000000] items-center justify-center w-15 h-15 md:w-20 md:h-20 lg:w-25 lg:h-25 font-audiowide"
                    style={{
                      clipPath:
                        "polygon(20px 0%, 100% 0, 100% 100%, 0% 100%, 0% 20px)",
                    }}
                  >
                    <h3 className="md:text-2xl lg:text-4xl text-white ">
                      {benefit.id}
                    </h3>
                  </div>
                  <div className="flex items-center bg-white  py-0 w-full md:w-[240px] h-15 md:h-20 px-4 lg:py-2 lg:px-5 lg:w-[320px] lg:h-25">
                    <p className="font-raleway text-sm md:text-base lg:text-xl text-black">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute -top-[175%] -right-28 md:-top-[185%] md:-right-32 lg:-top-[145%] lg:-right-32 z-[10]"
            style={{
              transform: `translateY(${offsetY * 0.5}px)`,
            }}
          >
            <img
              src="/images/btng/images/bg-asset-4.webp"
              alt=""
              draggable={false}
            />
          </div>
        </section>

        {/* ===== Bagian Choose Your Division ===== */}
        <section
          id="divisi"
          className="min-h-screen w-full bg-white py-10 md:py-16 px-4"
        >
          <div className="text-center mt-5 md:mt-8">
            <h1 className="font-audiowide text-2xl md:text-3xl lg:text-4xl  text-black mb-10 md:mb-14">
              Choose Your Division
            </h1>
          </div>

          <div className="px-4 md:px-10 lg:px-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto justify-items-center">
            {divisions.map((division, index) => (
              <AnimateOnScroll
                key={division.title}
                animation={index % 2 === 0 ? "fade-left" : "fade-right"}
                delay={`${index * 200}ms`}
                className="w-full flex justify-center"
              >
                <div className="relative overflow-hidden bg-[#000000] p-6 sm:p-8 h-auto min-h-[240px] w-full sm:w-[300px] lg:w-[350px] flex flex-col justify-between">
                  <div className="absolute -top-12 -left-12 h-20 w-20 bg-white transform rotate-45"></div>
                  <div className="absolute -bottom-12 -right-12 h-20 w-20 bg-white transform rotate-45"></div>

                  <div className="relative z-50 p-2 sm:p-3">
                    <h3 className="font-audiowide text-xl sm:text-2xl text-white tracking-wider">
                      {division.title}
                    </h3>
                    <p className="font-raleway mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
                      {division.description}
                    </p>
                  </div>

                  <div className="p-2 sm:p-3">
                    <a
                      href={division.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white py-2 px-5 sm:px-6 font-raleway text-xs sm:text-sm font-bold text-black hover:bg-[#BDEE63] transition-colors"
                    >
                      Cek Silabus
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* ===== Bagian Testimoni ===== */}
        <section
          id="testimoni"
          className="w-full bg-white pt-5 md:pt-10 lg:pt-7 px-4"
        >
          <div className="text-center">
            <h1 className="font-audiowide text-2xl md:text-3xl lg:text-4xl text-black mb-6 md:mb-10">
              What do they say about BTNG?
            </h1>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-6 p-5 md:pl-10 lg:pl-24">
            {testimonials.map((testimonial) => (
              <AnimateOnScroll key={testimonial.name} animation="fade-right">
                <div className="relative outline-black outline-2 bg-white border rounded-2xl p-8 shadow-xl flex flex-col w-82 h-95 md:w-[360px] md:h-[350px] lg:w-[379px] lg:h-[345px] flex-shrink-0">
                  <div className="flex-grow">
                    <h3 className="font-raleway text-2xl md:text-2xl lg:text-2xl font-medium text-black">
                      {testimonial.name}
                    </h3>
                    <p className="font-raleway text-sm md:text-sm lg:text-sm text-gray-500 mt-1">
                      {testimonial.role}
                    </p>
                    <p className="font-raleway mt-6 text-base md:text-base lg:text-base text-gray-700 leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>
                  <img
                    src={IconeTestimoni}
                    alt="Quote Icon"
                    className="absolute bottom-8 right-10"
                  />
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="w-full h-[200px] md:w-[750px] md:h-[350px] lg:min-w-[1040px] lg:min-h-[500px] aspect-video rounded-2xl overflow-hidden mx-auto mt-10 md:mt-16 lg:mt-16">
            <iframe
              src="https://www.youtube.com/embed/xGfu3BquZg0?si=j6eQYqzggo7wb_wk"
              title="After Movie BTNG"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </section>

        {/* ===== Bagian Register ===== */}
        <section
          id="register"
          className="w-full bg-white py-10 md:py-16 pt-14 md:pt-24 lg:pt-24 px-4"
        >
          <div className="max-w-4xl mx-auto flex justify-center mb-10 md:mb-14 lg:mb-10">
            <div className="relative bg-[#000000] text-white rounded-2xl p-10 md:p-12 lg:p-16 text-center shadow-2xl flex flex-col items-center justify-center w-full md:w-[750px] h-[400px] md:h-[400px] lg:min-w-[1040px] lg:min-h-[360px]">
              <img
                src={StarIcon1}
                alt="Star Decoration"
                className="absolute top-0 right-0 w-28 h-32 md:w-[180px] md:h-[260px] lg:w-[212px] lg:h-[308px]"
              />
              <img
                src={StarIcon2}
                alt="Star Decoration"
                className="absolute bottom-0 left-0 w-32 h-32 md:w-[190px] md:h-[250px] lg:w-[223px] lg:h-[292px]"
              />

              <div className="relative z-10">
                <h2 className="font-audiowide text-3xl md:text-3xl lg:text-4xl uppercase tracking-wide leading-tight">
                  Ready to Leveled Up
                  <br />
                  Your Skills?
                </h2>
                <p className="font-raleway mt-4 text-lg md:text-xl lg:text-2xl text-white typing">
                  Be a part of BTNG and learn with us!
                </p>
                <div className="mt-10">
                  <Link
                    to="/signup/participant"
                    className="inline-block rounded-full bg-white py-3 px-8 md:py-3 md:px-10 font-raleway text-xl font-bold text-black hover:bg-[#BDEE63] transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Bagian Hero Section ===== */}
        <section
          id="hero"
          className="relative w-full h-auto md:h-[512px] bg-cover bg-center py-16 px-4"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundPositionY: `${offsetY * 0.5}px`,
          }}
        >
          <div className="relative z-20 max-w-6xl mx-auto h-full flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              <div className="w-full max-w-[450px] h-[320px] overflow-hidden mx-auto md:mx-0 md:ml-8 md:h-[320px]">
                <Swiper
                  modules={[Autoplay, EffectFade]}
                  effect="fade"
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  className="w-full h-full"
                >
                  {sliderImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="text-white text-center md:text-left">
                <h1 className="font-audiowide text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Dian Nuswantoro Computer Club
                </h1>
                <p className="font-raleway mt-4 text-xs md:text-sm lg:text-base text-white">
                  Dian Nuswantoro Computer Club (DNCC) merupakan salah satu Unit
                  Kegiatan Mahasiswa (UKM) di Universitas Dian Nuswantoro
                  Semarang yang berpusat pada bidang ilmu komputer.
                </p>
                <div className="mt-8">
                  <a
                    href="https://www.dnccudinus.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-white py-3 px-6 md:py-3 md:px-8 font-raleway text-sm font-bold text-black hover:bg-[#BDEE63] transition-colors"
                  >
                    Visit us!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Bagian Media Partners and Sponsors ===== */}
        <section id="sponsors" className="w-full bg-[#000000] py-20 px-4">
          <div className="max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-audiowide text-xl md:text-2xl lg:text-3xl text-white tracking-widest">
                Our Media Partners and Sponsors
              </h2>
            </div>
            <div className="overflow-hidden w-full">
              <motion.div
                className="flex gap-8 items-center"
                animate={{ x: ["0%", "-200%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                {sponsors.concat(sponsors).map((logo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-shrink-0"
                  >
                    <img
                      src={logo}
                      alt={`Sponsor ${index + 1}`}
                      className="max-h-12 sm:max-h-16 md:max-h-20 lg:max-h-24 object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== Bagian Contact ===== */}
        <section
          id="contact"
          className="w-full bg-[#000000] py-20 px-4 flex justify-center"
        >
          <div className="max-w-4xl mx-auto text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 justify-items-start">
              <div className="text-left">
                <h2 className="font-audiowide text-xl md:text-2xl lg:text-3xl mb-8">
                  Contact Person
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-start">
                    <img
                      src={WhatsappIcon}
                      alt="WhatsApp"
                      className="w-7 h-7 mr-3"
                    />
                    <div>
                      <p className="text-lg font-semibold">Zendry</p>
                      <a
                        href="https://wa.me/6289666900321"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-300 hover:text-white transition-colors"
                      >
                        089666900321
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-start">
                    <img
                      src={WhatsappIcon}
                      alt="WhatsApp"
                      className="w-7 h-7 mr-3"
                    />
                    <div>
                      <p className="text-lg font-semibold">Aldi</p>
                      <a
                        href="https://wa.me/6281392130582"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-300 hover:text-white transition-colors"
                      >
                        081392130582
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bagian Kanan: Connect With Us! */}
              <div className="text-left">
                <h2 className="font-audiowide text-xl md:text-2xl lg:text-3xl mb-8">
                  Connect With Us!
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-start">
                    <img
                      src={InstagramIcon}
                      alt="Instagram"
                      className="w-7 h-7 mr-3"
                    />
                    <a
                      href="https://www.instagram.com/dnccsemarang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-raleway text-xl hover:text-gray-300 transition-colors"
                    >
                      @dnccsemarang
                    </a>
                  </div>

                  <div className="flex items-center justify-start">
                    <img
                      src={TiktokIcon}
                      alt="TikTok"
                      className="w-7 h-7 mr-3"
                    />
                    <a
                      href="https://www.tiktok.com/@dnccsemarang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-raleway text-xl hover:text-gray-300 transition-colors"
                    >
                      @dnccsemarang
                    </a>
                  </div>

                  <div className="flex items-center justify-start">
                    <img
                      src={DiscordIcon}
                      alt="Discord"
                      className="w-7 h-7 mr-3"
                    />
                    <a
                      href="https://discord.gg/UnKM3vdK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-raleway text-xl hover:text-gray-300 transition-colors"
                    >
                      discordncc
                    </a>
                  </div>

                  <div className="flex items-center justify-start">
                    <img
                      src={GithubIcon}
                      alt="GitHub"
                      className="w-7 h-7 mr-3"
                    />
                    <a
                      href="https://github.com/dnccsemarang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-raleway text-xl hover:text-gray-300 transition-colors"
                    >
                      dnccsemarang
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
