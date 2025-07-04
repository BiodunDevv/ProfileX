import React from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171826] to-[#0D0F1A] py-2 sm:py-4 px-2 sm:px-4">
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm text-purple-400">
          <LayoutGrid size={14} className="mr-1.5" />
          Template Editor
        </div>
        <h1 className="text-[28px] font-bold text-white mb-4">
          Customize Your Profile
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Personalize your portfolio by providing the information below. All
          fields can be customized to showcase your unique skills and
          projects.
        </p>
      </motion.div>

      <div>
        <p className="text-white text-center mt-4">
          This is a placeholder for Template 2. You can customize this page as needed.
        </p>
      </div>
      </div>
      </div>
  )
}

export default page