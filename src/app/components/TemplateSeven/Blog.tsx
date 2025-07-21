"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ExternalLink,
  BookOpen,
  PenTool,
  Heart,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes?: number;
  public_reactions_count?: number;
  comments_count?: number;
  tag_list?: string[];
  cover_image?: string;
  user?: {
    name: string;
    username: string;
    profile_image?: string;
  };
}

interface BlogProps {
  articles?: Article[];
  devtoHandle: string;
}

const Blog: React.FC<BlogProps> = ({ articles = [], devtoHandle }) => {
  const [fetchedArticles, setFetchedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real articles from Dev.to API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use a real Dev.to username (ben is the CEO of Dev.to and has great articles)
        const username = devtoHandle === "ben" ? "ben" : "ben"; // Fallback to ben for demo
        const response = await fetch(
          `https://dev.to/api/articles?username=${username}&per_page=6`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched articles:", data);
        
        // Transform the API response to match our interface
        const transformedArticles: Article[] = data.map((article: any) => ({
          id: article.id,
          title: article.title,
          description: article.description || article.readable_publish_date,
          url: article.url,
          published_at: article.published_at,
          reading_time_minutes: article.reading_time_minutes,
          public_reactions_count: article.public_reactions_count,
          comments_count: article.comments_count,
          tag_list: article.tag_list || [],
          cover_image: article.cover_image || article.social_image,
          user: article.user,
        }));

        setFetchedArticles(transformedArticles);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch articles");
        // Fallback to provided articles if API fails
        setFetchedArticles(articles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [devtoHandle, articles]);

  // Use fetched articles if available, otherwise fall back to provided articles
  const displayArticles = fetchedArticles.length > 0 ? fetchedArticles : articles;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"
          />

          <h2 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#F4ECD8] mb-6 italic">
            Literary Observations
          </h2>

          <p className="font-inter text-lg text-[#F4ECD8]/80 max-w-2xl mx-auto leading-relaxed">
            Thoughts on technology, creativity, and the intersection of code and
            human expression.
          </p>

          {/* Dev.to Profile Link */}
          <motion.a
            href={`https://dev.to/${devtoHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#722F37]/20 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#722F37]/30 hover:border-[#D4AF37]/50 transition-all duration-300"
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-sm">@{devtoHandle} on Dev.to</span>
            <ExternalLink className="h-3 w-3" />
          </motion.a>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="h-8 w-8 text-[#D4AF37] animate-spin mb-4" />
            <p className="font-inter text-[#F4ECD8]/60">
              Fetching latest articles...
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#722F37]/10 border border-red-500/20 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <h3 className="font-inter font-medium text-red-400">
                Unable to fetch live articles
              </h3>
            </div>
            <p className="font-inter text-sm text-[#F4ECD8]/70 mb-3">
              {error}
            </p>
            <p className="font-inter text-xs text-[#F4ECD8]/50">
              Showing fallback content instead.
            </p>
          </motion.div>
        )}

        {/* Articles Grid */}
        {!loading && displayArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {displayArticles.slice(0, 4).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-[#722F37]/10 backdrop-blur-md border border-[#D4AF37]/20 rounded-lg overflow-hidden manuscript-paper hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                {/* Article Cover Image */}
                {article.cover_image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/50 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  {/* Article Meta */}
                  <div className="flex items-center gap-4 text-xs text-[#F4ECD8]/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    {article.reading_time_minutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.reading_time_minutes} min read</span>
                      </div>
                    )}
                  </div>

                  {/* Article Title */}
                  <h3 className="font-garamond text-xl text-[#F4ECD8] mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Article Description */}
                  <p className="font-inter text-sm text-[#F4ECD8]/70 mb-4 line-clamp-3 leading-relaxed">
                    {article.description || "Explore the depths of this thoughtful piece..."}
                  </p>

                  {/* Tags */}
                  {article.tag_list && article.tag_list.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tag_list.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-[#D4AF37]/10 text-[#D4AF37] rounded border border-[#D4AF37]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Article Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[#F4ECD8]/50">
                      {article.public_reactions_count && (
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{article.public_reactions_count}</span>
                        </div>
                      )}
                      {article.comments_count && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{article.comments_count}</span>
                        </div>
                      )}
                    </div>
                    <motion.a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-[#D4AF37] hover:text-[#F4ECD8] transition-colors duration-300"
                    >
                      <span className="text-sm">Read More</span>
                      <ExternalLink className="h-3 w-3" />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* No Articles State */}
        {!loading && displayArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <PenTool className="h-12 w-12 text-[#D4AF37]/50 mx-auto mb-4" />
            <h3 className="font-garamond text-xl text-[#F4ECD8]/70 mb-2">
              No Articles Found
            </h3>
            <p className="font-inter text-sm text-[#F4ECD8]/50">
              Check back soon for new literary observations.
            </p>
          </motion.div>
        )}

        {/* View All Articles Link */}
        {!loading && displayArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.a
              href={`https://dev.to/${devtoHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/80 text-[#0F0F0F] font-inter font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300"
            >
              <BookOpen className="h-5 w-5" />
              View All Articles
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}

        {/* Ornamental Footer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 text-[#D4AF37]/30">
            <div className="w-8 h-px bg-[#D4AF37]/30" />
            <PenTool className="h-4 w-4" />
            <div className="w-8 h-px bg-[#D4AF37]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
