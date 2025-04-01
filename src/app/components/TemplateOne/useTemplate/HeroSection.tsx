import React from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Upload } from "lucide-react";

interface HeroSectionProps {
  formData: {
    hero: {
      devName: string;
      title: string;
      description: string;
      heroImage: string;
      companies: string[];
    };
  };
  handleInputChange: (section: string, field: string, value: string) => void;
  handleNestedInputChange: (
    section: string,
    index: number,
    field: string | null,
    value: string
  ) => void;
  addItem: (section: string, field: string | null) => void;
  removeItem: (section: string, field: string | null, index: number) => void;
  labelClass: string;
  inputClass: string;
  sectionClass: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
  addItem,
  removeItem,
  labelClass,
  inputClass,
  sectionClass,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={sectionClass}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hero Section</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="devName" className={labelClass}>
            Brand Name
          </label>
          <input
            id="devName"
            type="text"
            className={inputClass}
            value={formData.hero.devName}
            onChange={(e) =>
              handleInputChange("hero", "devName", e.target.value)
            }
            placeholder="Your brand or business name"
          />
        </div>

        <div>
          <label htmlFor="title" className={labelClass}>
            Your Name / Title
          </label>
          <input
            id="title"
            type="text"
            className={inputClass}
            value={formData.hero.title}
            onChange={(e) => handleInputChange("hero", "title", e.target.value)}
            placeholder="e.g. John Doe / Full Stack Developer"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className={inputClass}
          value={formData.hero.description}
          onChange={(e) =>
            handleInputChange("hero", "description", e.target.value)
          }
          placeholder="A brief description about yourself and your expertise"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="heroImage" className={labelClass}>
          Hero Image URL
        </label>
        <div className="flex">
          <input
            id="heroImage"
            type="text"
            className={`${inputClass} rounded-r-none`}
            value={formData.hero.heroImage}
            onChange={(e) =>
              handleInputChange("hero", "heroImage", e.target.value)
            }
            placeholder="URL to your profile image"
          />
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 px-4 rounded-r-lg flex items-center"
            onClick={() => alert("Image upload functionality would go here")}
          >
            <Upload size={18} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Enter a URL or upload an image
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className={labelClass}>
            Companies You&apos;ve Worked With
          </label>
          <button
            type="button"
            onClick={() => addItem("hero", "companies")}
            className="text-[#3F8E00] hover:text-[#4BA600] flex items-center text-sm font-medium"
          >
            <Plus size={16} className="mr-1" /> Add Company
          </button>
        </div>

        {formData.hero.companies.map((company, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              className={`${inputClass} flex-grow`}
              value={company}
              onChange={(e) =>
                handleNestedInputChange(
                  "hero",
                  index,
                  "companies",
                  e.target.value
                )
              }
              placeholder={`Company ${index + 1}`}
            />
            {formData.hero.companies.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem("hero", "companies", index)}
                className="ml-2 text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroSection;
