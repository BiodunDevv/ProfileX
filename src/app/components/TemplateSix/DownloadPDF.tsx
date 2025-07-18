"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadPDFProps {
  data: any;
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      // Create a temporary container for PDF generation
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      tempContainer.style.width = "210mm"; // A4 width
      tempContainer.style.backgroundColor = "#F8F6F3";
      tempContainer.style.fontFamily = "Inter, sans-serif";
      document.body.appendChild(tempContainer);

      // Create PDF-optimized resume content
      tempContainer.innerHTML = `
        <div style="padding: 20mm; color: #1C1B1A; line-height: 1.5;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #A6785C; padding-bottom: 20px;">
            <h1 style="font-family: 'DM Serif Display', serif; font-size: 32px; color: #A6785C; margin: 0 0 10px 0;">${data.personal.name}</h1>
            <h2 style="font-size: 18px; color: #57534E; margin: 0 0 15px 0; font-weight: 500;">${data.personal.title}</h2>
            <div style="font-size: 14px; color: #57534E;">
              <span>${data.personal.email}</span> • 
              <span>${data.personal.phone || ""}</span> • 
              <span>${data.personal.location}</span>
              ${data.personal.website ? ` • <span>${data.personal.website}</span>` : ""}
            </div>
          </div>

          <!-- Summary -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-family: 'DM Serif Display', serif; font-size: 18px; color: #A6785C; margin: 0 0 10px 0; border-bottom: 1px solid #DDD6CE; padding-bottom: 5px;">Professional Summary</h3>
            <p style="margin: 0; color: #57534E; line-height: 1.6;">${data.personal.summary}</p>
          </div>

          <!-- Experience -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-family: 'DM Serif Display', serif; font-size: 18px; color: #A6785C; margin: 0 0 15px 0; border-bottom: 1px solid #DDD6CE; padding-bottom: 5px;">Professional Experience</h3>
            ${data.experience
              .map(
                (exp: any) => `
              <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <h4 style="font-size: 16px; font-weight: 600; margin: 0; color: #1C1B1A;">${exp.role}</h4>
                    <p style="font-size: 14px; color: #A6785C; margin: 2px 0 0 0; font-weight: 500;">${exp.company}</p>
                  </div>
                  <div style="text-align: right; font-size: 12px; color: #57534E;">
                    <div>${exp.duration}</div>
                    <div>${exp.location}</div>
                  </div>
                </div>
                <p style="margin: 8px 0; color: #57534E; font-size: 13px; line-height: 1.5;">${exp.summary}</p>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #57534E; font-size: 12px;">
                  ${exp.achievements.map((achievement: string) => `<li style="margin-bottom: 3px;">${achievement}</li>`).join("")}
                </ul>
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Education -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-family: 'DM Serif Display', serif; font-size: 18px; color: #A6785C; margin: 0 0 15px 0; border-bottom: 1px solid #DDD6CE; padding-bottom: 5px;">Education</h3>
            ${data.education
              .map(
                (edu: any) => `
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h4 style="font-size: 14px; font-weight: 600; margin: 0; color: #1C1B1A;">${edu.degree}</h4>
                    <p style="font-size: 13px; color: #A6785C; margin: 2px 0 0 0;">${edu.institution}</p>
                    ${edu.honors ? `<p style="font-size: 11px; color: #57534E; margin: 2px 0 0 0;">Honors: ${edu.honors.join(", ")}</p>` : ""}
                  </div>
                  <div style="text-align: right; font-size: 12px; color: #57534E;">
                    <div>${edu.duration}</div>
                    ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ""}
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Skills -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-family: 'DM Serif Display', serif; font-size: 18px; color: #A6785C; margin: 0 0 15px 0; border-bottom: 1px solid #DDD6CE; padding-bottom: 5px;">Core Skills</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <h4 style="font-size: 13px; font-weight: 600; color: #1C1B1A; margin: 0 0 5px 0;">Core Competencies</h4>
                <p style="font-size: 11px; color: #57534E; margin: 0; line-height: 1.4;">${data.skills.core.join(" • ")}</p>
              </div>
              <div>
                <h4 style="font-size: 13px; font-weight: 600; color: #1C1B1A; margin: 0 0 5px 0;">Technical Skills</h4>
                <p style="font-size: 11px; color: #57534E; margin: 0; line-height: 1.4;">${data.skills.technical.join(" • ")}</p>
              </div>
              <div>
                <h4 style="font-size: 13px; font-weight: 600; color: #1C1B1A; margin: 0 0 5px 0;">Tools & Software</h4>
                <p style="font-size: 11px; color: #57534E; margin: 0; line-height: 1.4;">${data.skills.tools.join(" • ")}</p>
              </div>
              <div>
                <h4 style="font-size: 13px; font-weight: 600; color: #1C1B1A; margin: 0 0 5px 0;">Languages</h4>
                <p style="font-size: 11px; color: #57534E; margin: 0; line-height: 1.4;">${data.skills.languages.join(" • ")}</p>
              </div>
            </div>
          </div>

          <!-- Projects -->
          ${
            data.projects.length > 0
              ? `
          <div style="margin-bottom: 25px;">
            <h3 style="font-family: 'DM Serif Display', serif; font-size: 18px; color: #A6785C; margin: 0 0 15px 0; border-bottom: 1px solid #DDD6CE; padding-bottom: 5px;">Key Projects</h3>
            ${data.projects
              .filter((project: any) => project.featured)
              .slice(0, 3)
              .map(
                (project: any) => `
              <div style="margin-bottom: 12px;">
                <h4 style="font-size: 14px; font-weight: 600; margin: 0; color: #1C1B1A;">${project.title}</h4>
                <p style="font-size: 11px; color: #57534E; margin: 2px 0 5px 0; line-height: 1.4;">${project.description}</p>
                <p style="font-size: 10px; color: #A6785C; margin: 0;"><strong>Technologies:</strong> ${project.technologies.join(", ")}</p>
              </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }

          <!-- Certifications -->
          ${
            data.certifications.length > 0
              ? `
          <div style="margin-bottom: 20px;">
            <h3 style="font-family: 'DM Serif Display', serif; font-size: 18px; color: #A6785C; margin: 0 0 15px 0; border-bottom: 1px solid #DDD6CE; padding-bottom: 5px;">Certifications</h3>
            ${data.certifications
              .map(
                (cert: any) => `
              <div style="margin-bottom: 8px; display: flex; justify-content: space-between;">
                <div>
                  <span style="font-size: 12px; font-weight: 500; color: #1C1B1A;">${cert.name}</span>
                  <span style="font-size: 11px; color: #A6785C;"> - ${cert.issuer}</span>
                </div>
                <span style="font-size: 11px; color: #57534E;">${cert.date}</span>
              </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }
        </div>
      `;

      // Wait for fonts and styling to load
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate canvas from the temp container
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#F8F6F3",
        width: tempContainer.scrollWidth,
        height: tempContainer.scrollHeight,
      });

      // Remove temp container
      document.body.removeChild(tempContainer);

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      pdf.save(`${data.personal.name.replace(/\s+/g, "_")}_Resume.pdf`);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Fixed Download Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 right-6 z-40 print:hidden"
      >
        <motion.button
          onClick={handleDownload}
          disabled={isGenerating}
          whileHover={{ scale: isGenerating ? 1 : 1.05 }}
          whileTap={{ scale: isGenerating ? 1 : 0.95 }}
          className={`
            group relative px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 text-white text-sm font-medium
            transition-all duration-300 min-w-[120px] justify-center
            ${
              isGenerating
                ? "bg-[#57534E] cursor-not-allowed"
                : "bg-[#A6785C] hover:bg-[#1C1B1A] hover:shadow-xl"
            }
          `}
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download PDF</span>
            </>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Download complete resume as PDF
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </motion.button>
      </motion.div>

      {/* Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "100%" }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: "100%" }}
          className="fixed bottom-24 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg print:hidden max-w-xs"
        >
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="text-sm font-medium">
                PDF Downloaded Successfully!
              </div>
              <div className="text-xs opacity-90 mt-1">
                Resume saved as {data.personal.name.replace(/\s+/g, "_")}
                _Resume.pdf
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Print Styles - Hidden by default, shown when printing */}
      <style jsx global>{`
        @media print {
          /* Hide navigation and interactive elements */
          nav,
          .print\\:hidden {
            display: none !important;
          }

          /* Ensure proper page breaks */
          .print-section {
            page-break-after: always;
            page-break-inside: avoid;
          }

          .print-section:last-child {
            page-break-after: auto;
          }

          /* Optimize colors for print */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Set page margins */
          @page {
            margin: 0.75in;
            size: letter;
          }

          /* Ensure readable font sizes */
          body {
            font-size: 12pt;
            line-height: 1.4;
          }

          h1 {
            font-size: 24pt;
          }
          h2 {
            font-size: 20pt;
          }
          h3 {
            font-size: 16pt;
          }
          h4 {
            font-size: 14pt;
          }

          /* Simplify backgrounds for print */
          .bg-gradient-to-br,
          .bg-gradient-to-r {
            background: #f8f6f3 !important;
          }

          /* Ensure borders print */
          .border {
            border: 1px solid #ddd6ce !important;
          }

          /* Optimize shadows for print */
          .shadow-sm,
          .shadow-md,
          .shadow-lg,
          .shadow-xl,
          .shadow-2xl {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          }
        }
      `}</style>

      {/* PDF Preview Modal - Would be implemented with actual PDF generation */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center print:hidden"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-md mx-4 text-center"
          >
            <div className="mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-[#A6785C] border-t-transparent rounded-full mx-auto"
              />
            </div>
            <h3 className="font-['DM_Serif_Display'] text-xl text-[#1C1B1A] mb-2">
              Generating PDF Resume
            </h3>
            <p className="text-[#57534E]">
              Please wait while we prepare your professional resume for
              download...
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default DownloadPDF;
