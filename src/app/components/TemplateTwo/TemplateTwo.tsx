import React from 'react';

interface Template2Props {
  portfolioData: {
    hero: {
      DevName: string;
      title: string;
      description: string;
      heroImage: string;
      Companies: string[];
    };
    about: {
      title: string;
      subtitle: string;
      description: string;
      skills: Array<{
        name: string;
        level: number;
        color: string;
      }>;
      education: Array<{
        degree: string;
        institution: string;
        year: string;
        description: string;
      }>;
    };
    projects: Array<{
      id: number;
      type: string;
      typeColor: string;
      name: string;
      description: string;
      image: string;
      sourceLink?: string;
      demoLink?: string;
    }>;
    contact: {
      email: string;
      phone?: string;
      socialLinks: Array<{
        platform: string;
        icon: string;
        url: string;
      }>;
    };
  };
  isPublicView?: boolean;
}

const TemplateTwo: React.FC<Template2Props> = ({ portfolioData, isPublicView = false }) => {
  const { hero, about, projects, contact } = portfolioData;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{hero.title}</h1>
          {hero.DevName && (
            <p className="text-2xl text-purple-200 mb-6">{hero.DevName}</p>
          )}
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {hero.description}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-purple-400 text-2xl mb-2">📧</div>
                <p className="text-gray-300 mb-2">Email</p>
                <a href={`mailto:${contact.email}`} className="text-purple-400 hover:text-purple-300">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div className="p-4">
                  <div className="text-blue-400 text-2xl mb-2">📱</div>
                  <p className="text-gray-300 mb-2">Phone</p>
                  <p className="text-blue-400">{contact.phone}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {about.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Skills & Technologies</h2>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {about.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 text-center font-medium"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-colors">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">{project.name}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <div className="flex gap-4">
                    {project.sourceLink && (
                      <a
                        href={project.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
                      >
                        Source Code
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TemplateTwo;