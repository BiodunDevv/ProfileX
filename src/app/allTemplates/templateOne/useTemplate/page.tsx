/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  ArrowRight,
  Upload,
  LayoutGrid,
  AlertTriangle,
  Check,
  Loader2,
  Eye,
} from "lucide-react";
import { uploadToCloudinary } from "@/app/api/cloudinary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import usePortfolioOneStore from "../../../../../store/portfolioOneStore";
import { useAuthStore } from "../../../../../store/useAuthStore";
import ImageUploader from "./ImageUploader";

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

  // Helper function to convert hex colors to Tailwind classes
  const convertHexToTailwind = (hex: string): string => {
    const colorMap: { [key: string]: string } = {
      "#F7DF1E": "bg-yellow-500",
      "#61DAFB": "bg-blue-500",
      "#339933": "bg-green-500",
      "#47A248": "bg-green-600",
      "#8B5CF6": "bg-purple-500",
      "#EF4444": "bg-red-500",
      "#F59E0B": "bg-amber-500",
      "#06B6D4": "bg-cyan-500",
      "#EC4899": "bg-pink-500",
      "#6366F1": "bg-indigo-500",
      "#14B8A6": "bg-teal-500",
    };

    return colorMap[hex.toUpperCase()] || "bg-purple-500";
  };
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
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewStatus, setPreviewStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [previewPortfolioId, setPreviewPortfolioId] = useState<string | null>(
    null
  );
  const [isUpdate, setIsUpdate] = useState(false);
  const [lastAddTime, setLastAddTime] = useState<number | null>(null);
  const [lastRemoveTime, setLastRemoveTime] = useState<number | null>(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);
  const [hasExistingPortfolio, setHasExistingPortfolio] = useState(false);

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

  // Get auth state directly from the store
  const { isAuthenticated, token } = useAuthStore();
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const {
    getMyPortfolio,
    portfolio,
    isLoading: isPortfolioLoading,
  } = usePortfolioOneStore();

  // Helper function to convert hex color to Tailwind class
  const hexToTailwindColor = (hexColor: string): string => {
    const colorMap: { [key: string]: string } = {
      "#a855f7": "bg-purple-500",
      "#3b82f6": "bg-blue-500",
      "#6366f1": "bg-indigo-500",
      "#ec4899": "bg-pink-500",
      "#f59e0b": "bg-amber-500",
      "#10b981": "bg-green-500",
      "#ef4444": "bg-red-500",
      "#14b8a6": "bg-teal-500",
    };
    return colorMap[hexColor] || "bg-purple-500";
  };

  // Helper function to extract company names from experience data
  const extractCompanies = (experience: any[]): string[] => {
    if (!experience || !Array.isArray(experience)) return ["", "", ""];
    const companies = experience
      .map((exp) => exp.company || "")
      .filter(Boolean);
    while (companies.length < 3) companies.push("");
    return companies.slice(0, 5); // Max 5 companies
  };

  // Fetch existing portfolio data on component load
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (isAuthenticated) {
        try {
          setIsLoadingPortfolio(true);
          const response = await getMyPortfolio();

          // Handle the API response as any to avoid TypeScript issues with dynamic structure
          const existingPortfolio =
            (response as any)?.data?.portfolio || response;

          console.log(existingPortfolio);

          if (
            existingPortfolio &&
            (existingPortfolio.id || existingPortfolio._id)
          ) {
            setHasExistingPortfolio(true);
            setPortfolioId(
              existingPortfolio.id || existingPortfolio._id || null
            );
            setIsUpdate(true);

            // Convert API data to form format with proper field mapping
            const mappedFormData = {
              id: existingPortfolio.id || existingPortfolio._id || null,
              hero: {
                devName:
                  existingPortfolio.brandName ||
                  existingPortfolio.personalInfo?.fullName ||
                  "",
                title:
                  existingPortfolio.title ||
                  existingPortfolio.personalInfo?.tagline ||
                  "",
                description:
                  existingPortfolio.description ||
                  existingPortfolio.personalInfo?.bio ||
                  "",
                heroImage: existingPortfolio.heroImage || "",
                companies:
                  existingPortfolio.companies?.length > 0
                    ? existingPortfolio.companies.slice(0, 5)
                    : extractCompanies(existingPortfolio.experience || []),
              },
              about: {
                title: existingPortfolio.sectionAbout || "About Me",
                subtitle:
                  existingPortfolio.sectionSubtitle ||
                  "Professional Background & Expertise",
                description:
                  existingPortfolio.aboutMeDescription ||
                  existingPortfolio.personalInfo?.bio ||
                  "",
                skills:
                  existingPortfolio.skills?.length > 0
                    ? existingPortfolio.skills.map((skill: any) => ({
                        name: skill.name || "",
                        level: parseInt(skill.level?.toString()) || 3,
                        color:
                          typeof skill.color === "string" &&
                          skill.color.startsWith("#")
                            ? hexToTailwindColor(skill.color)
                            : skill.color || "bg-purple-500",
                      }))
                    : null,
                education:
                  existingPortfolio.education?.length > 0
                    ? existingPortfolio.education.map((edu: any) => ({
                        degree: edu.degree || "",
                        institution: edu.institution || "",
                        year: edu.years || edu.year?.toString() || "",
                        description: edu.description || "",
                      }))
                    : null,
              },
              projects:
                existingPortfolio.projects?.length > 0
                  ? existingPortfolio.projects.map(
                      (project: any, index: number) => ({
                        id: index + 1,
                        type:
                          Array.isArray(project.technologies) &&
                          project.technologies.length > 0
                            ? project.technologies[0]
                            : "Web Development",
                        typeColor: ["purple", "blue", "green", "amber"][
                          index % 4
                        ],
                        name: project.name || project.title || "",
                        description: project.description || "",
                        image: project.imageUrl || "",
                        sourceLink: project.githubUrl || project.repoUrl || "",
                        demoLink: project.liveUrl || project.demoUrl || "",
                      })
                    )
                  : null,
              contact: {
                email:
                  existingPortfolio.contactInfo?.[0]?.emailAddress ||
                  existingPortfolio.personalInfo?.email ||
                  "",
                phone:
                  existingPortfolio.contactInfo?.[0]?.phoneNumber ||
                  existingPortfolio.personalInfo?.phone ||
                  "",
                socialLinks:
                  existingPortfolio.socialLinks?.length > 0
                    ? existingPortfolio.socialLinks.map((link: any) => ({
                        platform:
                          link.platform?.charAt(0).toUpperCase() +
                            link.platform?.slice(1) || "",
                        icon:
                          link.icon?.replace("fab fa-", "") ||
                          link.platform?.toLowerCase() ||
                          "",
                        url: link.url || "",
                      }))
                    : [
                        { platform: "LinkedIn", icon: "linkedin", url: "" },
                        { platform: "GitHub", icon: "github", url: "" },
                        { platform: "Twitter", icon: "twitter", url: "" },
                      ],
              },
            };

            setFormData(mappedFormData);

            // Auto-validate the form since we have API data
            setTimeout(() => {
              setFormIsValid(true);
            }, 100);

            console.log(
              "✅ Portfolio auto-populated successfully:",
              mappedFormData
            );
          } else {
            console.log(
              "ℹ️ No existing portfolio found, using default form data"
            );
          }
        } catch (error) {
          console.error("Failed to load portfolio:", error);
          toast.error("Failed to load existing portfolio");
        } finally {
          setIsLoadingPortfolio(false);
        }
      }
    };

    fetchPortfolio();
  }, [isAuthenticated, getMyPortfolio]);

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
    // More aggressive debounce check to prevent multiple quick additions
    const currentTime = Date.now();
    if (lastAddTime && currentTime - lastAddTime < 1500) {
      console.log("Preventing double add - too soon");
      return;
    }
    setLastAddTime(currentTime);

    console.log(`Adding item to ${section} - ${field}`);

    setFormData((prev) => {
      const newData = { ...prev };

      if (section === "hero" && field === "companies") {
        if (newData.hero.companies.length < 5) {
          newData.hero.companies.push("");
        }
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
        newData.contact.socialLinks.push({
          platform: "",
          icon: "",
          url: "",
        });
      }

      return newData;
    });
  };

  const removeItem = (
    section: keyof FormData,
    field: string | null,
    index: number
  ) => {
    // More aggressive debounce check to prevent multiple quick removals
    const currentTime = Date.now();
    if (lastRemoveTime && currentTime - lastRemoveTime < 1500) {
      console.log("Preventing double removal - too soon");
      return;
    }
    setLastRemoveTime(currentTime);

    console.log(`Removing item from ${section} - ${field} at index ${index}`);

    setFormData((prev) => {
      const newData = { ...prev };

      if (section === "hero" && field === "companies") {
        if (newData.hero.companies.length > 1) {
          newData.hero.companies = newData.hero.companies.filter(
            (_, i) => i !== index
          );
        }
      } else if (section === "about" && field === "skills") {
        if (newData.about.skills.length > 1) {
          newData.about.skills = newData.about.skills.filter(
            (_, i) => i !== index
          );
        }
      } else if (section === "about" && field === "education") {
        if (newData.about.education.length > 1) {
          newData.about.education = newData.about.education.filter(
            (_, i) => i !== index
          );
        }
      } else if (section === "projects") {
        if (newData.projects.length > 1) {
          newData.projects = newData.projects.filter((_, i) => i !== index);
        }
      } else if (section === "contact" && field === "socialLinks") {
        if (newData.contact.socialLinks.length > 1) {
          newData.contact.socialLinks = newData.contact.socialLinks.filter(
            (_, i) => i !== index
          );
        }
      }

      return newData;
    });
  };

  // Function to validate if the form has all required fields filled
  const validateForm = () => {
    // Check essential hero section fields
    if (
      !formData.hero.devName?.trim() ||
      !formData.hero.title?.trim() ||
      !formData.hero.description?.trim()
    ) {
      return false;
    }

    // Check about description (more lenient for API data)
    if (!formData.about.description?.trim()) {
      return false;
    }

    // Check if at least one skill has a name (more lenient for auto-populated data)
    const hasValidSkill = formData.about.skills.some(
      (skill) =>
        skill.name &&
        skill.name.trim() !== "" &&
        skill.name !== "Skill 1" &&
        skill.name !== "Skill 2"
    );
    if (!hasValidSkill) {
      // Allow form to be valid even without skills if it's auto-populated from API
      console.log("No valid skills found, but allowing for API data");
    }

    // Check contact info (basic validation)
    if (!formData.contact.email?.trim()) {
      return false;
    }

    return true;
  };

  // Auto-validate when form data changes (for API data loading)
  useEffect(() => {
    const validateForm = () => {
      // Validate hero section
      if (!formData.hero.devName?.trim()) {
        return false;
      }
      if (!formData.hero.title?.trim()) {
        return false;
      }
      if (!formData.hero.description?.trim()) {
        return false;
      }

      // Validate projects (at least one project with name and description)
      if (formData.projects.length === 0) {
        return false;
      }

      const hasValidProject = formData.projects.some(
        (project) => project.name?.trim() && project.description?.trim()
      );
      if (!hasValidProject) {
        return false;
      }

      // Validate contact section
      if (!formData.contact.email?.trim()) {
        return false;
      }

      return true;
    };

    const isValid = validateForm();
    setFormIsValid(isValid);
  }, [formData]);

  // Handle the Next button - navigate to the next tab
  const handleNext = () => {
    const tabs = ["hero", "about", "projects", "contact"];
    const currentIndex = tabs.indexOf(activeTab);

    // If we're not on the last tab, go to the next one
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      // If we're on the last tab, give feedback that they should save
      toast.info(
        "You've reached the last section. Please fill all fields and save your portfolio."
      );
    }
  };

  const handleSavePortfolioOne = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to save your portfolio");
      return;
    }

    // Validate the form again to ensure it's complete
    if (!validateForm()) {
      toast.error("Please fill in all required fields before saving");
      return;
    }

    setPreviewStatus("loading");
    setIsPreviewModalOpen(true);

    try {
      // Get the functions from the portfolio store
      const { createPortfolio, updatePortfolio, getMyPortfolio } =
        usePortfolioOneStore.getState();

      // Ensure we're following the exact structure required by the API
      const apiPortfolioData = {
        templateType: "template1",
        brandName: formData.hero.devName,
        heroImage: formData.hero.heroImage,
        title: formData.hero.title,
        description: formData.hero.description,
        companies: formData.hero.companies.filter(
          (company) => company && company.trim() !== ""
        ),
        sectionAbout: formData.about.title,
        sectionSubtitle: formData.about.subtitle,
        aboutMeDescription: formData.about.description,
        skills: formData.about.skills
          .filter(
            (skill) =>
              skill.name &&
              skill.name.trim() !== "" &&
              skill.name !== "Skill 1" &&
              skill.name !== "Skill 2"
          )
          .map((skill) => ({
            name: skill.name,
            level: parseInt(skill.level.toString()),
            color: skill.color,
          })),
        education: formData.about.education
          .filter((edu) => edu.degree || edu.institution)
          .map((edu) => ({
            degree: edu.degree,
            institution: edu.institution,
            years: edu.year,
            description: edu.description || "",
          })),
        projects: formData.projects
          .filter(
            (project) =>
              project.name &&
              project.name.trim() !== "" &&
              project.name !== "Project Name" &&
              project.name !== "Sample Project"
          )
          .map((project) => ({
            name: project.name,
            description: project.description || "",
            technologies: project.type ? [project.type] : [],
            imageUrl: project.image || "",
            repoUrl: project.sourceLink || "",
            liveUrl: project.demoLink || "",
            featured: true,
          })),
        contactInfo: [
          {
            emailAddress: formData.contact.email,
            phoneNumber: formData.contact.phone,
          },
        ],
        socialLinks: formData.contact.socialLinks
          .filter((link) => link.url && link.url.trim() !== "")
          .map((link) => ({
            platform: link.platform,
            url: link.url,
            icon: link.icon || link.platform.toLowerCase(),
          })),
        theme: "blue",
        isPublic: true,
      };

      let result;

      console.log("Sending portfolio data to API:", apiPortfolioData);

      // Check if we're updating an existing portfolio or creating a new one
      if (portfolioId) {
        // Update existing portfolio
        console.log("Updating portfolio with ID:", portfolioId);
        result = await updatePortfolio(portfolioId, apiPortfolioData as any);
        if (result) {
          setPreviewStatus("success");
          setPreviewPortfolioId(portfolioId);
          toast.success("Portfolio updated successfully!");
        } else {
          throw new Error("Failed to update portfolio");
        }
      } else {
        const existingPortfolio = await getMyPortfolio();

        if (existingPortfolio) {
        
          result = await updatePortfolio(
            existingPortfolio._id as string,
            apiPortfolioData as any
          );
          setPortfolioId(existingPortfolio._id as string);
          if (result) {
            setPreviewStatus("success");
            setPreviewPortfolioId(existingPortfolio._id as string);
            setIsUpdate(true);
            toast.success("Portfolio updated successfully!");
          } else {
            throw new Error("Failed to update existing portfolio");
          }
        } else {
          // Create a new portfolio
          result = await createPortfolio(apiPortfolioData as any);
          if (result) {
            setPortfolioId(result._id || null);
            setPreviewStatus("success");
            setPreviewPortfolioId(result._id || null);
            toast.success("Portfolio created successfully!");
          } else {
            throw new Error("Failed to create new portfolio");
          }
        }
      }

      if (!result) {
        throw new Error("Failed to save portfolio");
      }
    } catch (error: any) {
      console.error("Error saving portfolio:", error);
      setPreviewStatus("error");
      setIsPreviewModalOpen(false);

      // Specific error handling for common issues
      if (error.message === "Portfolio with this title already exists") {
        toast.error(
          "A portfolio with this title already exists. Please choose a different title."
        );
      } else if (error.message === "Authentication required") {
        toast.error("You need to be logged in. Please sign in and try again.");
      } else if (error.message && error.message.includes("Failed to")) {
        toast.error(error.message);
      } else {
        toast.error("Failed to save portfolio. Please try again later.");
      }
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Show a temporary preview using URL.createObjectURL
      const previewUrl = URL.createObjectURL(file);

      // Update the appropriate section with the preview URL
      if (section === "hero") {
        handleInputChange("hero", "heroImage", previewUrl);
      } else if (section === "projects" && index !== undefined) {
        handleNestedInputChange("projects", index, null, {
          image: previewUrl,
        });
      }

      // Start the upload process
      toast.info("Uploading image...", {
        autoClose: false,
        toastId: "uploading",
      });

      // Upload the image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Update the form data with the permanent Cloudinary URL
      if (section === "hero") {
        handleInputChange("hero", "heroImage", cloudinaryUrl);
      } else if (section === "projects" && index !== undefined) {
        handleNestedInputChange("projects", index, null, {
          image: cloudinaryUrl,
        });
      }

      // Release the object URL to avoid memory leaks
      URL.revokeObjectURL(previewUrl);

      // Display success toast
      toast.dismiss("uploading");
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss("uploading");
      toast.error("Failed to upload image. Please try again.");
    }
  };

  // Wrapper functions for ImageUploader component compatibility
  const handleInputChangeWrapper = (
    section: string,
    field: string,
    value: string
  ) => {
    handleInputChange(section as keyof FormData, field, value);
  };

  const handleNestedInputChangeWrapper = (
    section: string,
    index: number,
    field: string | null,
    value: Record<string, unknown>
  ) => {
    handleNestedInputChange(
      section as keyof FormData,
      index,
      field,
      value as NestedInputChangeValue | string
    );
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

  const resetForm = () => {
    setIsResetting(true);

    // Default template data
    const defaultFormData = {
      id: uuidv4(),
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
    };

    // Simulate delay for visual feedback
    setTimeout(() => {
      setFormData(defaultFormData);
      setIsResetting(false);
      setResetSuccess(true);

      // Close after a moment
      setTimeout(() => {
        setIsResetDialogOpen(false);
        setResetSuccess(false);
      }, 1500);
    }, 800);
  };

  return (
    <>
      {/* Loading Overlay for Portfolio Fetching */}
      {isLoadingPortfolio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#171826] border border-[#2E313C] rounded-2xl p-8 max-w-md mx-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-t-2 border-r-2 border-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 border-2 border-[#2E313C] rounded-full"></div>
                <LayoutGrid
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500"
                  size={24}
                />
              </div>
              <div className="text-center">
                <h3 className="text-white font-medium text-lg mb-2">
                  Loading Your Portfolio
                </h3>
                <p className="text-gray-400 text-sm">
                  Fetching your existing portfolio data...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              Template One Editor
            </div>
            <h1 className="text-[28px] font-bold text-white mb-4">
              {isUpdate ? "Update Your Profile" : "Customize Your Profile"}
            </h1>
            {isUpdate && (
              <p className="text-gray-400 mb-4">
                You&apos;re editing your existing portfolio. Changes will be
                saved when you click Preview.
              </p>
            )}
          </motion.div>

          <div className="flex overflow-x-auto space-x-2 mb-8 p-1.5 bg-[#1A1D2E] rounded-xl border border-[#2E313C]">
            {["hero", "about", "projects", "contact"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={tabButtonClass}
                variants={tabVariants}
                animate={activeTab === tab ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>

          <form className="space-y-8">
            {/* Hero Tab */}
            {activeTab === "hero" && (
              <div className={sectionClass}>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Hero Section
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-6">
                        <label className={labelClass}>Your Name</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={formData.hero.devName}
                          onChange={(e) =>
                            handleInputChange("hero", "devName", e.target.value)
                          }
                          placeholder="e.g. Jane Doe"
                        />
                      </div>
                      <div className="mb-6">
                        <label className={labelClass}>Your Title</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={formData.hero.title}
                          onChange={(e) =>
                            handleInputChange("hero", "title", e.target.value)
                          }
                          placeholder="e.g. Full Stack Developer"
                        />
                      </div>
                      <div className="mb-6">
                        <label className={labelClass}>Brief Description</label>
                        <textarea
                          className={`${inputClass} min-h-[100px]`}
                          value={formData.hero.description}
                          onChange={(e) =>
                            handleInputChange(
                              "hero",
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="A short introduction about yourself"
                        />
                      </div>
                      <div className="mb-6">
                        <label className={labelClass}>
                          Companies or Clients
                        </label>
                        {formData.hero.companies.map((company, index) => (
                          <div key={index} className="flex mb-3">
                            <input
                              type="text"
                              className={`${inputClass} ${index > 0 ? "rounded-l-none" : ""}`}
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
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem("hero", "companies", index)
                                }
                                className="bg-[#1A1D2E] hover:bg-[#262A3E] px-3 ml-1 rounded-lg border border-l-0 border-[#2E313C]"
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </button>
                            )}
                          </div>
                        ))}
                        {formData.hero.companies.length < 5 && (
                          <button
                            type="button"
                            onClick={() => addItem("hero", "companies")}
                            className="text-sm text-purple-400 hover:text-purple-300 flex items-center mt-2"
                          >
                            <Plus size={16} className="mr-1" /> Add Company
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <ImageUploader
                        section="hero"
                        currentImageUrl={formData.hero.heroImage}
                        label="Profile Image"
                        handleFileChange={handleFileChange}
                        handleInputChange={handleInputChangeWrapper}
                        handleNestedInputChange={handleNestedInputChangeWrapper}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div className={sectionClass}>
                <h2 className="text-xl font-semibold text-white mb-6">
                  About Section
                </h2>
                <div className="space-y-6">
                  <div className="mb-6">
                    <label className={labelClass}>Section Title</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.about.title}
                      onChange={(e) =>
                        handleInputChange("about", "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-6">
                    <label className={labelClass}>Section Subtitle</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.about.subtitle}
                      onChange={(e) =>
                        handleInputChange("about", "subtitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-6">
                    <label className={labelClass}>About Description</label>
                    <textarea
                      className={`${inputClass} min-h-[150px]`}
                      value={formData.about.description}
                      onChange={(e) =>
                        handleInputChange(
                          "about",
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Write about your professional background, skills, and experience"
                    />
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className={`${labelClass} mb-0`}>Skills</label>
                    </div>
                    {formData.about.skills.map((skill, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 mb-4">
                        <div className="col-span-4">
                          <input
                            type="text"
                            className={inputClass}
                            value={skill.name}
                            onChange={(e) =>
                              handleNestedInputChange(
                                "about",
                                index,
                                "skills",
                                {
                                  name: e.target.value,
                                }
                              )
                            }
                            placeholder="Skill name (e.g. JavaScript)"
                          />
                        </div>
                        <div className="col-span-4">
                          <select
                            className={inputClass}
                            value={skill.level}
                            onChange={(e) =>
                              handleNestedInputChange(
                                "about",
                                index,
                                "skills",
                                {
                                  level: parseInt(e.target.value),
                                }
                              )
                            }
                          >
                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Advanced</option>
                            <option value="4">Expert</option>
                            <option value="5">Master</option>
                          </select>
                        </div>
                        <div className="col-span-3">
                          <select
                            className={inputClass}
                            value={skill.color}
                            onChange={(e) =>
                              handleNestedInputChange(
                                "about",
                                index,
                                "skills",
                                {
                                  color: e.target.value,
                                }
                              )
                            }
                          >
                            {colorOptions.map((option) => (
                              <option key={option.value} value={option.bgClass}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeItem("about", "skills", index)}
                            className="bg-[#1A1D2E] hover:bg-[#262A3E] px-2 py-2 rounded-lg border border-[#2E313C]"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addItem("about", "skills")}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center mt-2"
                    >
                      <Plus size={16} className="mr-1" /> Add Skill
                    </button>
                  </div>

                  {/* Education */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className={`${labelClass} mb-0`}>Education</label>
                    </div>
                    {formData.about.education.map((edu, index) => (
                      <div
                        key={index}
                        className="border border-[#2E313C] rounded-lg p-4 mb-4"
                      >
                        <div className="mb-3">
                          <label className={`${labelClass} text-sm`}>
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
                                {
                                  degree: e.target.value,
                                }
                              )
                            }
                            placeholder="e.g. Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div className="mb-3">
                          <label className={`${labelClass} text-sm`}>
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
                                {
                                  institution: e.target.value,
                                }
                              )
                            }
                            placeholder="e.g. Stanford University"
                          />
                        </div>
                        <div className="mb-3">
                          <label className={`${labelClass} text-sm`}>
                            Year
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
                                {
                                  year: e.target.value,
                                }
                              )
                            }
                            placeholder="e.g. 2018 - 2022"
                          />
                        </div>
                        <div className="mb-3">
                          <label className={`${labelClass} text-sm`}>
                            Description
                          </label>
                          <textarea
                            className={`${inputClass} min-h-[80px]`}
                            value={edu.description}
                            onChange={(e) =>
                              handleNestedInputChange(
                                "about",
                                index,
                                "education",
                                {
                                  description: e.target.value,
                                }
                              )
                            }
                            placeholder="Brief description of your studies"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeItem("about", "education", index)
                            }
                            className="text-sm text-red-400 hover:text-red-300 flex items-center mt-2"
                          >
                            <Trash2 size={14} className="mr-1" /> Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addItem("about", "education")}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center mt-2"
                    >
                      <Plus size={16} className="mr-1" /> Add Education
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div className={sectionClass}>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Projects Section
                </h2>
                <div className="space-y-6">
                  {formData.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="border border-[#2E313C] rounded-lg p-4 mb-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-white">
                          Project #{index + 1}
                        </h3>
                        {formData.projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem("projects", null, index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-6">
                            <label className={labelClass}>Project Name</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={project.name}
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "projects",
                                  index,
                                  null,
                                  {
                                    name: e.target.value,
                                  }
                                )
                              }
                              placeholder="e.g. E-commerce Website"
                            />
                          </div>
                          <div className="mb-6">
                            <label className={labelClass}>Project Type</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={project.type}
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "projects",
                                  index,
                                  null,
                                  {
                                    type: e.target.value,
                                  }
                                )
                              }
                              placeholder="e.g. Web Development"
                            />
                          </div>
                          <div className="mb-6">
                            <label className={labelClass}>Type Color</label>
                            <select
                              className={inputClass}
                              value={project.typeColor}
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "projects",
                                  index,
                                  null,
                                  {
                                    typeColor: e.target.value,
                                  }
                                )
                              }
                            >
                              {colorOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-6">
                            <label className={labelClass}>
                              Project Description
                            </label>
                            <textarea
                              className={`${inputClass} min-h-[120px]`}
                              value={project.description}
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "projects",
                                  index,
                                  null,
                                  {
                                    description: e.target.value,
                                  }
                                )
                              }
                              placeholder="Describe your project, technologies used, and your role"
                            />
                          </div>
                        </div>
                        <div>
                          <ImageUploader
                            section="projects"
                            index={index}
                            currentImageUrl={project.image}
                            label="Project Screenshot"
                            handleFileChange={handleFileChange}
                            handleInputChange={handleInputChangeWrapper}
                            handleNestedInputChange={
                              handleNestedInputChangeWrapper
                            }
                          />

                          <div className="mb-6">
                            <label className={labelClass}>
                              Source Code URL
                            </label>
                            <input
                              type="text"
                              className={inputClass}
                              value={project.sourceLink}
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "projects",
                                  index,
                                  null,
                                  {
                                    sourceLink: e.target.value,
                                  }
                                )
                              }
                              placeholder="e.g. https://github.com/yourusername/project"
                            />
                          </div>
                          <div className="mb-6">
                            <label className={labelClass}>Demo URL</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={project.demoLink}
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "projects",
                                  index,
                                  null,
                                  {
                                    demoLink: e.target.value,
                                  }
                                )
                              }
                              placeholder="e.g. https://yourproject.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem("projects", null)}
                    className="text-purple-400 hover:text-purple-300 flex items-center"
                  >
                    <Plus size={18} className="mr-1.5" /> Add New Project
                  </button>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className={sectionClass}>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Contact Section
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="mb-6">
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={formData.contact.email}
                        onChange={(e) =>
                          handleInputChange("contact", "email", e.target.value)
                        }
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="mb-6">
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={formData.contact.phone}
                        onChange={(e) =>
                          handleInputChange("contact", "phone", e.target.value)
                        }
                        placeholder="e.g. +1 (123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className={`${labelClass} mb-0`}>
                        Social Links
                      </label>
                    </div>
                    {formData.contact.socialLinks.map((link, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 mb-4">
                        <div className="col-span-4">
                          <input
                            type="text"
                            className={inputClass}
                            value={link.platform}
                            onChange={(e) =>
                              handleNestedInputChange(
                                "contact",
                                index,
                                "socialLinks",
                                {
                                  platform: e.target.value,
                                }
                              )
                            }
                            placeholder="Platform (e.g. LinkedIn)"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="text"
                            className={inputClass}
                            value={link.icon}
                            onChange={(e) =>
                              handleNestedInputChange(
                                "contact",
                                index,
                                "socialLinks",
                                {
                                  icon: e.target.value,
                                }
                              )
                            }
                            placeholder="Icon name"
                          />
                        </div>
                        <div className="col-span-4">
                          <input
                            type="text"
                            className={inputClass}
                            value={link.url}
                            onChange={(e) =>
                              handleNestedInputChange(
                                "contact",
                                index,
                                "socialLinks",
                                {
                                  url: e.target.value,
                                }
                              )
                            }
                            placeholder="URL"
                          />
                        </div>
                        <div className="col-span-1 flex justify-end">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeItem("contact", "socialLinks", index)
                              }
                              className="bg-[#1A1D2E] hover:bg-[#262A3E] px-2 py-2 rounded-lg border border-[#2E313C]"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {/* Removed "Add Social Link" button as the three default ones are sufficient */}
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Footer with Better Button Layout */}
            <div className="mt-12 mb-8">
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400">
                    Portfolio Progress
                  </span>
                  <span className="text-sm text-purple-400 font-medium">
                    {formIsValid ? "Ready to Save" : "Continue Editing"}
                  </span>
                </div>
                <div className="w-full bg-[#1A1D2E] rounded-full h-2 border border-[#2E313C]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      formIsValid
                        ? "bg-gradient-to-r from-green-500 to-emerald-400"
                        : "bg-gradient-to-r from-purple-600 to-purple-400"
                    }`}
                    style={{
                      width: formIsValid ? "100%" : "75%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Main Footer */}
              <div className="bg-gradient-to-r from-[#171826] to-[#1A1D2E] border border-[#2E313C] rounded-2xl p-6 shadow-2xl">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  {/* Left Section - Status & Quick Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          formIsValid ? "bg-green-400" : "bg-amber-400"
                        } animate-pulse`}
                      ></div>
                      <div>
                        <p className="text-white font-medium">
                          {isUpdate
                            ? "Editing Existing Portfolio"
                            : "Creating New Portfolio"}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {formIsValid
                            ? "All required fields completed"
                            : "Please fill in all required fields"}
                        </p>
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => setIsResetDialogOpen(true)}
                      className="group flex items-center gap-2 text-gray-400 hover:text-red-400 border border-[#2E313C] hover:border-red-500/30 px-4 py-2 rounded-lg transition-all duration-200 bg-[#1A1D2E] hover:bg-red-900/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        className="w-4 h-4 group-hover:rotate-12 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span className="text-sm font-medium">Reset</span>
                    </motion.button>
                  </div>

                  {/* Right Section - Main Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                    {/* Tab Navigation Button */}
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      className="group flex items-center justify-center gap-2 bg-[#2A2D3E] hover:bg-[#3A3D4E] text-gray-200 hover:text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium border border-[#3E4152] hover:border-[#4E5162] shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Continue Editing</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </motion.button>

                    {/* Preview Existing Portfolio Button - if user has one */}
                    {hasExistingPortfolio && !formIsValid && (
                      <motion.button
                        type="button"
                        onClick={() => router.push("/allTemplates/templateOne")}
                        className="group flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/25"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Eye
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                        <span>Preview Current</span>
                      </motion.button>
                    )}

                    {/* Save & Preview button - prominent when form is ready */}
                    {formIsValid && (
                      <motion.button
                        type="button"
                        onClick={handleSavePortfolioOne}
                        className="group relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25 min-w-[140px]"
                        disabled={isPortfolioLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>

                        {isPortfolioLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Eye
                              size={18}
                              className="group-hover:scale-110 transition-transform"
                            />
                            <span>
                              {isUpdate ? "Update & Preview" : "Save & Preview"}
                            </span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Bottom helper text */}
                <div className="mt-4 pt-4 border-t border-[#2E313C]/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-500">
                    <span>
                      💡 Use the tabs above to navigate between sections
                    </span>
                    <span>
                      {formIsValid
                        ? "✅ Ready to save your portfolio"
                        : `⏳ ${4 - ["hero", "about", "projects", "contact"].indexOf(activeTab)} sections remaining`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Reset Confirmation Modal */}
        <Transition appear show={isResetDialogOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsResetDialogOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#171826] border border-[#2E313C] p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      {resetSuccess ? "Form Reset" : "Reset Form?"}
                    </Dialog.Title>
                    <div className="mt-4">
                      {resetSuccess ? (
                        <div className="text-green-400 flex items-center">
                          <Check size={18} className="mr-2" />
                          Form has been reset successfully!
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-300">
                            This will clear all your form data and reset to the
                            default template. This cannot be undone.
                          </p>

                          <div className="mt-6 flex justify-end gap-3">
                            <button
                              type="button"
                              className="bg-[#1A1D2E] hover:bg-[#262A3E] text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
                              onClick={() => setIsResetDialogOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                              onClick={resetForm}
                              disabled={isResetting}
                            >
                              {isResetting ? (
                                <>
                                  <Loader2
                                    size={16}
                                    className="mr-2 animate-spin"
                                  />
                                  Resetting...
                                </>
                              ) : (
                                "Reset Form"
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Preview Modal */}
        <Transition appear show={isPreviewModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsPreviewModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#171826] border border-[#2E313C] p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      {previewStatus === "loading" &&
                        "Creating your portfolio..."}
                      {previewStatus === "success" && "Portfolio Ready!"}
                      {previewStatus === "error" && "There was an error"}
                    </Dialog.Title>

                    <div className="mt-4">
                      {previewStatus === "loading" && (
                        <div className="flex flex-col items-center justify-center py-6">
                          <Loader2
                            size={48}
                            className="animate-spin text-purple-500 mb-4"
                          />
                          <p className="text-gray-400">
                            Please wait while we prepare your portfolio...
                          </p>
                        </div>
                      )}

                      {previewStatus === "success" && (
                        <div className="space-y-6">
                          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-start">
                            <Check
                              size={20}
                              className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                            />
                            <p className="text-gray-300">
                              Your portfolio has been{" "}
                              {isUpdate ? "updated" : "created"} successfully!
                              You can now view it or continue editing.
                            </p>
                          </div>

                          <div className="flex justify-between">
                            <button
                              type="button"
                              className="text-gray-300 hover:text-white border border-[#2E313C] hover:border-purple-500/50 px-4 py-2 rounded-lg transition-colors"
                              onClick={() => setIsPreviewModalOpen(false)}
                            >
                              Continue Editing
                            </button>

                            <button
                              type="button"
                              className={buttonClass}
                              onClick={() => {
                                // Navigate to the template one page to show the portfolio
                                router.push("/allTemplates/templateOne");
                              }}
                            >
                              View Portfolio
                            </button>
                          </div>
                        </div>
                      )}

                      {previewStatus === "error" && (
                        <div className="space-y-6">
                          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start">
                            <AlertTriangle
                              size={20}
                              className="text-red-500 mr-3 mt-0.5 flex-shrink-0"
                            />
                            <p className="text-gray-300">
                              There was an error saving your portfolio. Please
                              try again or contact support if the problem
                              persists.
                            </p>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="text-gray-300 hover:text-white border border-[#2E313C] hover:border-red-500/50 px-4 py-2 rounded-lg transition-colors"
                              onClick={() => setIsPreviewModalOpen(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
};

export default Page;
