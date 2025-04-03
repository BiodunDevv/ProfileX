"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  Upload,
  Save,
  LayoutGrid,
} from "lucide-react";

interface HeroSection {
  devName: string;
  title: string;
  description: string;
  heroImage: string;
  companies: string[];
}

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface AboutSection {
  title: string;
  subtitle: string;
  description: string;
  skills: Skill[];
  education: Education[];
}

interface Project {
  id: number;
  type: string;
  typeColor: string;
  name: string;
  description: string;
  image: string;
  sourceLink: string;
  demoLink: string;
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

interface ContactSection {
  email: string;
  phone: string;
  socialLinks: SocialLink[];
}

interface FormData {
  id: string;
  hero: HeroSection;
  about: AboutSection;
  projects: Project[];
  contact: ContactSection;
}

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hero");
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    hero: {
      devName: "",
      title: "",
      description: "",
      heroImage: "",
      companies: ["", "", ""],
    },
    about: {
      title: "About Me",
      subtitle: "Professional Background & Expertise",
      description: "",
      skills: [
        { name: "Skill 1", level: 3, color: "bg-purple-500" },
        { name: "Skill 2", level: 3, color: "bg-blue-500" },
      ],
      education: [{ degree: "", institution: "", year: "", description: "" }],
    },
    projects: [
      {
        id: 1,
        type: "Project Type",
        typeColor: "purple",
        name: "Project Name",
        description: "",
        image: "",
        sourceLink: "",
        demoLink: "",
      },
    ],
    contact: {
      email: "",
      phone: "",
      socialLinks: [
        { platform: "LinkedIn", icon: "linkedin", url: "" },
        { platform: "GitHub", icon: "github", url: "" },
        { platform: "Twitter", icon: "twitter", url: "" },
      ],
    },
  });
  const [showSavedToast, setShowSavedToast] = useState(false);

  const colorOptions = [
    { value: "purple", label: "Purple", bgClass: "bg-purple-500" },
    { value: "blue", label: "Blue", bgClass: "bg-blue-500" },
    { value: "indigo", label: "Indigo", bgClass: "bg-indigo-500" },
    { value: "pink", label: "Pink", bgClass: "bg-pink-500" },
    { value: "amber", label: "Amber", bgClass: "bg-amber-500" },
    { value: "green", label: "Green", bgClass: "bg-green-500" },
    { value: "red", label: "Red", bgClass: "bg-red-500" },
    { value: "teal", label: "Teal", bgClass: "bg-teal-500" },
  ];

  // Load from localStorage on initial render if available
  useEffect(() => {
    const savedData = localStorage.getItem("templateOneData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      // Generate a unique ID for new forms
      setFormData((prev) => ({ ...prev, id: uuidv4() }));
    }
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    if (formData.id) {
      localStorage.setItem("templateOneData", JSON.stringify(formData));
    }
  }, [formData]);

  const handleAiSuggestion = (field: string) => {
    alert(`AI would generate suggestions for the ${field} field.`);
    // This is where the actual AI implementation would go
  };

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(typeof prev[section] === "object" && prev[section] !== null
          ? prev[section]
          : {}),
        [field]: value,
      },
    }));

    // Show the saved toast notification
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  interface NestedInputChangeValue {
    [key: string]: string | number | boolean | object | null;
  }

  const handleNestedInputChange = (
    section: keyof FormData,
    index: number,
    field: string | null,
    value: NestedInputChangeValue | string
  ) => {
    setFormData((prev) => {
      const newData = { ...prev };
      if (section === "hero" && field === "companies") {
        newData.hero.companies[index] = value as string;
      } else if (section === "about" && field === "skills") {
        newData.about.skills[index] = {
          ...newData.about.skills[index],
          ...(value as NestedInputChangeValue),
        };
      } else if (section === "about" && field === "education") {
        newData.about.education[index] = {
          ...newData.about.education[index],
          ...(value as NestedInputChangeValue),
        };
      } else if (section === "projects") {
        newData.projects[index] = {
          ...newData.projects[index],
          ...(value as NestedInputChangeValue),
        };
      } else if (section === "contact" && field === "socialLinks") {
        newData.contact.socialLinks[index] = {
          ...newData.contact.socialLinks[index],
          ...(value as NestedInputChangeValue),
        };
      }
      return newData;
    });

    // Show the saved toast notification
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const addItem = (section: keyof FormData, field: string | null) => {
    setFormData((prev) => {
      const newData = { ...prev };

      if (section === "hero" && field === "companies") {
        newData.hero.companies.push("");
      } else if (section === "about" && field === "skills") {
        newData.about.skills.push({
          name: "",
          level: 3,
          color: "bg-purple-500",
        });
      } else if (section === "about" && field === "education") {
        newData.about.education.push({
          degree: "",
          institution: "",
          year: "",
          description: "",
        });
      } else if (section === "projects") {
        const newId =
          newData.projects.length > 0
            ? Math.max(...newData.projects.map((p) => p.id)) + 1
            : 1;
        newData.projects.push({
          id: newId,
          type: "Project Type",
          typeColor: "purple",
          name: "Project Name",
          description: "",
          image: "",
          sourceLink: "",
          demoLink: "",
        });
      } else if (section === "contact" && field === "socialLinks") {
        newData.contact.socialLinks.push({ platform: "", icon: "", url: "" });
      }

      return newData;
    });
  };

  const removeItem = (
    section: keyof FormData,
    field: string | null,
    index: number
  ) => {
    setFormData((prev) => {
      const newData = { ...prev };

      if (section === "hero" && field === "companies") {
        newData.hero.companies = newData.hero.companies.filter(
          (_, i) => i !== index
        );
      } else if (section === "about" && field === "skills") {
        newData.about.skills = newData.about.skills.filter(
          (_, i) => i !== index
        );
      } else if (section === "about" && field === "education") {
        newData.about.education = newData.about.education.filter(
          (_, i) => i !== index
        );
      } else if (section === "projects") {
        newData.projects = newData.projects.filter((_, i) => i !== index);
      } else if (section === "contact" && field === "socialLinks") {
        newData.contact.socialLinks = newData.contact.socialLinks.filter(
          (_, i) => i !== index
        );
      }

      return newData;
    });
  };

  const handlePreview = () => {
    router.push(`/templateone/preview/${formData.id}`);
  };

  const inputClass =
    "w-full bg-[#1E2132] border border-[#2E313C] rounded-lg px-2 sm:px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-500 text-gray-200";
  const labelClass = "block text-gray-300 font-medium mb-2";
  const sectionClass =
    "sm:bg-[#171826] sm:border sm:border-[#2E313C] sm:rounded-xl sm:shadow-lg px-0 py-2 sm:px-4 py-4 mb-8";
  const buttonClass =
    "bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-purple-900/20";
  const tabButtonClass = "py-3 px-6 font-medium rounded-lg transition-colors";

  const tabVariants = {
    active: {
      backgroundColor: "#711381",
      color: "white",
      boxShadow: "0 4px 14px rgba(113, 19, 129, 0.25)",
    },
    inactive: { backgroundColor: "#1E2132", color: "#d1d5db" },
  };

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

        {/* Tabs navigation */}
        <div className="flex overflow-x-auto space-x-2 mb-8 p-1.5 bg-[#1A1D2E] rounded-xl border border-[#2E313C]">
          {["hero", "about", "projects", "contact"].map((tab) => (
            <motion.button
              key={tab}
              variants={tabVariants}
              animate={activeTab === tab ? "active" : "inactive"}
              whileHover={{ scale: activeTab !== tab ? 1.03 : 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab)}
              className={`${tabButtonClass} ${activeTab === tab ? "border-transparent" : "hover:bg-[#262A3E] border-transparent"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* AI Helper Panel */}
        <motion.div
          className="mb-8 overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isAiPanelOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-white border border-indigo-500/30">
            <div className="flex items-center mb-4">
              <Sparkles className="mr-2" size={24} />
              <h3 className="text-xl font-semibold">AI Assistance</h3>
            </div>
            <p className="mb-4">
              Need help with your content? Let AI assist you in creating
              compelling descriptions, project details, and more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeTab === "hero" && (
                <>
                  <button
                    onClick={() => handleAiSuggestion("title")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Generate catchy title
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("description")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Draft personal bio
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("companies")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Suggest company format
                  </button>
                </>
              )}
              {activeTab === "about" && (
                <>
                  <button
                    onClick={() => handleAiSuggestion("skills")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Recommend skills
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("description")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Write professional summary
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("education")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Format education details
                  </button>
                </>
              )}
              {activeTab === "projects" && (
                <>
                  <button
                    onClick={() => handleAiSuggestion("project-name")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Create project title
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("project-description")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Write project description
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("project-type")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Suggest project categories
                  </button>
                </>
              )}
              {activeTab === "contact" && (
                <>
                  <button
                    onClick={() => handleAiSuggestion("social-links")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Format social links
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("contact-message")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Create contact messages
                  </button>
                  <button
                    onClick={() => handleAiSuggestion("email")}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left backdrop-blur-sm transition"
                  >
                    Professional email template
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
          className="flex items-center justify-center w-full mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg py-2.5 px-4 font-medium transition-all hover:shadow-lg shadow-purple-900/20 border border-indigo-500/30"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Sparkles className="mr-2" size={18} />
          {isAiPanelOpen ? "Hide AI Assistance" : "Show AI Assistance"}
          {isAiPanelOpen ? (
            <ChevronUp className="ml-2" size={18} />
          ) : (
            <ChevronDown className="ml-2" size={18} />
          )}
        </motion.button>

        <form className="space-y-8">
          {/* Hero Section */}
          {activeTab === "hero" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={sectionClass}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Hero Section
              </h2>

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
                    onChange={(e) =>
                      handleInputChange("hero", "title", e.target.value)
                    }
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
                    className="bg-[#262A3E] hover:bg-[#303650] px-4 rounded-r-lg flex items-center border border-l-0 border-[#2E313C]"
                    onClick={() =>
                      alert("Image upload functionality would go here")
                    }
                  >
                    <Upload size={18} className="text-gray-300" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Enter a URL or upload an image
                </p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className={labelClass}>
                    Companies you worked with
                  </label>
                  <button
                    type="button"
                    onClick={() => addItem("hero", "companies")}
                    className="text-purple-400 hover:text-purple-300 flex items-center text-sm font-medium"
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
                        className="ml-2 text-red-400 hover:text-red-300 p-2 bg-[#261A1A] hover:bg-[#2D1F1F] rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* About Section */}
          {activeTab === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={sectionClass}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                About Section
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="aboutTitle" className={labelClass}>
                    Section Title
                  </label>
                  <input
                    id="aboutTitle"
                    type="text"
                    className={inputClass}
                    value={formData.about.title}
                    onChange={(e) =>
                      handleInputChange("about", "title", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label htmlFor="aboutSubtitle" className={labelClass}>
                    Section Subtitle
                  </label>
                  <input
                    id="aboutSubtitle"
                    type="text"
                    className={inputClass}
                    value={formData.about.subtitle}
                    onChange={(e) =>
                      handleInputChange("about", "subtitle", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="aboutDescription" className={labelClass}>
                  About Me Description
                </label>
                <textarea
                  id="aboutDescription"
                  rows={4}
                  className={inputClass}
                  value={formData.about.description}
                  onChange={(e) =>
                    handleInputChange("about", "description", e.target.value)
                  }
                  placeholder="Describe your professional background, approach to work, and what makes you unique"
                />
              </div>

              {/* Skills Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className={labelClass}>Skills</label>
                  <button
                    type="button"
                    onClick={() => addItem("about", "skills")}
                    className="text-purple-400 hover:text-purple-300 flex items-center text-sm font-medium"
                  >
                    <Plus size={16} className="mr-1" /> Add Skill
                  </button>
                </div>

                {formData.about.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#1A1D2E] border border-[#2E313C] rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">
                        Skill {index + 1}
                      </h4>
                      {formData.about.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem("about", "skills", index)}
                          className="text-red-400 hover:text-red-300 p-1.5 bg-[#261A1A] hover:bg-[#2D1F1F] rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          value={skill.name}
                          onChange={(e) =>
                            handleNestedInputChange("about", index, "skills", {
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g. JavaScript"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Level (1-5)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          className={inputClass}
                          value={skill.level}
                          onChange={(e) =>
                            handleNestedInputChange("about", index, "skills", {
                              level: parseInt(e.target.value) || 1,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Color
                        </label>
                        <select
                          className={inputClass}
                          value={skill.color
                            .replace("bg-", "")
                            .replace("-500", "")
                            .replace("-600", "")}
                          onChange={(e) =>
                            handleNestedInputChange("about", index, "skills", {
                              color: `bg-${e.target.value}-500`,
                            })
                          }
                        >
                          {colorOptions.map((color) => (
                            <option key={color.value} value={color.value}>
                              {color.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Preview
                      </label>
                      <div className="h-2.5 bg-[#262A3E] rounded-full">
                        <div
                          className={`h-2.5 rounded-full ${skill.color}`}
                          style={{ width: `${skill.level * 20}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className={labelClass}>Education</label>
                  <button
                    type="button"
                    onClick={() => addItem("about", "education")}
                    className="text-purple-400 hover:text-purple-300 flex items-center text-sm font-medium"
                  >
                    <Plus size={16} className="mr-1" /> Add Education
                  </button>
                </div>

                {formData.about.education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-[#1A1D2E] border border-[#2E313C] rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">
                        Education {index + 1}
                      </h4>
                      {formData.about.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeItem("about", "education", index)
                          }
                          className="text-red-400 hover:text-red-300 p-1.5 bg-[#261A1A] hover:bg-[#2D1F1F] rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Degree
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          value={edu.degree}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "about",
                              index,
                              "education",
                              { degree: e.target.value }
                            )
                          }
                          placeholder="e.g. Bachelor of Science"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          value={edu.institution}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "about",
                              index,
                              "education",
                              { institution: e.target.value }
                            )
                          }
                          placeholder="e.g. University of California"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Years
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          value={edu.year}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "about",
                              index,
                              "education",
                              { year: e.target.value }
                            )
                          }
                          placeholder="e.g. 2018-2022"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          value={edu.description}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "about",
                              index,
                              "education",
                              { description: e.target.value }
                            )
                          }
                          placeholder="e.g. Graduated with honors"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects Section */}
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={sectionClass}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Projects Section
                </h2>
                <motion.button
                  type="button"
                  onClick={() => addItem("projects", null)}
                  className={`${buttonClass} flex items-center`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={18} className="mr-2" /> Add Project
                </motion.button>
              </div>

              {formData.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="sm:bg-[#1A1D2E] border border-[#2E313C] rounded-lg px-2 py-2 sm:px-4 sm:py-4 mb-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Project {index + 1}
                    </h3>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem("projects", null, index)}
                        className="text-red-400 hover:text-red-300 p-2 bg-[#261A1A] hover:bg-[#2D1F1F] rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className={labelClass}>Project Name</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={project.name}
                        onChange={(e) =>
                          handleNestedInputChange("projects", index, null, {
                            name: e.target.value,
                          })
                        }
                        placeholder="Name of your project"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Project Type</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={project.type}
                          onChange={(e) =>
                            handleNestedInputChange("projects", index, null, {
                              type: e.target.value,
                            })
                          }
                          placeholder="e.g. Web App, Mobile App"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Type Color</label>
                        <select
                          className={inputClass}
                          value={project.typeColor}
                          onChange={(e) =>
                            handleNestedInputChange("projects", index, null, {
                              typeColor: e.target.value,
                            })
                          }
                        >
                          {colorOptions.map((color) => (
                            <option key={color.value} value={color.value}>
                              {color.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className={labelClass}>Project Description</label>
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={project.description}
                      onChange={(e) =>
                        handleNestedInputChange("projects", index, null, {
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe what the project does, technologies used, your role, etc."
                    />
                  </div>

                  <div className="mb-6">
                    <label className={labelClass}>Project Image URL</label>
                    <div className="flex">
                      <input
                        type="text"
                        className={`${inputClass} rounded-r-none`}
                        value={project.image}
                        onChange={(e) =>
                          handleNestedInputChange("projects", index, null, {
                            image: e.target.value,
                          })
                        }
                        placeholder="URL to project screenshot or image"
                      />
                      <button
                        type="button"
                        className="bg-[#262A3E] hover:bg-[#303650] px-4 rounded-r-lg flex items-center border border-l-0 border-[#2E313C]"
                        onClick={() =>
                          alert("Image upload functionality would go here")
                        }
                      >
                        <Upload size={18} className="text-gray-300" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Source Code Link</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={project.sourceLink}
                        onChange={(e) =>
                          handleNestedInputChange("projects", index, null, {
                            sourceLink: e.target.value,
                          })
                        }
                        placeholder="e.g. GitHub repository URL"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Live Demo Link</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={project.demoLink}
                        onChange={(e) =>
                          handleNestedInputChange("projects", index, null, {
                            demoLink: e.target.value,
                          })
                        }
                        placeholder="URL to live project"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Contact Section */}
          {activeTab === "contact" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={sectionClass}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    value={formData.contact.email}
                    onChange={(e) =>
                      handleInputChange("contact", "email", e.target.value)
                    }
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className={inputClass}
                    value={formData.contact.phone}
                    onChange={(e) =>
                      handleInputChange("contact", "phone", e.target.value)
                    }
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className={labelClass}>Social Links</label>
                  <button
                    type="button"
                    onClick={() => addItem("contact", "socialLinks")}
                    className="text-purple-400 hover:text-purple-300 flex items-center text-sm font-medium"
                  >
                    <Plus size={16} className="mr-1" /> Add Social Link
                  </button>
                </div>

                {formData.contact.socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="bg-[#1A1D2E] border border-[#2E313C] rounded-lg p-2 sm:p-2 mb-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">
                        Social Link {index + 1}
                      </h4>
                      {formData.contact.socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeItem("contact", "socialLinks", index)
                          }
                          className="text-red-400 hover:text-red-300 p-1.5 bg-[#261A1A] hover:bg-[#2D1F1F] rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Platform
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          value={link.platform}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "contact",
                              index,
                              "socialLinks",
                              { platform: e.target.value }
                            )
                          }
                          placeholder="e.g. LinkedIn, GitHub"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Icon
                        </label>
                        <select
                          className={inputClass}
                          value={link.icon}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "contact",
                              index,
                              "socialLinks",
                              { icon: e.target.value }
                            )
                          }
                        >
                          <option value="">Select icon</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                          <option value="twitter">Twitter</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          URL
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          value={link.url}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "contact",
                              index,
                              "socialLinks",
                              { url: e.target.value }
                            )
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="flex justify-between">
            <motion.button
              type="button"
              onClick={() => {
                const currentIndex = [
                  "hero",
                  "about",
                  "projects",
                  "contact",
                ].indexOf(activeTab);
                const prevIndex = currentIndex - 1;
                if (prevIndex >= 0) {
                  setActiveTab(
                    ["hero", "about", "projects", "contact"][prevIndex]
                  );
                }
              }}
              className={`bg-[#1E2132] border border-[#2E313C] hover:bg-[#262A3E] text-gray-200 font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors ${
                activeTab === "hero" ? "invisible" : ""
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Previous
            </motion.button>

            {activeTab !== "contact" ? (
              <motion.button
                type="button"
                onClick={() => {
                  const currentIndex = [
                    "hero",
                    "about",
                    "projects",
                    "contact",
                  ].indexOf(activeTab);
                  const nextIndex = currentIndex + 1;
                  if (nextIndex < 4) {
                    setActiveTab(
                      ["hero", "about", "projects", "contact"][nextIndex]
                    );
                  }
                }}
                className="bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors shadow-lg shadow-purple-900/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Next <ArrowRight size={18} className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handlePreview}
                className="bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors shadow-lg shadow-purple-900/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Preview <ArrowRight size={18} className="ml-2" />
              </motion.button>
            )}
          </div>
        </form>
      </div>

      {/* Auto-save toast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showSavedToast ? 1 : 0,
          y: showSavedToast ? 0 : 20,
        }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-auto md:w-auto md:max-w-md mx-auto bg-[#1E2132]/80 backdrop-blur-lg border border-green-500/30 shadow-xl rounded-xl p-4 text-center"
      >
        <p className="text-green-400 flex items-center justify-center">
          <Save size={16} className="mr-2" />
          Changes saved automatically
        </p>
      </motion.div>
    </div>
  );
};

export default Page;
