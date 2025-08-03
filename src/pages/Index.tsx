import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Download, Plus, X, Github, Linkedin, Twitter, Globe, Mail, Instagram, 
  Facebook, Youtube, Upload, Palette, Monitor, Sun, Moon, Star, Calendar,
  MapPin, Building, GraduationCap, Award, FileText, User, Code2, 
  Briefcase, MessageSquare, BookOpen, ExternalLink, Play, Zap,
  Rocket, Sparkles, Expand, Container, Send,
  LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene3D } from '@/components/3d/Scene3D';
import JSZip from 'jszip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  images: string[];
  featured: boolean;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
}

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishDate: string;
  readTime: string;
}

interface PortfolioData {
  // Basic Info
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  profilePicture: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Professional
  socialLinks: SocialLink[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  
  // Additional
  languages: { name: string; proficiency: string }[];
  interests: string[];
  availability: string;
  timezone: string;
  contact: {
    enabled: boolean;
    formspreeEndpoint: string;
  };
}

type Theme = 'light' | 'dark' | 'modern' | 'glassmorphism';

const socialPlatforms = [
  { name: 'GitHub', icon: 'Github', placeholder: 'https://github.com/username' },
  { name: 'LinkedIn', icon: 'Linkedin', placeholder: 'https://linkedin.com/in/username' },
  { name: 'Twitter', icon: 'Twitter', placeholder: 'https://twitter.com/username' },
  { name: 'Website', icon: 'Globe', placeholder: 'https://yourwebsite.com' },
  { name: 'Email', icon: 'Mail', placeholder: 'your@email.com' },
  { name: 'Instagram', icon: 'Instagram', placeholder: 'https://instagram.com/username' },
  { name: 'Facebook', icon: 'Facebook', placeholder: 'https://facebook.com/username' },
  { name: 'YouTube', icon: 'Youtube', placeholder: 'https://youtube.com/c/username' },
];

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: LucideIcon } = {
    Github, Linkedin, Twitter, Globe, Mail, Instagram, Facebook, Youtube,
  };
  return icons[iconName] || Globe;
};

