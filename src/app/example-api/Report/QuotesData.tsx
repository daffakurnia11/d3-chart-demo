"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "@/styles/globals.css";

import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

export default function QuotesData() {
  const pagination = {
    clickable: true,
    renderBullet: function (_, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <div className="rounded-lg w-full h-full overflow-hidden">
      <Swiper
        pagination={pagination}
        autoplay={{
          delay: 4000,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {[...Array(5)].map((_, index) => (
          <SwiperSlide key={index} className="w-full h-full quotes-container">
            <div className="max-w-xl relative">
              <h1 className="font-merriweather text-xl font-bold text-white italic leading-8">
                &quot;Loss of talented people in critical roles currently or has
                the talent to fulfill critical roles on the future- Our business
                will become irrelevant, stagnate and &apos;die&apos;- Focus on
                the wrong things and los credibility and trust of our clients
                and employees - Reputational and financial risks&quot;
              </h1>
              <div
                className="absolute top-0 left-0 -translate-y-full -translate-x-full"
                style={{ width: "36.8px", height: "35.76px" }}
              >
                <Image
                  width={36.8}
                  height={35.76}
                  src={"/quotes.svg"}
                  alt="Quotes Icon"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
