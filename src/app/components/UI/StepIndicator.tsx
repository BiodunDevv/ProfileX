import { motion } from "framer-motion";
import { itemVariants } from "../Auth/AuthLayout";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <motion.div variants={itemVariants} className="flex justify-center mb-6">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`w-10 h-1.5 mx-1 rounded-full transition-all duration-300 ${
            currentStep >= step
              ? "bg-gradient-to-r from-pink-500 to-purple-600"
              : "bg-gray-700"
          }`}
        />
      ))}
    </motion.div>
  );
};

export default StepIndicator;