const Index = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [skillInput, setSkillInput] = useState('');
  const [activeSection, setActiveSection] = useState('basic');
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    // Basic Info
    name: 'Alex Johnson',
    title: 'Full-Stack Developer',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies.',
    location: 'San Francisco, CA',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    profilePicture: '',
    
    // Hero Section
    heroTitle: 'Building the Future, One Line of Code at a Time',
    heroSubtitle: 'Full-Stack Developer & Tech Innovator',
    heroDescription: 'I create beautiful, performant, and scalable web applications that solve real-world problems.',
    
    // Professional
    socialLinks: [
      { id: '1', platform: 'GitHub', url: 'https://github.com/alexjohnson', icon: 'Github' },
      { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/alexjohnson', icon: 'Linkedin' },
      { id: '3', platform: 'Twitter', url: 'https://twitter.com/alexjohnson', icon: 'Twitter' },
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB'],
    projects: [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        liveUrl: 'https://ecommerce-demo.com',
        githubUrl: 'https://github.com/alexjohnson/ecommerce',
        images: [],
        featured: true
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates and team features.',
        technologies: ['Vue.js', 'Express', 'Socket.io', 'MongoDB'],
        liveUrl: 'https://taskapp-demo.com',
        githubUrl: 'https://github.com/alexjohnson/taskapp',
        images: [],
        featured: false
      }
    ],
    experience: [
      {
        id: '1',
        company: 'TechCorp Inc.',
        position: 'Senior Full-Stack Developer',
        startDate: '2022-01',
        endDate: '',
        current: true,
        location: 'San Francisco, CA',
        description: 'Lead development of customer-facing web applications serving 1M+ users. Mentored junior developers and improved deployment processes.'
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Full-Stack Developer',
        startDate: '2020-03',
        endDate: '2021-12',
        current: false,
        location: 'Remote',
        description: 'Built MVP from scratch and scaled to support 100K+ users. Implemented CI/CD pipelines and testing frameworks.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        description: 'Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering.'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-06',
        credentialId: 'AWS-CSA-123456',
        url: 'https://aws.amazon.com/certification/'
      }
    ],
    testimonials: [
      {
        id: '1',
        name: 'Sarah Chen',
        position: 'Product Manager',
        company: 'TechCorp Inc.',
        content: 'Alex is an exceptional developer who consistently delivers high-quality code. Their ability to understand complex requirements and translate them into elegant solutions is remarkable.',
        avatar: '',
        rating: 5
      }
    ],
    blogPosts: [
      {
        id: '1',
        title: 'Building Scalable React Applications',
        excerpt: 'Learn the best practices for building React applications that can scale to millions of users.',
        url: 'https://blog.example.com/scalable-react',
        publishDate: '2023-12-01',
        readTime: '8 min read'
      }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Conversational' }
    ],
    interests: ['Open Source', 'Machine Learning', 'Photography', 'Rock Climbing'],
    availability: 'Available for freelance projects',
    timezone: 'PST (UTC-8)',
    contact: {
      enabled: true,
      formspreeEndpoint: 'https://formspree.io/f/your_form_id'
    }
  });

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'hero', label: 'Hero Section', icon: Rocket },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'blog', label: 'Blog Posts', icon: BookOpen },
    { id: 'contact', label: 'Contact Form', icon: Send },
  ];

  const handleInputChange = (field: keyof PortfolioData, value: PortfolioData[keyof PortfolioData]) => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'Website',
      url: '',
      icon: 'Globe'
    };
    handleInputChange('socialLinks', [...portfolioData.socialLinks, newLink]);
  };

  const updateSocialLink = (id: string, field: 'platform' | 'url', value: string) => {
    const updatedLinks = portfolioData.socialLinks.map(link => {
      if (link.id === id) {
        if (field === 'platform') {
          const platform = socialPlatforms.find(p => p.name === value);
          return { ...link, platform: value, icon: platform?.icon || 'Globe' };
        }
        return { ...link, [field]: value };
      }
      return link;
    });
    handleInputChange('socialLinks', updatedLinks);
  };

  const removeSocialLink = (id: string) => {
    const filteredLinks = portfolioData.socialLinks.filter(link => link.id !== id);
    handleInputChange('socialLinks', filteredLinks);
  };

  const addSkill = () => {
    if (skillInput.trim() && !portfolioData.skills.includes(skillInput.trim())) {
      handleInputChange('skills', [...portfolioData.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const filteredSkills = portfolioData.skills.filter(skill => skill !== skillToRemove);
    handleInputChange('skills', filteredSkills);
  };

  const handleSkillKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSkill();
    }
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
      images: [],
      featured: false
    };
    handleInputChange('projects', [...portfolioData.projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: Project[keyof Project]) => {
    const updatedProjects = portfolioData.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    handleInputChange('projects', updatedProjects);
  };

  const removeProject = (id: string) => {
    const filteredProjects = portfolioData.projects.filter(project => project.id !== id);
    handleInputChange('projects', filteredProjects);
  };

  const handleProjectImageUpload = (projectId: string, files: FileList | null) => {
    if (!files) return;
    const newImages: string[] = [];
    const promises = Array.from(files).map(file => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target?.result as string);
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(() => {
      const updatedProjects = portfolioData.projects.map(p => {
        if (p.id === projectId) {
          return { ...p, images: [...p.images, ...newImages] };
        }
        return p;
      });
      handleInputChange('projects', updatedProjects);
    });
  };

  const handleRemoveProjectImage = (projectId: string, imageIndex: number) => {
    const updatedProjects = portfolioData.projects.map(p => {
      if (p.id === projectId) {
        const updatedImages = p.images.filter((_, index) => index !== imageIndex);
        return { ...p, images: updatedImages };
      }
      return p;
    });
    handleInputChange('projects', updatedProjects);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: ''
    };
    handleInputChange('experience', [...portfolioData.experience, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: Experience[keyof Experience]) => {
    const updatedExperience = portfolioData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    handleInputChange('experience', updatedExperience);
  };

  const removeExperience = (id: string) => {
    const filteredExperience = portfolioData.experience.filter(exp => exp.id !== id);
    handleInputChange('experience', filteredExperience);
  };

  const generatePortfolioHTML = useCallback((data: PortfolioData, theme: Theme) => {
    const themeStyles = {
      light: {
        background: '#ffffff',
        text: '#1f2937',
        card: '#f9fafb',
        accent: '#8b5cf6',
        border: '#e5e7eb'
      },
      dark: {
        background: '#111827',
        text: '#f9fafb',
        card: '#1f2937',
        accent: '#8b5cf6',
        border: '#374151'
      },
      modern: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        text: '#ffffff',
        card: 'rgba(255, 255, 255, 0.1)',
        accent: '#fbbf24',
        border: 'rgba(255, 255, 255, 0.2)'
      }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - ${data.title}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">${data.name}</div>
            <div class="nav-links">
                <a href="#hero" class="nav-link">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#projects" class="nav-link">Projects</a>
                <a href="#experience" class="nav-link">Experience</a>
                <a href="#contact" class="nav-link">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero-section">
        <div class="hero-container">
            <div class="hero-content">
                <h1 class="hero-title">${data.heroTitle}</h1>
                <h2 class="hero-subtitle">${data.heroSubtitle}</h2>
                <p class="hero-description">${data.heroDescription}</p>
                <div class="hero-actions">
                    <a href="#projects" class="btn-primary">View My Work</a>
                    <a href="#contact" class="btn-secondary">Get In Touch</a>
                </div>
            </div>
            ${data.profilePicture ? `
            <div class="hero-image">
                <img src="data:image/jpeg;base64,${data.profilePicture.split(',')[1]}" alt="${data.name}" class="profile-image-hero">
            </div>
            ` : ''}
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p class="about-bio">${data.bio}</p>
                    <div class="about-details">
                        <div class="detail-item">
                            <strong>Location:</strong> ${data.location}
                        </div>
                        <div class="detail-item">
                            <strong>Email:</strong> ${data.email}
                        </div>
                        <div class="detail-item">
                            <strong>Availability:</strong> ${data.availability}
                        </div>
                    </div>
                </div>
                <div class="skills-section">
                    <h3>Skills & Technologies</h3>
                    <div class="skills-grid">
                        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
        <div class="container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="projects-grid">
                ${data.projects.map(project => `
                <div class="project-card ${project.featured ? 'featured' : ''}">
                    ${project.images && project.images.length > 0 ? `
                    <div class="project-image-gallery">
                        <div class="gallery-images">
                            ${project.images.map(image => `<img src="${image}" alt="${project.title} image" class="gallery-image">`).join('')}
                        </div>
                        ${project.images.length > 1 ? `
                        <button class="gallery-prev">&lt;</button>
                        <button class="gallery-next">&gt;</button>
                        ` : ''}
                    </div>
                    ` : ''}
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-links">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link" target="_blank">Live Demo</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank">GitHub</a>` : ''}
                        </div>
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="experience-section">
        <div class="container">
            <h2 class="section-title">Professional Experience</h2>
            <div class="timeline">
                ${data.experience.map(exp => `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">${exp.position}</h3>
                        <h4 class="timeline-subtitle">${exp.company} • ${exp.location}</h4>
                        <div class="timeline-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
                        <p class="timeline-description">${exp.description}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
        <div class="container">
            <h2 class="section-title">Let's Work Together</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-item">
                        <strong>Email:</strong> ${data.email}
                    </div>
                    ${data.phone ? `
                    <div class="contact-item">
                        <strong>Phone:</strong> ${data.phone}
                    </div>
                    ` : ''}
                    <div class="contact-item">
                        <strong>Location:</strong> ${data.location}
                    </div>
                </div>
                <div class="social-links">
                    ${data.socialLinks.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">
                        <span class="social-icon">${link.platform}</span>
                    </a>
                    `).join('')}
                </div>
            </div>
            ${data.contact.enabled && data.contact.formspreeEndpoint ? `
            <form id="contact-form" class="contact-form" action="${data.contact.formspreeEndpoint}" method="POST">
                <div class="form-group">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="_replyto" placeholder="Your Email" required>
                </div>
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" class="btn-primary">Send Message</button>
                <p id="form-status" class="form-status"></p>
            </form>
            ` : ''}
        </div>
    </section>

    <script src="scripts.js"></script>
</body>
</html>`;
  }, []);

  const generateCSS = useCallback((theme: Theme) => {
    const themeStyles = {
      light: {
        background: '#ffffff',
        text: '#1f2937',
        textLight: '#6b7280',
        card: '#f9fafb',
        accent: '#8b5cf6',
        border: '#e5e7eb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      dark: {
        background: '#111827',
        text: '#f9fafb',
        textLight: '#9ca3af',
        card: '#1f2937',
        accent: '#8b5cf6',
        border: '#374151',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
      },
      modern: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        text: '#ffffff',
        textLight: '#e5e7eb',
        card: 'rgba(255, 255, 255, 0.1)',
        accent: '#fbbf24',
        border: 'rgba(255, 255, 255, 0.2)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      },
      glassmorphism: {
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        text: '#ffffff',
        textLight: '#e5e7eb',
        card: 'rgba(255, 255, 255, 0.05)',
        accent: '#08f7fe',
        border: 'rgba(255, 255, 255, 0.15)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }
    };

    const styles = themeStyles[theme];

    return `/* Modern Developer Portfolio Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: ${styles.text};
    background: ${styles.background};
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Navigation */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: ${theme === 'modern' ? 'rgba(255, 255, 255, 0.1)' : styles.card};
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 1px solid ${styles.border};
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand {
    font-weight: 700;
    font-size: 1.5rem;
    color: ${styles.accent};
    font-family: 'Playfair Display', serif;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-link {
    color: ${styles.text};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: ${styles.accent};
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${styles.accent};
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

/* Hero Section */
.hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 6rem 2rem 2rem;
    position: relative;
    overflow: hidden;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4rem;
    align-items: center;
}

.hero-content {
    max-width: 600px;
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
    background: linear-gradient(135deg, ${styles.accent}, ${theme === 'modern' ? '#06b6d4' : '#06b6d4'});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${styles.accent};
    margin-bottom: 1.5rem;
}

.hero-description {
    font-size: 1.1rem;
    color: ${styles.textLight};
    margin-bottom: 2.5rem;
    line-height: 1.7;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
    padding: 0.875rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.btn-primary {
    background: ${styles.accent};
    color: ${theme === 'modern' ? '#000' : '#fff'};
    box-shadow: ${styles.shadow};
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.btn-secondary {
    background: transparent;
    color: ${styles.accent};
    border-color: ${styles.accent};
}

.btn-secondary:hover {
    background: ${styles.accent};
    color: ${theme === 'modern' ? '#000' : '#fff'};
    transform: translateY(-2px);
}

.hero-image {
    display: flex;
    justify-content: center;
}

.profile-image-hero {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${styles.accent};
    box-shadow: ${styles.shadow};
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

/* Sections */
.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: ${styles.accent};
    font-family: 'Playfair Display', serif;
}

.about-section, .projects-section, .experience-section, .contact-section {
    padding: 6rem 0;
}

.about-section {
    background: ${theme === 'modern' ? 'rgba(255, 255, 255, 0.05)' : styles.card};
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.about-bio {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    color: ${styles.textLight};
}

.about-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.detail-item {
    color: ${styles.textLight};
}

.detail-item strong {
    color: ${styles.text};
    margin-right: 0.5rem;
}

.skills-section h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: ${styles.accent};
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.skill-tag {
    background: ${styles.accent};
    color: ${theme === 'modern' ? '#000' : '#fff'};
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: transform 0.3s ease;
}

.skill-tag:hover {
    transform: translateY(-2px);
}

/* Projects */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-image-gallery {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    height: 200px;
}

.gallery-images {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex-shrink: 0;
}

.gallery-prev, .gallery-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.gallery-prev { left: 10px; }
.gallery-next { right: 10px; }

.project-card {
    background: ${styles.card};
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid ${styles.border};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    ${theme === 'glassmorphism' ? 'backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);' : ''}
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: ${styles.shadow};
}

.project-card.featured::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${styles.accent}, #06b6d4);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.project-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${styles.text};
    margin-bottom: 0.5rem;
}

.project-links {
    display: flex;
    gap: 0.5rem;
}

.project-link {
    color: ${styles.accent};
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border: 1px solid ${styles.accent};
    border-radius: 15px;
    transition: all 0.3s ease;
}

.project-link:hover {
    background: ${styles.accent};
    color: ${theme === 'modern' ? '#000' : '#fff'};
}

.project-description {
    color: ${styles.textLight};
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background: ${styles.border};
    color: ${styles.text};
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

/* Experience Timeline */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${styles.accent};
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
    padding-left: 4rem;
}

.timeline-marker {
    position: absolute;
    left: 22px;
    top: 0;
    width: 16px;
    height: 16px;
    background: ${styles.accent};
    border-radius: 50%;
    border: 4px solid ${styles.background};
}

.timeline-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${styles.text};
    margin-bottom: 0.25rem;
}

.timeline-subtitle {
    font-size: 1rem;
    font-weight: 500;
    color: ${styles.accent};
    margin-bottom: 0.5rem;
}

.timeline-date {
    font-size: 0.9rem;
    color: ${styles.textLight};
    margin-bottom: 1rem;
    font-weight: 500;
}

.timeline-description {
    color: ${styles.textLight};
    line-height: 1.6;
}

/* Contact */
.contact-content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

.contact-info {
    margin-bottom: 2rem;
}

.contact-item {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: ${styles.textLight};
}

.contact-item strong {
    color: ${styles.text};
    margin-right: 0.5rem;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: ${styles.accent};
    color: ${theme === 'modern' ? '#000' : '#fff'};
    border-radius: 50%;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: ${styles.shadow};
}

.social-link:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.social-icon {
    font-size: 0.9rem;
}

.contact-form {
    max-width: 700px;
    margin: 3rem auto 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    gap: 1.5rem;
}

.contact-form input, .contact-form textarea {
    width: 100%;
    padding: 1rem;
    background: ${styles.border};
    border: 1px solid ${styles.border};
    border-radius: 10px;
    color: ${styles.text};
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.contact-form input:focus, .contact-form textarea:focus {
    outline: none;
    border-color: ${styles.accent};
}

.contact-form input::placeholder, .contact-form textarea::placeholder {
    color: ${styles.textLight};
}

.contact-form button {
    align-self: center;
}

.form-status {
    text-align: center;
    margin-top: 1rem;
    font-weight: 500;
    min-height: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .hero-actions {
        justify-content: center;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .profile-image-hero {
        width: 250px;
        height: 250px;
    }
    
    .timeline::before {
        left: 15px;
    }
    
    .timeline-item {
        padding-left: 3rem;
    }
    
    .timeline-marker {
        left: 7px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 1rem;
    }
    
    .hero-section {
        padding: 4rem 1rem 2rem;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-subtitle {
        font-size: 1.2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .project-card {
        padding: 1.5rem;
    }
}`;
  }, []);

  const generateJS = useCallback(() => {
    return `document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .timeline-item, .skill-tag').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add click effects to interactive elements
    document.querySelectorAll('.btn-primary, .btn-secondary, .project-link, .social-link').forEach(element => {
        element.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = \`translateY(\${scrolled * 0.2}px)\`;
        }
    });

    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    console.log('🚀 Portfolio loaded successfully! Welcome to an amazing developer experience.');

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const form = e.target;
            const data = new FormData(form);
            const status = document.getElementById('form-status');
            status.innerHTML = 'Sending...';
            const bodyStyles = window.getComputedStyle(document.body);
            status.style.color = bodyStyles.color;

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "Thanks for your submission!";
                    status.style.color = 'green';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form";
                        }
                        status.style.color = 'red';
                    })
                }
            }).catch(error => {
                status.innerHTML = "Oops! There was a problem submitting your form";
                status.style.color = 'red';
            });
        });
    }

    document.querySelectorAll('.project-image-gallery').forEach(gallery => {
        const imagesContainer = gallery.querySelector('.gallery-images');
        if (!imagesContainer) return;
        const images = gallery.querySelectorAll('.gallery-image');
        const prevButton = gallery.querySelector('.gallery-prev');
        const nextButton = gallery.querySelector('.gallery-next');
        let currentIndex = 0;

        function showImage(index) {
            imagesContainer.style.transform = 'translateX(-' + (index * 100) + '%)';
        }

        if (prevButton && nextButton && images.length > 1) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                showImage(currentIndex);
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                showImage(currentIndex);
            });
        } else {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
        }
    });
});`;
  }, []);

  const downloadPortfolio = async () => {
    try {
      const zip = new JSZip();
      
      const html = generatePortfolioHTML(portfolioData, currentTheme);
      const css = generateCSS(currentTheme);
      const js = generateJS();
      
      zip.file('index.html', html);
      zip.file('styles.css', css);
      zip.file('scripts.js', js);
      
      const content = await zip.generateAsync({ type: 'blob' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${portfolioData.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Portfolio Downloaded! 🎉",
        description: "Your professional portfolio website has been packaged and downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error creating your portfolio. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getThemeClasses = (theme: Theme) => {
    switch (theme) {
      case 'light':
        return 'bg-white text-gray-900';
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'modern':
        return 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white';
      case 'glassmorphism':
        return 'bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const renderFormSection = () => {
    switch (activeSection) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={portfolioData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={portfolioData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Full-Stack Developer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={portfolioData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={portfolioData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={portfolioData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="autobio-transition"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                {portfolioData.profilePicture && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <img
                      src={portfolioData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Social Media Links</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSocialLink}
                  className="autobio-transition hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
                </Button>
              </div>
              <div className="space-y-3">
                {portfolioData.socialLinks.map((link) => (
                  <div key={link.id} className="flex gap-2">
                    <select
                      value={link.platform}
                      onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                      className="px-3 py-2 border rounded-md bg-background"
                    >
                      {socialPlatforms.map((platform) => (
                        <option key={platform.name} value={platform.name}>
                          {platform.name}
                        </option>
                      ))}
                    </select>
                    <Input
                      value={link.url}
                      onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                      placeholder={socialPlatforms.find(p => p.name === link.platform)?.placeholder || 'Enter URL'}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSocialLink(link.id)}
                      className="autobio-transition hover:scale-105 text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <Label>Skills & Technologies</Label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                  placeholder="Add a skill and press Enter"
                  className="flex-1"
                />
                <Button
                  onClick={addSkill}
                  variant="outline"
                  className="autobio-transition hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer autobio-transition hover:scale-105"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={portfolioData.heroTitle}
                onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                placeholder="Your compelling headline"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Input
                id="heroSubtitle"
                value={portfolioData.heroSubtitle}
                onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                placeholder="Your professional title or tagline"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroDescription">Hero Description</Label>
              <Textarea
                id="heroDescription"
                value={portfolioData.heroDescription}
                onChange={(e) => handleInputChange('heroDescription', e.target.value)}
                placeholder="A brief description of what you do"
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Projects</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addProject}
                className="autobio-transition hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Project
              </Button>
            </div>
            
            <div className="space-y-4">
              {portfolioData.projects.map((project, index) => (
                <Card key={project.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Project {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) => updateProject(project.id, 'featured', e.target.checked)}
                            className="rounded"
                          />
                          Featured
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeProject(project.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        placeholder="Project title"
                      />
                      <Input
                        value={project.liveUrl}
                        onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                        placeholder="Live demo URL"
                      />
                    </div>
                    
                    <Input
                      value={project.githubUrl}
                      onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                      placeholder="GitHub repository URL"
                    />
                    
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      placeholder="Project description"
                      rows={3}
                      className="resize-none"
                    />
                    
                    <Input
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', ').filter(Boolean))}
                      placeholder="Technologies used (comma-separated)"
                    />

                    <div>
                      <Label>Project Images</Label>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleProjectImageUpload(project.id, e.target.files)}
                        className="mt-1"
                      />
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {project.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img src={image} alt={`Project image ${index + 1}`} className="w-20 h-20 object-cover rounded-md border" />
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                              onClick={() => handleRemoveProjectImage(project.id, index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Work Experience</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addExperience}
                className="autobio-transition hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Experience
              </Button>
            </div>
            
            <div className="space-y-4">
              {portfolioData.experience.map((exp, index) => (
                <Card key={exp.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded"
                          />
                          Current Position
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        placeholder="Job title"
                      />
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Start date"
                      />
                      {!exp.current && (
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          placeholder="End date"
                        />
                      )}
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder="Location"
                      />
                    </div>
                    
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Job description and achievements"
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="contactEnabled" className="font-semibold">Enable Contact Form</Label>
                <p className="text-xs text-muted-foreground">
                  Adds a contact form to your portfolio.
                </p>
              </div>
              <Switch
                id="contactEnabled"
                checked={portfolioData.contact.enabled}
                onCheckedChange={(checked) => handleInputChange('contact', { ...portfolioData.contact, enabled: checked })}
              />
            </div>
            {portfolioData.contact.enabled && (
              <div className="space-y-2">
                <Label htmlFor="formspreeEndpoint">Formspree Endpoint</Label>
                <Input
                  id="formspreeEndpoint"
                  value={portfolioData.contact.formspreeEndpoint}
                  onChange={(e) => handleInputChange('contact', { ...portfolioData.contact, formspreeEndpoint: e.target.value })}
                  placeholder="https://formspree.io/f/your_form_id"
                />
                <p className="text-sm text-muted-foreground">
                  Get your endpoint from <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="underline text-primary">Formspree</a>.
                </p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Select a section from the sidebar to start editing</p>
          </div>
        );
    }
  };

  const PortfolioPreview = ({ isFullscreen = false }) => (
    <div className={`relative ${isFullscreen ? 'h-full' : 'min-h-[600px] max-h-[calc(100vh-200px)]'} overflow-y-auto rounded-lg ${getThemeClasses(currentTheme)} autobio-transition`}>
      {/* 3D Background */}
      <div className="absolute inset-0 h-64">
        <Scene3D theme={currentTheme} />
      </div>

      {/* Hero Section Preview */}
      <div className="relative z-10 p-8 text-center space-y-6">
        {/* Profile Picture */}
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {portfolioData.profilePicture ? (
            <img
              src={portfolioData.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-glow"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl opacity-50 border-4 border-primary">
              👤
            </div>
          )}
        </motion.div>

        {/* Hero Content */}
        <div className="space-y-4">
          <motion.h1
            className="text-3xl font-bold font-display text-primary"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {portfolioData.heroTitle}
          </motion.h1>

          <motion.h2
            className="text-xl font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {portfolioData.heroSubtitle}
          </motion.h2>

          <motion.p
            className="text-sm opacity-80 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {portfolioData.heroDescription}
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-center gap-3 flex-wrap"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button className="autobio-transition hover:scale-105">
            <Play className="w-4 h-4 mr-2" />
            View Work
          </Button>
          <Button variant="outline" className="autobio-transition hover:scale-105">
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </Button>
        </motion.div>
      </div>

      {/* About Section Preview */}
      <div className={`p-8 space-y-6 rounded-lg ${currentTheme === 'glassmorphism' ? 'bg-white/10 backdrop-blur-lg border border-white/20' : 'bg-background/50 backdrop-blur-sm'}`}>
        <h3 className="text-lg font-semibold text-primary">About Me</h3>
        <p className="text-sm opacity-80 leading-relaxed">
          {portfolioData.bio}
        </p>

        {/* Quick Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{portfolioData.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span>{portfolioData.email}</span>
          </div>
        </div>
      </div>

      {/* Skills Preview */}
      {portfolioData.skills.length > 0 && (
        <div className="p-8 space-y-4">
          <h3 className="text-lg font-semibold text-primary">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.slice(0, 8).map((skill, index) => (
              <motion.span
                key={skill}
                className="skill-tag autobio-transition"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
            {portfolioData.skills.length > 8 && (
              <span className="skill-tag opacity-60">
                +{portfolioData.skills.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}

                  {/* Contact Form Preview */}
                  {portfolioData.contact.enabled && (
                    <div className="p-8 space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Get In Touch</h3>
                      <div className="max-w-md mx-auto text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Input placeholder="Your Name" disabled className="bg-background/20 border-border" />
                          <Input placeholder="Your Email" type="email" disabled className="bg-background/20 border-border" />
                        </div>
                        <Textarea placeholder="Your Message" disabled className="bg-background/20 border-border mb-4" />
                        <Button className="w-full" disabled>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  )}

      {/* Projects Preview */}
      {portfolioData.projects.length > 0 && (
        <div className="p-8 space-y-4">
          <h3 className="text-lg font-semibold text-primary">Featured Projects</h3>
          <div className="space-y-4">
            {portfolioData.projects.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                            className={`rounded-lg p-4 ${currentTheme === 'glassmorphism' ? 'bg-white/10 backdrop-blur-lg border border-white/20' : 'bg-background/50 backdrop-blur-sm border border-border'}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                                {project.images && project.images.length > 0 && (
                                  <Carousel className="w-full rounded-lg overflow-hidden mb-4">
                                    <CarouselContent>
                                      {project.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                          <img src={image} alt={`Project image ${index + 1}`} className="w-full h-40 object-cover" />
                                        </CarouselItem>
                                      ))}
                                    </CarouselContent>
                                    {project.images.length > 1 && (
                                      <>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                      </>
                                    )}
                                  </Carousel>
                                )}
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{project.title || 'Project Title'}</h4>
                  {project.featured && (
                    <Star className="w-4 h-4 text-primary fill-current" />
                  )}
                </div>
                <p className="text-sm opacity-70 mb-3">
                  {project.description || 'Project description goes here...'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {portfolioData.socialLinks.length > 0 && (
        <div className="p-8 space-y-4">
          <h3 className="text-lg font-semibold text-primary">Connect With Me</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {portfolioData.socialLinks.map((link, index) => {
              const IconComponent = getIconComponent(link.icon);
              return (
                <motion.div
                  key={link.id}
                  className="social-icon autobio-transition hover:scale-110"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-background/80 backdrop-blur-lg border-b sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
                  AutoBio Pro
                </h1>
                <p className="text-sm text-muted-foreground">
                  Professional Developer Portfolio Builder
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant={currentTheme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTheme('light')}
                  className="autobio-transition"
                >
                  <Sun className="w-4 h-4" />
                </Button>
                <Button
                  variant={currentTheme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTheme('dark')}
                  className="autobio-transition"
                >
                  <Moon className="w-4 h-4" />
                </Button>
                <Button
                  variant={currentTheme === 'modern' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTheme('modern')}
                  className="autobio-transition"
                >
                  <Palette className="w-4 h-4" />
                </Button>
                <Button
                  variant={currentTheme === 'glassmorphism' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTheme('glassmorphism')}
                  className="autobio-transition"
                >
                  <Container className="w-4 h-4" />
                </Button>
              </div>
              
              <Button 
                onClick={downloadPortfolio} 
                className="autobio-transition hover:scale-105 bg-gradient-primary hover:shadow-glow"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Portfolio
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="autobio-transition hover:shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Builder Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? 'default' : 'ghost'}
                        className="w-full justify-start autobio-transition"
                        onClick={() => setActiveSection(section.id)}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {section.label}
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <Card className="autobio-transition hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {sections.find(s => s.id === activeSection)?.label || 'Portfolio Editor'}
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderFormSection()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <Card className="autobio-transition hover:shadow-lg sticky top-24">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  Live Preview
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Expand className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-full h-screen w-full p-0 border-0">
                    <PortfolioPreview isFullscreen={true} />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-0">
                <PortfolioPreview />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;