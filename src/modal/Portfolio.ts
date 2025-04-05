import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolio extends Document {
  user: mongoose.Types.ObjectId | string;
  templateType: string; // Which template this portfolio uses (1-7)
  customUrl: string; // Custom shareable URL
  isPublic: boolean; // Whether the portfolio is public
  // ... other portfolio fields
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateType: {
      type: String,
      required: true,
      enum: [
        "template1",
        "template2",
        "template3",
        "template4",
        "template5",
        "template6",
        "template7",
      ],
    },
    customUrl: {
      type: String,
      unique: true,
      sparse: true, // Allow null values (for portfolios without custom URLs)
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9-]+$/,
        "Custom URL can only contain lowercase letters, numbers, and hyphens",
      ],
    },
    // Basic Information
    brandName: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, required: true }],
    heroImage: { type: String, required: true },

    // Companies you worked with
    companies: [{ type: String, required: true }],

    //About Section
    sectionAbout: { type: String, required: true },
    sectionSubtitle: { type: String, required: true },
    aboutMeDescription: { type: String, required: true },

    skills: [
      {
        name: { type: String, required: true },
        level: { type: Number, required: true, min: 1, max: 5 },
        color: { type: String, required: true },
        category: { type: String, required: false },
      },
    ],

    education: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        years: { type: String, required: true },
        description: { type: String, required: false },
      },
    ],

    //project
    project: [
      {
        projectName: { type: String, required: true },
        projectType: { type: String, required: true },
        typeColor: [{ type: String, required: true }],
        projectDescription: { type: String, required: true },
        projectImageURL: { type: String, required: true },
        imageUrl: { type: String, required: true },
        sourceCodeLink: { type: Date, required: true },
        liveDemoLinke: { type: Date, required: true },
      },
    ],

    // Projects
    projects: [
      {
        name: { type: String },
        description: { type: String },
        technologies: [{ type: String }],
        liveUrl: { type: String },
        repoUrl: { type: String },
        imageUrl: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        featured: { type: Boolean, default: false },
      },
    ],
    contactInfo: [
      {
        emailAddress: { type: String, required: true },
        phoneNumber: { type: String },
      },
    ],
    socialLinks: [
      {
        platform: { type: String, required: true },
        icon: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    // Meta information
    isPublic: { type: Boolean, default: false },
    theme: { type: String, default: "default" },
    customStyles: { type: Object },
    customDomain: { type: String },

    // System fields
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    content: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Ensure custom URLs are unique if provided
PortfolioSchema.index({ customUrl: 1 }, {
  unique: true,
  partialFilterExpression: { customUrl: { $type: "string" } },
});

// Allow users to have multiple portfolios
PortfolioSchema.index({ user: 1, templateType: 1 });

PortfolioSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);

export default Portfolio;
