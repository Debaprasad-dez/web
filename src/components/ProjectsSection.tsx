
import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Code, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from '../providers/ThemeProvider';

// Project data
const projects = [
  {
    id: 1,
    title: 'Flight Local (B2B Travel Solution)',
    category: 'Web Development',
    description: 'A modern e-commerce platform built with React, Next.js, and Stripe integration for seamless payment processing.',
    longDescription: 'This comprehensive e-commerce solution features advanced product filtering, real-time inventory management, seamless payment processing with Stripe, and a headless CMS integration. The platform includes user authentication, personalized recommendations, and a responsive design optimized for all devices.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&fit=crop',
    tags: ['React', 'Next.js', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    title: 'AI Lab Granada',
    category: 'Web Development',
    description: 'A comprehensive admin dashboard with advanced data visualization, user management, and real-time analytics.',
    longDescription: 'This feature-rich admin dashboard provides a powerful interface for business analytics and management. It includes customizable widgets, interactive charts, role-based access control, and real-time data updates. The dashboard is built with performance in mind, using efficient data fetching patterns and optimized rendering.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&fit=crop',
    tags: ['React', 'TypeScript', 'Redux', 'Chart.js'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    title: 'Khora – Urban Thinkers Company',
    category: 'Web Development',
    description: 'A secure and intuitive mobile banking application with biometric authentication and transaction tracking.',
    longDescription: 'This mobile banking application prioritizes security and user experience, featuring biometric authentication, real-time transaction notifications, and comprehensive financial management tools. Users can manage accounts, transfer funds, pay bills, and analyze spending habits through intuitive visualizations. The app includes dark mode support and accessibility features.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&fit=crop',
    tags: ['React Native', 'Firebase', 'Jest', 'Styled Components'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 4,
    title: 'Tryotel – Cross-Platform Travel App',
    category: 'App Development',
    description: 'An AI-powered content generation tool that helps marketers create engaging articles and social media posts.',
    longDescription: 'This innovative AI tool leverages advanced language models to generate high-quality marketing content across various formats. Features include tone customization, SEO optimization, multi-language support, and integration with popular CMS platforms. The application includes a user-friendly editor with real-time suggestions and a collaborative workspace for teams.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&fit=crop',
    tags: ['React Native', 'Flutter', 'Firebase', 'AWS'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 5,
    title: 'Tapy – Download. Connect. Pay.',
    category: 'Web Development',
    description: 'A comprehensive fitness application that tracks workouts, nutrition, and provides personalized coaching.',
    longDescription: 'This all-in-one fitness platform helps users achieve their health goals through personalized workout plans, nutrition tracking, and progress visualization. The app features workout libraries with video demonstrations, customizable meal plans, integration with fitness wearables, and social challenges to boost motivation. The platform adapts to user preferences and progress over time.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&fit=crop',
    tags: ['React', 'Firebase', 'TensorFlow.js', 'PWA'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 6,
    title: 'Real-time Collaboration Tool',
    category: 'Web Development',
    description: 'A collaborative workspace that allows teams to work together on documents and projects in real-time.',
    longDescription: 'This powerful collaboration tool enables seamless teamwork through real-time document editing, task management, and integrated communication channels. The platform includes version history, access controls, commenting features, and integrations with popular productivity tools. Performance optimizations ensure a smooth experience even with many concurrent users.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&fit=crop',
    tags: ['WebSockets', 'React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    codeUrl: '#',
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  // Open project modal
  const openProjectModal = (projectId: number) => {
    setSelectedProject(projectId);
    setModalVisible(true);
  };

  // Handle carousel scroll on mobile
  const scrollToNext = () => {
    if (scrollContainerRef.current && currentProjectIndex < projects.length - 1) {
      setCurrentProjectIndex(prev => prev + 1);
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current && currentProjectIndex > 0) {
      setCurrentProjectIndex(prev => prev - 1);
    }
  };

  // Scroll to current project when index changes
  useEffect(() => {
    if (scrollContainerRef.current && isMobile) {
      const cardWidth = scrollContainerRef.current.scrollWidth / projects.length;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * currentProjectIndex,
        behavior: 'smooth'
      });
    }
  }, [currentProjectIndex, isMobile]);
  
  return (
    <section id="projects" className={`py-20 relative ${theme === 'light' ? 'bg-white' : 'bg-portfolio-black'}`}>
      <div className="container mx-auto px-12 md:px-20">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 flex items-center space-x-3 ${theme === 'light' ? 'text-portfolio-gunmetal' : 'text-portfolio-almond'}`}>
          <span className="w-8 h-[2px] bg-modern-primary"></span>
          <span>Featured Projects</span>
        </h2>
        
        <p className={`${theme === 'light' ? 'text-portfolio-gunmetal/80' : 'text-portfolio-almond/80'} mb-12 max-w-2xl`}>
          A showcase of my best work, featuring responsive, user-friendly applications built with modern technologies.
        </p>
        
        {/* Mobile Carousel Navigation */}
        {isMobile && (
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={scrollToPrev}
              disabled={currentProjectIndex === 0}
              className={`p-2 rounded-full ${
                currentProjectIndex === 0 
                  ? 'text-portfolio-gunmetal/30 dark:text-portfolio-almond/30' 
                  : 'text-portfolio-gunmetal dark:text-portfolio-almond hover:bg-portfolio-gunmetal/10 dark:hover:bg-portfolio-almond/10'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <span 
                  key={index} 
                  className={`block w-2 h-2 rounded-full ${
                    currentProjectIndex === index 
                      ? 'bg-portfolio-khaki' 
                      : 'bg-portfolio-gunmetal/20 dark:bg-portfolio-almond/20'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={scrollToNext}
              disabled={currentProjectIndex === projects.length - 1}
              className={`p-2 rounded-full ${
                currentProjectIndex === projects.length - 1 
                  ? 'text-portfolio-gunmetal/30 dark:text-portfolio-almond/30' 
                  : 'text-portfolio-gunmetal dark:text-portfolio-almond hover:bg-portfolio-gunmetal/10 dark:hover:bg-portfolio-almond/10'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
        
        {/* Projects Grid with unequal sizes */}
        <div 
          ref={scrollContainerRef}
          className={`${isMobile ? 'flex overflow-x-auto snap-x snap-mandatory scrollbar-none' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}
        >
          {projects.map((project, index) => {
            // Create unequal card sizes
            const isLarge = index % 3 === 0;
            const isMedium = index % 3 === 1;
            const isSmall = index % 3 === 2;
            
            return (
              <motion.div 
                key={project.id}
                className={`${isMobile ? 'flex-shrink-0 w-full snap-center mr-6 last:mr-0' : 
                  isLarge ? 'row-span-2 col-span-1' : 
                  isMedium ? 'col-span-1' : 
                  isSmall ? 'col-span-1' : ''} 
                  flex flex-col overflow-hidden h-full`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Project Card */}
                <div className="flex-1 flex flex-col overflow-hidden group relative">
                  {/* Project Image */}
                  <div className="relative overflow-hidden bg-portfolio-gunmetal dark:bg-portfolio-walnut aspect-[4/3] cursor-pointer">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onClick={() => openProjectModal(project.id)}
                    />
                    
                    {/* Buttons on hover (desktop) or always visible (mobile) */}
                    <div className={`absolute inset-0 bg-portfolio-black/60 flex items-center justify-center gap-4 transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <motion.a 
                        href={project.liveUrl} 
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-portfolio-khaki text-portfolio-black rounded-lg hover:bg-portfolio-almond transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </motion.a>
                      <motion.a 
                        href={project.codeUrl} 
                        className="flex items-center justify-center space-x-2 px-4 py-2 border border-portfolio-almond/30 text-portfolio-almond rounded-lg hover:bg-portfolio-walnut/20 transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <Code className="w-4 h-4" />
                        <span>Code</span>
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Project Title and Category */}
                  <div className="mt-4">
                    <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-portfolio-gunmetal' : 'text-portfolio-almond'}`}>{project.title}</h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-portfolio-gunmetal/60' : 'text-portfolio-almond/60'}`}>{project.category}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {modalVisible && selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-modern-depth/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`${theme === 'light' ? 'bg-white' : 'bg-portfolio-black'} rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border ${theme === 'light' ? 'border-portfolio-gunmetal/20' : 'border-portfolio-walnut/50'}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {projects.find(p => p.id === selectedProject) && (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-portfolio-gunmetal' : 'text-portfolio-almond'}`}>
                      {projects.find(p => p.id === selectedProject)?.title}
                    </h3>
                    <button 
                      className={`p-1 ${theme === 'light' ? 'hover:bg-portfolio-gunmetal/10' : 'hover:bg-portfolio-walnut/20'} rounded-full transition-colors`}
                      onClick={() => setModalVisible(false)}
                    >
                      <X className={`w-6 h-6 ${theme === 'light' ? 'text-portfolio-gunmetal' : 'text-portfolio-almond'}`} />
                    </button>
                  </div>
                  
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={projects.find(p => p.id === selectedProject)?.image} 
                      alt={projects.find(p => p.id === selectedProject)?.title}
                      className="w-full object-cover h-64"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-portfolio-gunmetal' : 'text-portfolio-almond'}`}>Project Overview</h4>
                    <p className={`${theme === 'light' ? 'text-portfolio-gunmetal/80' : 'text-portfolio-almond/80'}`}>
                      {projects.find(p => p.id === selectedProject)?.longDescription}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-portfolio-gunmetal' : 'text-portfolio-almond'}`}>Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects.find(p => p.id === selectedProject)?.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className={`text-sm px-3 py-1 rounded-full ${theme === 'light' ? 'bg-portfolio-gunmetal/10 text-portfolio-gunmetal border border-portfolio-gunmetal/30' : 'bg-portfolio-walnut/30 text-portfolio-almond border border-portfolio-walnut/50'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={projects.find(p => p.id === selectedProject)?.liveUrl} 
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-portfolio-khaki text-portfolio-black rounded-lg hover:bg-portfolio-almond transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a 
                      href={projects.find(p => p.id === selectedProject)?.codeUrl} 
                      className={`flex items-center justify-center space-x-2 px-4 py-2 ${theme === 'light' ? 'border border-portfolio-gunmetal/30 text-portfolio-gunmetal hover:bg-portfolio-gunmetal/10' : 'border border-portfolio-almond/30 text-portfolio-almond hover:bg-portfolio-walnut/20'} rounded-lg transition-colors`}
                    >
                      <Code className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
