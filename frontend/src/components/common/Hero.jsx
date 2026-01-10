import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {

    return (
        <section className="relative p-4 flex items-center justify-center px-4 overflow-hidden z-0">
            {/* 🎥 Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover -z-10"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/video-poster.jpg"
            >
                <source src="/videos/background_video.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/60 -z-10" />
            
            <div className="relative z-10 flex flex-col items-center gap-12 text-white text-center">               
                <div className="max-w-xl flex flex-col gap-4">
                    <h3 className="text-2hexl md:text-4xl font-semibold leading-tight">
                        Crafted to perfection, one brew at a time.
                    </h3>

                    <p className="text-gray-300 text-base md:text-lg">
                        Where coffee, pastries, and great moments brew together!
                    </p>

                    <Link to='/menu'

                        className=" border mx-auto mt-4 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
                    >
                        Discover Our Menu
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
