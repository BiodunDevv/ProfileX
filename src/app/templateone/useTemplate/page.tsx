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
        { name: "Skill 1", level: 3, color: "bg-blue-500" },
        { name: "Skill 2", level: 3, color: "bg-yellow-500" },
      ],
      education: [{ degree: "", institution: "", year: "", description: "" }],
    },
    projects: [
      {
        id: 1,
        type: "Project Type",
        typeColor: "blue",
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

  const colorOptions = [
    { value: "blue", label: "Blue", bgClass: "bg-blue-500" },
    { value: "purple", label: "Purple", bgClass: "bg-purple-500" },
    { value: "green", label: "Green", bgClass: "bg-green-500" },
    { value: "amber", label: "Amber", bgClass: "bg-amber-500" },
    { value: "indigo", label: "Indigo", bgClass: "bg-indigo-500" },
    { value: "pink", label: "Pink", bgClass: "bg-pink-500" },
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
            ...(typeof prev[section] === "object" && prev[section] !== null ? prev[section] : {}),
            [field]: value,
        },
    }));
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
};

  const addItem = (section: keyof FormData, field: string | null) => {
    setFormData((prev) => {
      const newData = { ...prev };

      if (section === "hero" && field === "companies") {
        newData.hero.companies.push("");
      } else if (section === "about" && field === "skills") {
        newData.about.skills.push({ name: "", level: 3, color: "bg-blue-500" });
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
          typeColor: "blue",
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

  const removeItem = (section: keyof FormData, field: string | null, index: number) => {
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
    // Navigate to preview with the ID in the URL
    router.push(`/templateone/preview/${formData.id}`);
  };

  const inputClass =
    "w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3F8E00] focus:border-transparent";
  const labelClass = "block text-gray-700 font-medium mb-2";
  const sectionClass = "bg-white rounded-xl shadow-md p-6 mb-8";
  const buttonClass =
    "bg-[#3F8E00] hover:bg-[#4BA600] text-white font-medium py-2 px-4 rounded-lg transition-colors";
  const tabButtonClass = "py-3 px-6 font-medium rounded-lg transition-colors";


  const tabVariants = {
    active: { backgroundColor: "#3F8E00", color: "white" },
    inactive: { backgroundColor: "#f3f4f6", color: "#374151" },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Customize Your Profile
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Personalize your portfolio by providing the information below. All
            fields can be customized to showcase your unique skills and
            projects.
          </p>
        </motion.div>

        {/* Tabs navigation */}
        <div className="flex overflow-x-auto space-x-2 mb-8 p-1 bg-gray-100 rounded-lg">
          {["hero", "about", "projects", "contact"].map((tab) => (
            <motion.button
              key={tab}
              variants={tabVariants}
              animate={activeTab === tab ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={tabButtonClass}
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
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
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

        <button
          onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
          className="flex items-center justify-center w-full mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg py-2 px-4 font-medium transition-transform hover:shadow-lg"
        >
          <Sparkles className="mr-2" size={18} />
          {isAiPanelOpen ? "Hide AI Assistance" : "Show AI Assistance"}
          {isAiPanelOpen ? (
            <ChevronUp className="ml-2" size={18} />
          ) : (
            <ChevronDown className="ml-2" size={18} />
          )}
        </button>

        <form className="space-y-8">
          {/* Hero Section */}
          {activeTab === "hero" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={sectionClass}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
                    className="bg-gray-200 hover:bg-gray-300 px-4 rounded-r-lg flex items-center"
                    onClick={() =>
                      alert("Image upload functionality would go here")
                    }
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
          )}

          {/* About Section */}
          {activeTab === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={sectionClass}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
                    className="text-[#3F8E00] hover:text-[#4BA600] flex items-center text-sm font-medium"
                  >
                    <Plus size={16} className="mr-1" /> Add Skill
                  </button>
                </div>

                {formData.about.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Skill {index + 1}</h4>
                      {formData.about.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem("about", "skills", index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preview
                      </label>
                      <div className="h-2.5 bg-gray-200 rounded-full">
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
                    className="text-[#3F8E00] hover:text-[#4BA600] flex items-center text-sm font-medium"
                  >
                    <Plus size={16} className="mr-1" /> Add Education
                  </button>
                </div>

                {formData.about.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      {formData.about.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeItem("about", "education", index)
                          }
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Projects Section
                </h2>
                <button
                  type="button"
                  onClick={() => addItem("projects", null)}
                  className={`${buttonClass} flex items-center`}
                >
                  <Plus size={18} className="mr-2" /> Add Project
                </button>
              </div>

              {formData.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Project {index + 1}
                    </h3>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem("projects", null, index)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg"
                      >
                        <Trash2 size={20} />
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
                        className="bg-gray-200 hover:bg-gray-300 px-4 rounded-r-lg flex items-center"
                        onClick={() =>
                          alert("Image upload functionality would go here")
                        }
                      >
                        <Upload size={18} />
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
                    className="text-[#3F8E00] hover:text-[#4BA600] flex items-center text-sm font-medium"
                  >
                    <Plus size={16} className="mr-1" /> Add Social Link
                  </button>
                </div>

                {formData.contact.socialLinks.map((link, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Social Link {index + 1}</h4>
                      {formData.contact.socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeItem("contact", "socialLinks", index)
                          }
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <button
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
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg flex items-center transition-colors ${
                activeTab === "hero" ? "invisible" : ""
              }`}
            >
              Previous
            </button>

            {activeTab !== "contact" ? (
              <button
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
                className="bg-[#3F8E00] hover:bg-[#4BA600] text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
              >
                Next <ArrowRight size={18} className="ml-2" />
              </button>
            ) : (
              <motion.button
                type="button"
                onClick={handlePreview}
                className="bg-[#3F8E00] hover:bg-[#4BA600] text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
              >
                Preview <ArrowRight size={18} className="ml-2" />
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
