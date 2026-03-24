"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Review = {
  id: string | number;
  name: string;
  affiliation: string;
  quote: string;
  videoId: string; // YouTube video ID
  thumbnailSrc: string;
};

interface TestimonialSliderProps {
  reviews: Review[];
  className?: string;
}

const textVariants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? 50 : -50,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? -50 : 50,
    opacity: 0,
  }),
};

export const TestimonialSlider = ({
  reviews,
  className,
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPlaying, setIsPlaying] = useState(false);

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  const thumbnailReviews = reviews
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  return (
    <div
      className={`tslider-container ${className || ''}`}
    >
      <div className="tslider-grid">
        {/* Left Column: Meta and Thumbnails */}
        <div className="tslider-meta">
          <div className="tslider-pagination">
            <span className="tslider-pagination-text">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(reviews.length).padStart(2, "0")}
            </span>
            <h2 className="tslider-vertical-label">
              Depoimentos
            </h2>
          </div>

          <div className="tslider-thumbnails">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex(
                (r) => r.id === review.id
              );
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="tslider-thumb-btn"
                  aria-label={`Ver depoimento de ${review.name}`}
                >
                  <img
                    src={review.thumbnailSrc}
                    alt={review.name}
                    className="tslider-thumb-img"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: YouTube Video */}
        <div className="tslider-image-col">
          {isPlaying ? (
            <iframe
              key={`iframe-${currentIndex}`}
              src={`https://www.youtube-nocookie.com/embed/${activeReview.videoId}?autoplay=1&rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="tslider-main-img"
              style={{ border: 0 }}
            />
          ) : (
            <div
              className="tslider-video-thumb"
              onClick={() => setIsPlaying(true)}
              role="button"
              tabIndex={0}
              aria-label="Assistir depoimento"
            >
              <img
                src={`https://img.youtube.com/vi/${activeReview.videoId}/maxresdefault.jpg`}
                alt={activeReview.name}
                className="tslider-main-img"
              />
              {/* Play button overlay */}
              <div className="tslider-play-overlay">
                <div className="tslider-play-btn">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14v14l11-7-11-7z" fill="white" fillOpacity="0.95"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Text and Navigation */}
        <div className="tslider-content-col">
          <div className="tslider-text-wrap">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="tslider-affiliation">
                  {activeReview.affiliation}
                </p>
                <h3 className="tslider-name">
                  {activeReview.name}
                </h3>
                <blockquote className="tslider-quote">
                  "{activeReview.quote}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="tslider-nav">
            <button
              className="tslider-nav-btn tslider-nav-outline"
              onClick={handlePrev}
              aria-label="Depoimento anterior"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="tslider-nav-btn tslider-nav-filled"
              onClick={handleNext}
              aria-label="Próximo depoimento"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Scale-branded review data with YouTube video IDs
const scaleReviews: Review[] = [
  {
    id: 1,
    name: "Depoimento 1",
    affiliation: "Cliente Scale",
    quote: "A Scale mudou completamente nosso marketing. Saímos de zero leads para mais de 60 por mês em apenas 3 meses.",
    videoId: "mVUz7iBpI6A",
    thumbnailSrc: "https://img.youtube.com/vi/mVUz7iBpI6A/mqdefault.jpg",
  },
  {
    id: 2,
    name: "Depoimento 2",
    affiliation: "Cliente Scale",
    quote: "Estamos na primeira página do Google e os agendamentos triplicaram. Transparência total em cada passo.",
    videoId: "R3ID5_VP7Y8",
    thumbnailSrc: "https://img.youtube.com/vi/R3ID5_VP7Y8/mqdefault.jpg",
  },
  {
    id: 3,
    name: "Depoimento 3",
    affiliation: "Cliente Scale",
    quote: "O site que a Scale criou não é só bonito. Ele converte. Em 4 meses já ranqueávamos para as principais palavras-chave.",
    videoId: "6YA2xmW1Y4Y",
    thumbnailSrc: "https://img.youtube.com/vi/6YA2xmW1Y4Y/mqdefault.jpg",
  },
  {
    id: 4,
    name: "Depoimento 4",
    affiliation: "Cliente Scale",
    quote: "Engajamento aumentou 400% e começamos a receber clientes direto pelo Instagram. Recomendo de olhos fechados.",
    videoId: "mVUz7iBpI6A",
    thumbnailSrc: "https://img.youtube.com/vi/mVUz7iBpI6A/mqdefault.jpg",
  },
  {
    id: 5,
    name: "Depoimento 5",
    affiliation: "Cliente Scale",
    quote: "O diagnóstico gratuito já valeu mais do que meses com a agência anterior. Nosso custo por lead caiu 60%.",
    videoId: "R3ID5_VP7Y8",
    thumbnailSrc: "https://img.youtube.com/vi/R3ID5_VP7Y8/mqdefault.jpg",
  },
];

export default function ScaleTestimonialSlider() {
  return <TestimonialSlider reviews={scaleReviews} />;
}
