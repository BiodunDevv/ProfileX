"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BlackSphere from "../../../../public/BlackSphere.svg";
import pinkSphere from "../../../../public/pinkSphere.svg";

const Sphere = () => {
  return (
    <>
      <motion.div
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: 0.2,
        }}
        className="absolute top-5 md:top-40 right-0 md:left-20 animate-float"
      >
        <motion.div>
          <Image
            src={pinkSphere}
            alt="Pink Decorative Sphere"
            width={150}
            height={150}
            priority
            className="opacity-80"
          />
        </motion.div>
      </motion.div>

      {/* Black sphere - desktop only, matching AuthLayout positioning */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: 0.3,
        }}
        className="absolute top-20 md:top-40 right-0 md:right-20 animate-float-delayed hidden md:block"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Image
            src={BlackSphere}
            alt="Black Decorative Sphere"
            width={150}
            height={150}
            priority
            className="opacity-100"
          />
        </motion.div>
      </motion.div>

      {/* Black sphere - mobile only, matching AuthLayout style */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: 0.3,
        }}
        className="absolute top-40 left-0 block md:hidden animate-float-delayed"
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Image
            src={BlackSphere}
            alt="Black Decorative Sphere"
            width={150}
            height={150}
            priority
            className="opacity-50"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sphere;
