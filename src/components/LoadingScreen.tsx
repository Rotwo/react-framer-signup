import { FC } from "react";
import { motion } from "framer-motion";

const LoadingScreen: FC = () => {
  return (
    <motion.div animate={{ opacity: 1, display: 'flex' }} exit={{ opacity: 0, display: 'none' }} initial={{ opacity: 0, display: 'none' }} className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
        <img src="/pet.webp" className="size-48" alt="Loading..." />
    </motion.div>
  );
};

export default LoadingScreen;
