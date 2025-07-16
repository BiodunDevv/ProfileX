import React, { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Loader2, AlertTriangle, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

interface ImageUploaderProps {
  section: string;
  index?: number;
  currentImageUrl: string;
  label: string;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string,
    index?: number
  ) => Promise<void>;
  handleInputChange: (section: string, field: string, value: string) => void;
  handleNestedInputChange: (
    section: string,
    index: number,
    field: string | null,
    value: Record<string, unknown>
  ) => void;
  maxSize?: number; // Maximum file size in MB, defaults to 10MB
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  section,
  index,
  currentImageUrl,
  label,
  handleFileChange,
  handleInputChange,
  handleNestedInputChange,
  maxSize = 10, // 10MB default
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageInfo, setImageInfo] = useState<{
    width?: number;
    height?: number;
    type?: string;
    size?: string;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass =
    "w-full bg-[#1E2132] border border-[#2E313C] rounded-lg px-2 sm:px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-500 text-gray-200";
  const labelClass = "flex items-center text-gray-300 font-medium mb-2";

  // Effect to check image and reset states when URL changes
  useEffect(() => {
    if (currentImageUrl) {
      setIsImageLoading(true);
      setImageError(false);
      setErrorMessage("");

      const img = new Image();
      img.onload = () => {
        setIsImageLoading(false);
        setImageInfo({
          width: img.naturalWidth,
          height: img.naturalHeight,
          type: getImageTypeFromUrl(currentImageUrl),
          size: "Unknown", // Can't determine size from URL alone
        });
      };
      img.onerror = () => {
        setImageError(true);
        setErrorMessage("Failed to load image");
        setIsImageLoading(false);
      };
      img.src = currentImageUrl;
    } else {
      setImageInfo({});
    }
  }, [currentImageUrl]);

  // Helper function to get image type from URL
  const getImageTypeFromUrl = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase() || "";
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "JPEG";
      case "png":
        return "PNG";
      case "gif":
        return "GIF";
      case "webp":
        return "WebP";
      case "svg":
        return "SVG";
      default:
        return extension.toUpperCase();
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setErrorMessage(`File size exceeds ${maxSize}MB limit`);
        return;
      }

      // Simulate upload progress
      setIsUploading(true);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 200);

      try {
        await handleFileChange(e, section, index);
        setUploadProgress(100);

        // Get file information for preview
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            setImageInfo({
              width: img.naturalWidth,
              height: img.naturalHeight,
              type: file.type.split("/")[1].toUpperCase(),
              size: formatFileSize(file.size),
            });
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error in handleUpload:", error);
        setErrorMessage("Upload failed. Please try again.");
      } finally {
        clearInterval(progressInterval);
        setIsUploading(false);
      }
    },
    [handleFileChange, section, index, maxSize]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0 && fileInputRef.current) {
        const file = files[0];

        // Validate file type
        if (!file.type.startsWith("image/")) {
          setErrorMessage("Please upload an image file");
          return;
        }

        fileInputRef.current.files = files;
        const event = {
          target: { files },
          currentTarget: { files },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleUpload(event);
      }
    },
    [handleUpload]
  );

  const clearImage = () => {
    if (section === "hero") {
      handleInputChange("hero", "heroImage", "");
    } else if (section === "projects" && index !== undefined) {
      handleNestedInputChange("projects", index, null, {
        image: "",
      });
    }
    setIsExpanded(false);
  };

  const handleRetry = () => {
    setIsImageLoading(true);
    setImageError(false);
    setErrorMessage("");

    // Force image reload by adding a timestamp to the URL
    const timestamp = new Date().getTime();
    const urlWithTimestamp = `${currentImageUrl}${currentImageUrl.includes("?") ? "&" : "?"}_ts=${timestamp}`;

    const img = new Image();
    img.onload = () => {
      setIsImageLoading(false);
    };
    img.onerror = () => {
      setImageError(true);
      setErrorMessage("Failed to load image");
      setIsImageLoading(false);
    };
    img.src = urlWithTimestamp;
  };

  return (
    <div className="mb-6">
      <label className={labelClass}>
        <span>{label}</span>
        {currentImageUrl && imageInfo.width && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {imageInfo.width} × {imageInfo.height}
            </span>
          </div>
        )}
      </label>

      {/* Main drop area */}
      <div
        className={`flex flex-col relative ${
          isDragging
            ? "border-2 border-purple-500 border-dashed rounded-xl bg-purple-600/10"
            : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* URL Input with upload button */}
        <div className="group relative">
          <div className="flex mb-3">
            <div className="relative flex-1">
              <input
                type="text"
                className={`${inputClass} rounded-r-none ${
                  errorMessage
                    ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                    : ""
                }`}
                value={currentImageUrl}
                onChange={(e) => {
                  if (section === "hero") {
                    handleInputChange("hero", "heroImage", e.target.value);
                  } else if (section === "projects" && index !== undefined) {
                    handleNestedInputChange("projects", index, null, {
                      image: e.target.value,
                    });
                  }
                  // Reset states when URL changes manually
                  setIsImageLoading(true);
                  setImageError(false);
                  setErrorMessage("");
                }}
                placeholder="Enter image URL or drop an image file"
              />
              {currentImageUrl && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  onClick={clearImage}
                  title="Clear image"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="button"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 rounded-r-lg flex items-center border-0 transition-colors duration-200"
              onClick={triggerFileInput}
              disabled={isUploading}
              title="Upload image"
            >
              {isUploading ? (
                <Loader2 size={18} className="text-white animate-spin" />
              ) : (
                <Upload size={18} className="text-white" />
              )}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {/* Drag overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="mb-2"
              >
                <Upload size={36} className="text-purple-400" />
              </motion.div>
              <p className="text-white font-medium">Drop your image here</p>
              <p className="text-sm text-gray-300 mt-1">Release to upload</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2 mb-3 flex items-center text-sm text-red-200"
            >
              <AlertTriangle size={16} className="text-red-400 mr-2 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload progress bar */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span>Uploading image...</span>
                <span>{uploadProgress.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#2A2D3A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state / Drop area */}
        {!currentImageUrl && !isUploading && (
          <motion.div
            className="border-2 border-dashed border-[#2E313C] rounded-xl p-8 bg-[#1A1D2E]/40 cursor-pointer hover:border-purple-500/50 transition-colors flex flex-col items-center justify-center"
            onClick={triggerFileInput}
            whileHover={{
              scale: 1.005,
              borderColor: "rgba(147, 51, 234, 0.5)",
            }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.15 }}
          >
            <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Upload size={28} className="text-purple-400" />
              </motion.div>
            </div>
            <p className="text-gray-300 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500 mt-1 text-center max-w-xs">
              SVG, PNG, JPG, WebP or GIF (max. {maxSize}MB)
            </p>
          </motion.div>
        )}

        {/* Image preview area */}
        {currentImageUrl && (
          <motion.div
            className={`relative rounded-xl overflow-hidden border border-[#2E313C] bg-[#1A1D2E] ${
              isExpanded ? "h-auto" : "h-64"
            } transition-all duration-300 ease-in-out`}
            layout
            transition={{ duration: 0.3 }}
          >
            {!isImageLoading && !imageError && (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <NextImage
                  src={currentImageUrl}
                  alt="Preview"
                  width={500}
                  height={isExpanded ? 800 : 256}
                  className={`w-full ${isExpanded ? "" : "h-64"} object-contain bg-[#13151f]`}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setErrorMessage("Failed to load image");
                    setIsImageLoading(false);
                  }}
                />
              </motion.div>
            )}

            {/* Loading state */}
            {isImageLoading && (
              <div className="w-full h-64 bg-[#13151f] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 size={32} className="text-purple-400" />
                  </motion.div>
                  <p className="text-sm text-gray-400 mt-3">Loading image...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {imageError && (
              <div className="w-full h-64 bg-[#13151f] flex flex-col items-center justify-center p-4">
                <AlertTriangle size={32} className="text-amber-500 mb-2" />
                <p className="text-sm text-gray-400 text-center">
                  Failed to load image
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-[#2A2D3A] hover:bg-[#363A4B] rounded-lg text-sm text-gray-200 flex items-center transition-colors"
                    onClick={triggerFileInput}
                  >
                    <Upload size={14} className="mr-1.5" /> Upload new
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-[#2A2D3A] hover:bg-[#363A4B] rounded-lg text-sm text-gray-200 flex items-center transition-colors"
                    onClick={handleRetry}
                  >
                    <RefreshCw size={14} className="mr-1.5" /> Retry
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Image controls - Always visible when image exists */}
        {currentImageUrl && !isImageLoading && !imageError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-3 flex items-center justify-between gap-2 p-3 bg-[#1A1D2E] rounded-lg border border-[#2E313C]"
          >
            {/* Left side controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-[#2A2D3A] hover:bg-[#363A4B] text-gray-200 rounded-lg px-3 py-2 text-sm flex items-center transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Collapse" : "Expand"}
              </button>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-[#2A2D3A] hover:bg-[#363A4B] text-gray-200 rounded-lg px-3 py-2 text-sm flex items-center transition-colors"
                onClick={clearImage}
              >
                <X size={14} className="mr-1.5" /> Clear
              </button>

              <button
                type="button"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-3 py-2 text-sm flex items-center transition-colors"
                onClick={triggerFileInput}
              >
                <Upload size={14} className="mr-1.5" /> Change
              </button>
            </div>
          </motion.div>
        )}

        {/* Status/help text */}
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          {isUploading ? (
            <>
              <Loader2 size={12} className="animate-spin mr-1.5" /> Processing
              upload...
            </>
          ) : errorMessage ? (
            <span className="text-red-400 flex items-center">
              <AlertTriangle size={12} className="mr-1.5" /> {errorMessage}
            </span>
          ) : currentImageUrl ? (
            <span>
              {imageInfo.size ? `${imageInfo.size} • ` : ""}
              Image loaded successfully
            </span>
          ) : (
            "Supported formats: JPG, PNG, GIF, WebP and SVG"
          )}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
