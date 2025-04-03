import React from "react";
import Image from "next/image";
import Link from "next/link";
import TemplateOnePreview from "../../../../public/TemplateOnePreveiw.png";
import TemplateTwoPreview from "../../../../public/TemplateTwoPreview.png";
import TemplateThreePreview from "../../../../public/TemplateThreePreview.png";
import TemplateFourPreview from "../../../../public/TemplateFourPreview.png";


const templatePreviews = [
  {
    id: "modern-pro",
    imageUrl: TemplateOnePreview,
    title: "Modern Pro",
    description: "Clean & Professional",
    Template: 'TemplateOne',
  },
  {
    id: "minimalist",
    imageUrl: TemplateTwoPreview,
    title: "Minimalist",
    description: "Simple & Elegant",
    Template: 'TemplateTwo',
  },
  {
    id: "creative-portfolio",
    imageUrl: TemplateThreePreview,
    title: "Creative Portfolio",
    description: "Bold & Innovative",
    Template: 'TemplateThree',
  },
  {
    id: "tech-resume",
    imageUrl: TemplateFourPreview,
    title: "Tech Resume",
    description: "Digital & Dynamic",
    Template: 'TemplateFour',
  },
];

const Template = () => {
  return (
    <>
      {/* Templates Section */}
      <section className="relative z-10 px-2 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
              Professional Templates
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose from a wide range of professionally designed templates that
              can be fully customized.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {templatePreviews.map((template, index) => (
              <Link
                key={index}
                href={`/templatedisplay?id=${template.id}&title=${template.title}&path=${template.Template}`}
                className="bg-[#2E313C] rounded-lg overflow-hidden hover:scale-105 transition-transform block"
              >
                <Image
                  src={template.imageUrl}
                  alt={`Template ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{template.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {template.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/templates"
              className="bg-gradient-to-r from-[#711381] to-purple-600 px-6 py-3 rounded-lg hover:from-[#5C0F6B] hover:to-purple-700 transition-all"
            >
              View All Templates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Template;
