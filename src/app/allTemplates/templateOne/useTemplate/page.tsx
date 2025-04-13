/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";
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
  LayoutGrid,
  AlertTriangle,
  Check,
  Loader2,
} from "lucide-react";
import { uploadToCloudinary } from "@/app/api/cloudinary/cloudinary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import usePortfolioStore from "../../../../../store/portfolioStore";
import { useAuthStore } from "../../../../../store/useAuthStore";

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

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!isAuthenticated || !token) {
          console.log("User not authenticated, using default data");
          setIsUpdate(false);
          return;
        }

        console.log("Fetching portfolio data...");
        const response = await fetch("/api/portfolios/portfolioone", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            console.log("No portfolio found, using default data");
            setIsUpdate(false);
          } else {
            const errorData = await response.json();
            console.error("Error fetching portfolio:", errorData);
            toast.error(errorData.message || "Failed to load portfolio");
          }
          return;
        }

        // Successfully fetched portfolio data
        const data = await response.json();
        console.log("Portfolio data loaded:", data);

        if (data) {
          // Transform the fetched data into the format expected by our form
          const transformedData = {
            id: data._id || uuidv4(),
            hero: {
              devName: data.brandName || "",
              title: data.title || "",
              description: data.description || "",
              heroImage: data.heroImage || "",
              companies: data.companies?.length ? data.companies : ["", "", ""],
            },
            about: {
              title: data.sectionAbout || "About Me",
              subtitle:
                data.sectionSubtitle || "Professional Background & Expertise",
              description: data.aboutMeDescription || "",
              skills: data.skills?.map((skill: any) => ({
                name: skill.name || "",
                level: skill.level || 3,
                color: skill.color || "bg-purple-500",
              })) || [
                { name: "Skill 1", level: 3, color: "bg-purple-500" },
                { name: "Skill 2", level: 3, color: "bg-blue-500" },
              ],
              education: data.education?.map((edu: any) => ({
                degree: edu.degree || "",
                institution: edu.institution || "",
                year: edu.years || "",
                description: edu.description || "",
              })) || [
                { degree: "", institution: "", year: "", description: "" },
              ],
            },
            projects: data.projects?.map((project: any, index: number) => ({
              id: index + 1,
              type: project.technologies?.[0] || "Project Type",
              typeColor:
                ["purple", "blue", "green", "amber"][index % 4] || "purple",
              name: project.name || "Project Name",
              description: project.description || "",
              image: project.imageUrl || "",
              sourceLink: project.repoUrl || "",
              demoLink: project.liveUrl || "",
            })) || [
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
              // Extract email and phone from contactInfo
              email: data.contactInfo?.[0]?.emailAddress || "",
              phone: data.contactInfo?.[0]?.phoneNumber || "",
              socialLinks: data.socialLinks?.map((link: any) => ({
                platform: link.platform || "",
                icon: link.icon || link.platform?.toLowerCase() || "",
                url: link.url || "",
              })) || [
                { platform: "LinkedIn", icon: "linkedin", url: "" },
                { platform: "GitHub", icon: "github", url: "" },
                { platform: "Twitter", icon: "twitter", url: "" },
              ],
            },
          };
          setFormData(transformedData);
          setIsUpdate(true);
        } else {
          console.log("No portfolio data available, using defaults");
          setIsUpdate(false);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong while loading portfolio");
        setIsUpdate(false);
      }
    };

    fetchPortfolio();
  }, [isAuthenticated, token]);

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
  const handlePreview = async () => {
    try {
      // Validate required fields
      const requiredFields = {
        hero: ["devName", "title", "description"],
        about: ["title", "subtitle", "description"],
        projects: ["name", "description"],
        contact: ["email"],
      };

      const missingFields = [];

      // Check for required fields
      for (const field of requiredFields.hero) {
        if (!formData.hero[field as keyof HeroSection]) {
          missingFields.push(`Hero - ${field}`);
        }
      }
      for (const field of requiredFields.about) {
        if (!formData.about[field as keyof AboutSection]) {
          missingFields.push(`About - ${field}`);
        }
      }
      if (formData.projects.length > 0) {
        const firstProject = formData.projects[0];
        if (!firstProject.name || !firstProject.description) {
          missingFields.push("Project - name and description");
        }
      }
      for (const field of requiredFields.contact) {
        if (!formData.contact[field as keyof ContactSection]) {
          missingFields.push(`Contact - ${field}`);
        }
      }

      if (missingFields.length > 0) {
        toast.error(
          <div>
            <p className="font-medium mb-2">
              Please fill in the required fields:
            </p>
            <ul className="list-disc ml-4">
              {missingFields.map((field, i) => (
                <li key={i}>{field}</li>
              ))}
            </ul>
          </div>
        );
        return;
      }

      // Show loading toast
      toast.loading(
        isUpdate ? "Updating portfolio..." : "Creating portfolio...",
        {
          toastId: "saving-portfolio",
        }
      );

      // Check authentication
      const isAuthenticatedCheck = await useAuthStore
        .getState()
        .checkAuthState();
      if (!isAuthenticatedCheck) {
        toast.dismiss("saving-portfolio");
        toast.error("Your session has expired. Please log in again.");
        router.push("/signin?returnTo=/allTemplates/templateOne/useTemplate");
        return;
      }

      // Prepare portfolio data
      const portfolioData = {
        templateType: "template1",
        brandName: formData.hero.devName,
        title: formData.hero.title,
        description: formData.hero.description,
        heroImage:
          formData.hero.heroImage ||
          "https://placehold.co/600x400/1A1D2E/434963?text=No+Image",
        companies: formData.hero.companies.filter(
          (company) => company.trim() !== ""
        ),
        sectionAbout: formData.about.title,
        sectionSubtitle: formData.about.subtitle,
        aboutMeDescription: formData.about.description,
        skills: formData.about.skills.map((skill) => ({
          name: skill.name,
          level: skill.level,
          color: skill.color,
        })),
        education: formData.about.education.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          years: edu.year,
          description: edu.description,
        })),
        projects: formData.projects.map((project) => ({
          name: project.name,
          description: project.description,
          technologies: [project.type],
          imageUrl:
            project.image ||
            "https://placehold.co/600x400/1A1D2E/434963?text=No+Image",
          liveUrl: project.demoLink,
          repoUrl: project.sourceLink,
          featured: true,
        })),
        socialLinks: formData.contact.socialLinks
          .filter((link) => link.platform && link.url)
          .map((link) => ({
            platform: link.platform,
            icon: link.icon,
            url: link.url,
          })),
        email: formData.contact.email,
        phone: formData.contact.phone,
        isPublic: true,
        tags: ["portfolio", "developer", "template1"],
        customUrl: formData.hero.devName.toLowerCase().replace(/\s+/g, "-"),
      };

      try {
        console.log("Portfolio data:", portfolioData);

        let result;

        if (isUpdate) {
          // Use the updatePortfolio function from the store
          const portfolioStore = usePortfolioStore.getState();
          const savedPortfolioId = localStorage.getItem(
            "templateOnePortfolioId"
          );

          if (!savedPortfolioId) {
            toast.dismiss("saving-portfolio");
            toast.error("Portfolio ID not found. Cannot update.");
            return;
          }

          // Call the updatePortfolio function with properly structured data
          result = await portfolioStore.updatePortfolio(
            savedPortfolioId,
            portfolioData
          );

          if (!result) {
            toast.dismiss("saving-portfolio");
            toast.error("Failed to update portfolio");
            return;
          }
        } else {
          // Creating a new portfolio with schema-compatible structure
          const portfolioData = {
            templateType: "template1",
            brandName: formData.hero.devName,
            title: formData.hero.title,
            description: formData.hero.description,
            heroImage:
              formData.hero.heroImage ||
              "https://placehold.co/600x400/1A1D2E/434963?text=No+Image",
            companies: formData.hero.companies.filter(
              (company) => company.trim() !== ""
            ),
            sectionAbout: formData.about.title,
            sectionSubtitle: formData.about.subtitle,
            aboutMeDescription: formData.about.description,
            skills: formData.about.skills.map((skill) => ({
              name: skill.name,
              level: skill.level,
              color: skill.color,
            })),
            education: formData.about.education.map((edu) => ({
              degree: edu.degree,
              institution: edu.institution,
              years: edu.year,
              description: edu.description,
            })),
            // Properly format projects according to schema
            projects: formData.projects.map((project) => ({
              name: project.name,
              description: project.description,
              technologies: [project.type],
              imageUrl:
                project.image ||
                "https://placehold.co/600x400/1A1D2E/434963?text=No+Image",
              liveUrl: project.demoLink,
              repoUrl: project.sourceLink,
              featured: true,
            })),
            // Add contactInfo structure
            contactInfo: [
              {
                emailAddress: formData.contact.email,
                phoneNumber: formData.contact.phone || "",
              },
            ],
            socialLinks: formData.contact.socialLinks
              .filter((link) => link.platform && link.url)
              .map((link) => ({
                platform: link.platform,
                icon: link.icon,
                url: link.url,
              })),
            isPublic: true,
            tags: ["portfolio", "developer", "template1"],
            customUrl: formData.hero.devName.toLowerCase().replace(/\s+/g, "-"),
          };

          try {
            console.log("Portfolio data:", portfolioData);

            const response = await fetch("/api/portfolios/portfolioone", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(portfolioData),
            });

            // Check if response is 409 (Portfolio already exists)
            if (response.status === 409) {
              const data = await response.json();

              // If portfolio already exists, just redirect to the preview page
              toast.success(
                "Portfolio already exists, redirecting to preview."
              );

              // Store the portfolio ID for future reference
              if (data.portfolioId) {
                localStorage.setItem(
                  "templateOnePortfolioId",
                  data.portfolioId
                );

                // SUCCESS CASE: Navigate directly to the template preview
                router.push("/allTemplates/templateOne");
                return;
              }
            }

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.message || "Failed to create portfolio"
              );
            }

            result = await response.json();

            if (result && result.portfolio) {
              result = result.portfolio;
            }
          } catch (error) {
            console.error("Portfolio save error:", error);
            toast.dismiss("saving-portfolio");
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to save portfolio"
            );
          }
        }

        // Store the portfolio ID and custom URL for future reference
        if (result && result._id) {
          localStorage.setItem("templateOnePortfolioId", result._id);

          if (result.customUrl) {
            localStorage.setItem("templateOneCustomUrl", result.customUrl);
          }
        }

        // Success message and dismiss loading toast
        toast.dismiss("saving-portfolio");
        toast.success(
          isUpdate
            ? "Portfolio updated successfully!"
            : "Portfolio created successfully!"
        );

        // Navigate to the template preview
        router.push("/allTemplates/templateOne");
      } catch (error) {
        console.error("Portfolio save error:", error);
        toast.dismiss("saving-portfolio");
        toast.error(
          error instanceof Error ? error.message : "Failed to save portfolio"
        );
      }
    } catch (error) {
      console.error("Preview error:", error);
      toast.error("An unexpected error occurred");
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

  // Replace the existing handleSubmit with this component
  const ImageUploader = ({
    section,
    index,
    currentImageUrl,
    label,
  }: {
    section: string;
    index?: number;
    currentImageUrl: string;
    label: string;
  }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsUploading(true);
      try {
        await handleFileChange(e, section, index);
      } catch (error) {
        console.error("Error in handleUpload:", error);
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="mb-6">
        <label className={labelClass}>{label}</label>
        <div className="flex flex-col space-y-3">
          <div className="flex">
            <input
              type="text"
              className={`${inputClass} rounded-r-none`}
              value={currentImageUrl}
              onChange={(e) => {
                if (section === "hero") {
                  handleInputChange("hero", "heroImage", e.target.value);
                } else if (section === "projects" && index !== undefined) {
                  handleNestedInputChange("projects", index, null, {
                    image: e.target.value,
                  });
                }
                // Reset image loading/error states when URL changes manually
                setIsImageLoading(true);
                setImageError(false);
              }}
              placeholder="URL to image or upload below"
            />
            <button
              type="button"
              className="bg-[#262A3E] hover:bg-[#303650] px-4 rounded-r-lg flex items-center border border-l-0 border-[#2E313C]"
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Upload size={18} className="text-gray-300" />
              )}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleUpload}
          />

          {currentImageUrl && (
            <div className="relative group rounded-lg overflow-hidden border border-[#2E313C]">
              <div className="w-full aspect-video bg-[#1A1D2E] overflow-hidden flex items-center justify-center">
                {isImageLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1A1D2E]">
                    <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentImageUrl}
                  alt="Preview"
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    isImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setIsImageLoading(false)}
                  onError={(e) => {
                    setImageError(true);
                    setIsImageLoading(false);
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400/1A1D2E/434963?text=Image+Preview+Unavailable";
                  }}
                />

                {/* Image loading error state */}
                {imageError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <p className="text-sm">Image could not be loaded</p>
                    <button
                      className="mt-2 text-purple-400 hover:text-purple-300 text-sm underline"
                      onClick={triggerFileInput}
                    >
                      Upload new image
                    </button>
                  </div>
                )}

                {/* Hover overlay for changing image */}
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    className="bg-purple-600/90 hover:bg-purple-600 py-2 px-4 rounded-md text-white text-sm font-medium"
                    onClick={triggerFileInput}
                  >
                    Change Image
                  </button>
                </div>
              </div>

              {/* Image info footer */}
              <div className="bg-[#1A1D2E]/80 backdrop-blur-sm p-2 text-xs text-gray-400 border-t border-[#2E313C]">
                {currentImageUrl.startsWith("blob:")
                  ? "Uploading to Cloudinary..."
                  : currentImageUrl.startsWith("http")
                    ? currentImageUrl.includes("cloudinary.com")
                      ? "Uploaded to Cloudinary"
                      : "External image URL"
                    : "Local preview"}
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500">
            {currentImageUrl
              ? "Hover over the image to change it"
              : "Upload an image (JPG or PNG, max 10MB)"}
          </p>
        </div>
      </div>
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

      // Clear reset success indicator after a moment
      setTimeout(() => {
        setResetSuccess(false);
        setIsResetDialogOpen(false);
      }, 1500);
    }, 800);
  };

  return (
    <>
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
                      placeholder="Your Dev name e.g BioCode"
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

                <ImageUploader
                  section="hero"
                  currentImageUrl={formData.hero.heroImage}
                  label="Hero Image"
                />

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
                              handleNestedInputChange(
                                "about",
                                index,
                                "skills",
                                {
                                  name: e.target.value,
                                }
                              )
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
                              handleNestedInputChange(
                                "about",
                                index,
                                "skills",
                                {
                                  level: parseInt(e.target.value) || 1,
                                }
                              )
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
                              handleNestedInputChange(
                                "about",
                                index,
                                "skills",
                                {
                                  color: `bg-${e.target.value}-500`,
                                }
                              )
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

                    <ImageUploader
                      section="projects"
                      index={index}
                      currentImageUrl={project.image}
                      label="Project Image URL"
                    />

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

            <div className="flex justify-between items-center">
              <motion.button
                type="button"
                onClick={() => setIsResetDialogOpen(true)}
                className="bg-[#2D1F1F]/80 border border-red-500/30 hover:bg-[#3D2A2A] text-red-400 font-medium py-2.5 px-2 rounded-lg flex items-center transition-colors text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Reset Form
              </motion.button>

              <div className="flex space-x-3">
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

                {activeTab === "contact" ? (
                  <motion.button
                    type="button"
                    onClick={handlePreview}
                    className="bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors shadow-lg shadow-purple-900/20"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isUpdate ? "Update Portfolio" : "Create Portfolio"}{" "}
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                ) : (
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
                )}
              </div>
            </div>

            {/* Reset Confirmation Dialog */}
            <Transition appear show={isResetDialogOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50"
                onClose={() => !isResetting && setIsResetDialogOpen(false)}
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
                  <div className="fixed inset-0 bg-black/70" />
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
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-gradient-to-b from-[#1A1D2E] to-[#171826] border border-[#2E313C] p-6 text-left align-middle shadow-xl transition-all">
                        {!isResetting && !resetSuccess ? (
                          <>
                            <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-red-900/30 border border-red-500/30 mb-4">
                              <AlertTriangle
                                className="h-8 w-8 text-red-500"
                                aria-hidden="true"
                              />
                            </div>
                            <Dialog.Title
                              as="h3"
                              className="text-xl font-semibold leading-6 text-white mb-2 text-center"
                            >
                              Reset Form Data
                            </Dialog.Title>
                            <div className="mt-3">
                              <p className="text-sm text-gray-400 text-center mb-4">
                                This will reset all form fields to their default
                                values. This action cannot be undone.
                              </p>
                              <div className="mt-6 flex justify-center space-x-4">
                                <motion.button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-[#2E313C] bg-[#262A3E] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2E313C]"
                                  onClick={() => setIsResetDialogOpen(false)}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Cancel
                                </motion.button>
                                <motion.button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-red-500/30 bg-red-900/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/50"
                                  onClick={resetForm}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Yes, Reset Form
                                </motion.button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            {isResetting ? (
                              <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-t-purple-500 border-r-purple-500 border-b-purple-500/30 border-l-purple-500/30 rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-300 text-lg">
                                  Resetting form data...
                                </p>
                              </div>
                            ) : (
                              <motion.div
                                className="flex flex-col items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-900/30 border border-green-500/30 mb-4">
                                  <Check
                                    className="h-8 w-8 text-green-500"
                                    aria-hidden="true"
                                  />
                                </div>
                                <p className="text-green-400 text-lg font-medium">
                                  Form reset successfully!
                                </p>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </form>
        </div>

        {/* Preview Modal */}
        <Transition appear show={isPreviewModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => {
              if (previewStatus !== "loading") {
                setIsPreviewModalOpen(false);
                setPreviewStatus("idle");
              }
            }}
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
              <div className="fixed inset-0 bg-black/70" />
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1D2E] to-[#171826] border border-[#2E313C] p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white mb-4 text-center"
                    >
                      {previewStatus === "loading" && "Creating Preview..."}
                      {previewStatus === "success" && "Preview Ready!"}
                      {previewStatus === "error" && "Preview Error"}
                    </Dialog.Title>

                    <div className="mt-4 flex flex-col items-center">
                      {/* Loading State */}
                      {previewStatus === "loading" && (
                        <>
                          <div className="mb-4">
                            <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
                          </div>
                          <p className="text-gray-300 text-center mb-2">
                            Please wait while we prepare your portfolio preview.
                          </p>
                          <div className="w-full bg-[#262A3E] h-1.5 rounded-full overflow-hidden mt-4">
                            <div
                              className="h-full bg-purple-500 animate-pulse"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                        </>
                      )}

                      {/* Success State */}
                      {previewStatus === "success" && (
                        <>
                          <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-green-900/30 border border-green-500/30 mb-4">
                            <Check
                              className="h-8 w-8 text-green-500"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="text-gray-300 text-center mb-6">
                            Your portfolio preview is ready. Click below to view
                            it!
                          </p>
                          <motion.button
                            type="button"
                            onClick={() => {
                              setIsPreviewModalOpen(false);
                              if (previewPortfolioId) {
                                // Get the stored custom URL
                                const customUrl = localStorage.getItem(
                                  "templateOneCustomUrl"
                                );
                                if (customUrl) {
                                  router.push(`/p/${customUrl}`);
                                } else {
                                  // Fallback to preview route if custom URL isn't available
                                  router.push(`/preview/${previewPortfolioId}`);
                                }
                              }
                            }}
                            className="bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors shadow-lg shadow-purple-900/20 w-full justify-center"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Portfolio{" "}
                            <ArrowRight size={18} className="ml-2" />
                          </motion.button>
                        </>
                      )}

                      {/* Error State */}
                      {previewStatus === "error" && (
                        <>
                          <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-900/30 border border-red-500/30 mb-4">
                            <AlertTriangle
                              className="h-8 w-8 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="text-gray-300 text-center mb-2">
                            {!useAuthStore.getState().isAuthenticated
                              ? "You need to be logged in to create a preview."
                              : "There was an error creating your preview."}
                          </p>
                          <p className="text-gray-400 text-center text-sm mb-6">
                            {!useAuthStore.getState().isAuthenticated
                              ? "Your form data has been saved. You'll be redirected to login."
                              : "Please try again or contact support if the issue persists."}
                          </p>

                          {!useAuthStore.getState().isAuthenticated ? (
                            <motion.button
                              type="button"
                              onClick={() => {
                                setIsPreviewModalOpen(false);
                                router.push(
                                  "/signin?returnTo=/allTemplates/templateOne/useTemplate"
                                );
                              }}
                              className="bg-gradient-to-r from-[#711381] to-purple-600 hover:from-[#5C0F6B] hover:to-purple-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors shadow-lg shadow-purple-900/20 w-full justify-center"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Log In <ArrowRight size={18} className="ml-2" />
                            </motion.button>
                          ) : (
                            <motion.button
                              type="button"
                              onClick={() => {
                                setIsPreviewModalOpen(false);
                                setPreviewStatus("idle");
                              }}
                              className="bg-[#1E2132] border border-[#2E313C] hover:bg-[#262A3E] text-gray-200 font-medium py-2.5 px-6 rounded-lg flex items-center justify-center transition-colors w-full"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Close
                            </motion.button>
                          )}
                        </>
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
