import React from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { itemVariants } from "../Auth/AuthLayout";

type LogoHeaderProps = {
  title: string;
};

const LogoHeader = ({ title }: LogoHeaderProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center mb-5"
    >
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Rocket className="mr-2 text-[#711381]" size={40} strokeWidth={2} />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
          ProfileX
        </span>
      </motion.div>
      <motion.p variants={itemVariants} className="text-gray-400 mt-2 text-sm">
        {title}
      </motion.p>
    </motion.div>
  );
};

export default LogoHeader;
