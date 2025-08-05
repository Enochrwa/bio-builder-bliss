import { useState, useRef, useCallback, useEffect } from 'react';
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
  Rocket, Sparkles, Expand, Container, Send, Menu, Home, FolderOpen,
  ChevronRight, ArrowRight, CheckCircle, Eye, LucideIcon
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
  { name: 'YouTube', icon: 'Youtube', placeholder: 'https://youtube.com/@username' }
];

const iconMap: Record<string, LucideIcon> = {
  Github, Linkedin, Twitter, Globe, Mail, Instagram, Facebook, Youtube
};

const themes = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'modern', name: 'Modern', icon: Star },
  { id: 'glassmorphism', name: 'Glass', icon: Sparkles }
];

// Navigation items for the portfolio
const navigationSections = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export default function Index() {
  const { toast } = useToast();
  const [currentTheme, setCurrentTheme] = useState<Theme>('modern');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: 'Alex Thompson',
    title: 'Full-Stack Developer & UI/UX Designer',
    bio: 'Passionate developer with 5+ years of experience building modern web applications. I love creating beautiful, functional user experiences.',
    location: 'San Francisco, CA',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 123-4567',
    profilePicture: '',
    heroTitle: 'Building Digital Experiences',
    heroSubtitle: 'Full-Stack Developer & Creative Problem Solver',
    heroDescription: 'I craft modern web applications with cutting-edge technologies, focusing on performance, user experience, and scalable solutions.',
    socialLinks: [
      { id: '1', platform: 'GitHub', url: 'https://github.com/alexthompson', icon: 'Github' },
      { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/alexthompson', icon: 'Linkedin' },
      { id: '3', platform: 'Twitter', url: 'https://twitter.com/alexthompson', icon: 'Twitter' },
      { id: '4', platform: 'Website', url: 'https://alexthompson.dev', icon: 'Globe' }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'Redux', 'Next.js', 'Tailwind CSS', 'MongoDB'],
    projects: [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform built with React, Node.js, and Stripe integration. Features include real-time inventory, advanced search, and admin dashboard.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
        liveUrl: 'https://demo-store.vercel.app',
        githubUrl: 'https://github.com/alexthompson/ecommerce',
        images: [],
        featured: true
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration, and advanced filtering capabilities.',
        technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
        liveUrl: 'https://taskflow-demo.netlify.app',
        githubUrl: 'https://github.com/alexthompson/taskflow',
        images: [],
        featured: true
      },
      {
        id: '3',
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
        technologies: ['Vue.js', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
        liveUrl: 'https://weather-hub.surge.sh',
        githubUrl: 'https://github.com/alexthompson/weather-dashboard',
        images: [],
        featured: false
      }
    ],
    experience: [
      {
        id: '1',
        company: 'TechFlow Inc.',
        position: 'Senior Full-Stack Developer',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Lead development of scalable web applications serving 100k+ users. Mentored junior developers and established best practices for code quality and deployment.',
        location: 'San Francisco, CA'
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        description: 'Built responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.',
        location: 'Remote'
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
        description: 'Focused on software engineering, data structures, and algorithms. Graduated Magna Cum Laude.'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-03',
        credentialId: 'AWS-ASA-2023-001',
        url: 'https://aws.amazon.com/certification/'
      },
      {
        id: '2',
        name: 'Google Cloud Professional Developer',
        issuer: 'Google Cloud',
        date: '2022-11',
        credentialId: 'GCP-PD-2022-001',
        url: 'https://cloud.google.com/certification/'
      }
    ],
    testimonials: [
      {
        id: '1',
        name: 'Sarah Johnson',
        position: 'Product Manager',
        company: 'TechFlow Inc.',
        content: 'Alex is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills are outstanding.',
        avatar: '',
        rating: 5
      },
      {
        id: '2',
        name: 'Mike Chen',
        position: 'CTO',
        company: 'StartupXYZ',
        content: 'Working with Alex was a pleasure. He brought fresh ideas and modern development practices that significantly improved our product.',
        avatar: '',
        rating: 5
      }
    ],
    blogPosts: [
      {
        id: '1',
        title: 'Building Scalable React Applications',
        excerpt: 'Learn best practices for structuring large-scale React applications with TypeScript and modern tooling.',
        url: 'https://blog.alexthompson.dev/scalable-react',
        publishDate: '2024-01-15',
        readTime: '8 min'
      },
      {
        id: '2',
        title: 'Modern CSS Techniques for 2024',
        excerpt: 'Explore the latest CSS features including container queries, cascade layers, and new color functions.',
        url: 'https://blog.alexthompson.dev/modern-css-2024',
        publishDate: '2024-01-08',
        readTime: '6 min'
      }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Conversational' },
      { name: 'French', proficiency: 'Beginner' }
    ],
    interests: ['Photography', 'Rock Climbing', 'Open Source', 'AI/ML', 'Travel'],
    availability: 'Available for new opportunities',
    timezone: 'PST (UTC-8)',
    contact: {
      enabled: true,
      formspreeEndpoint: 'https://formspree.io/f/your-form-id'
    }
  });

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.map(section => section.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(`preview-${sectionId}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const previewContainer = document.querySelector('.portfolio-preview');
    const element = previewContainer?.querySelector(`#preview-${sectionId}`);
    if (element && previewContainer) {
      const elementPosition = (element as HTMLElement).offsetTop;
      previewContainer.scrollTo({
        top: elementPosition - 80, // Account for sticky navigation
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const getThemeClasses = (theme: Theme) => {
    switch (theme) {
      case 'light':
        return 'bg-background text-foreground';
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'modern':
        return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white';
      case 'glassmorphism':
        return 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white';
      default:
        return 'bg-background text-foreground';
    }
  };

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'GitHub',
      url: '',
      icon: 'Github'
    };
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink]
    }));
  };

  const removeSocialLink = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !portfolioData.skills.includes(newSkill.trim())) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPortfolioData(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePortfolioFiles = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      // Generate HTML
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name} - Portfolio</title>
    <link href="styles.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="theme-${currentTheme}">
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <span>${portfolioData.name}</span>
            </div>
            <div class="nav-menu" id="nav-menu">
                ${navigationSections.map(section => `
                    <a href="#${section.id}" class="nav-link" data-section="${section.id}">
                        <i class="fas fa-${getIconClass(section.icon)}"></i>
                        <span>${section.label}</span>
                    </a>
                `).join('')}
            </div>
            <div class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-container">
            <div class="hero-content">
                ${portfolioData.profilePicture ? `
                    <div class="hero-image">
                        <img src="${portfolioData.profilePicture}" alt="${portfolioData.name}" />
                    </div>
                ` : ''}
                <h1 class="hero-title">${portfolioData.heroTitle}</h1>
                <p class="hero-subtitle">${portfolioData.heroSubtitle}</p>
                <p class="hero-description">${portfolioData.heroDescription}</p>
                <div class="hero-cta">
                    <a href="#projects" class="btn btn-primary">View My Work</a>
                    <a href="#contact" class="btn btn-secondary">Get In Touch</a>
                </div>
                <div class="hero-social">
                    ${portfolioData.socialLinks.map(link => `
                        <a href="${link.url}" target="_blank" class="social-link">
                            <i class="fab fa-${getSocialIcon(link.platform)}"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>${portfolioData.bio}</p>
                    <div class="about-info">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${portfolioData.location}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-envelope"></i>
                            <span>${portfolioData.email}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>${portfolioData.availability}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="experience">
        <div class="container">
            <h2 class="section-title">Experience</h2>
            <div class="timeline">
                ${portfolioData.experience.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <h3>${exp.position}</h3>
                            <h4>${exp.company}</h4>
                            <p class="timeline-date">${exp.startDate} - ${exp.endDate}</p>
                            <p class="timeline-location">${exp.location}</p>
                            <p class="timeline-description">${exp.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="projects-grid">
                ${portfolioData.projects.filter(p => p.featured).map(project => `
                    <div class="project-card">
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tech">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                <a href="${project.liveUrl}" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                                <a href="${project.githubUrl}" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i> Code
                                </a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills">
        <div class="container">
            <h2 class="section-title">Skills & Technologies</h2>
            <div class="skills-grid">
                ${portfolioData.skills.map(skill => `
                    <div class="skill-item">${skill}</div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="education">
        <div class="container">
            <h2 class="section-title">Education & Certifications</h2>
            <div class="education-content">
                <div class="education-list">
                    ${portfolioData.education.map(edu => `
                        <div class="education-item">
                            <h3>${edu.degree} in ${edu.field}</h3>
                            <h4>${edu.institution}</h4>
                            <p class="education-date">${edu.startDate} - ${edu.endDate}</p>
                            <p>${edu.description}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="certifications-list">
                    ${portfolioData.certifications.map(cert => `
                        <div class="certification-item">
                            <h3>${cert.name}</h3>
                            <p>${cert.issuer} • ${cert.date}</p>
                            <a href="${cert.url}" target="_blank">View Certificate</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2 class="section-title">What People Say</h2>
            <div class="testimonials-grid">
                ${portfolioData.testimonials.map(testimonial => `
                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <div class="testimonial-stars">
                                ${Array.from({length: testimonial.rating}, () => '<i class="fas fa-star"></i>').join('')}
                            </div>
                            <p>"${testimonial.content}"</p>
                            <div class="testimonial-author">
                                <strong>${testimonial.name}</strong>
                                <span>${testimonial.position} at ${testimonial.company}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section id="blog" class="blog">
        <div class="container">
            <h2 class="section-title">Latest Blog Posts</h2>
            <div class="blog-grid">
                ${portfolioData.blogPosts.map(post => `
                    <article class="blog-card">
                        <h3>${post.title}</h3>
                        <p>${post.excerpt}</p>
                        <div class="blog-meta">
                            <span>${post.publishDate}</span>
                            <span>${post.readTime} read</span>
                        </div>
                        <a href="${post.url}" target="_blank" class="blog-link">Read More</a>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Let's Work Together</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <p>I'm always interested in new opportunities and exciting projects.</p>
                    <div class="contact-methods">
                        <a href="mailto:${portfolioData.email}" class="contact-method">
                            <i class="fas fa-envelope"></i>
                            <span>${portfolioData.email}</span>
                        </a>
                        ${portfolioData.phone ? `
                            <a href="tel:${portfolioData.phone}" class="contact-method">
                                <i class="fas fa-phone"></i>
                                <span>${portfolioData.phone}</span>
                            </a>
                        ` : ''}
                        <div class="contact-method">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${portfolioData.location}</span>
                        </div>
                    </div>
                </div>
                <form class="contact-form" action="${portfolioData.contact.formspreeEndpoint}" method="POST">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="subject" placeholder="Subject" required>
                    </div>
                    <div class="form-group">
                        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>&copy; ${new Date().getFullYear()} ${portfolioData.name}. All rights reserved.</p>
                <div class="footer-social">
                    ${portfolioData.socialLinks.map(link => `
                        <a href="${link.url}" target="_blank">
                            <i class="fab fa-${getSocialIcon(link.platform)}"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    </footer>

    <script src="scripts.js"></script>
</body>
</html>`;

      // Generate CSS with current theme
      const css = generateCSS(currentTheme);
      
      // Generate JavaScript
      const js = generateJS();

      // Create ZIP file
      const zip = new JSZip();
      zip.file('index.html', html);
      zip.file('styles.css', css);
      zip.file('scripts.js', js);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${portfolioData.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "Portfolio downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [portfolioData, currentTheme, toast]);

  // Helper functions for HTML generation
  const getIconClass = (icon: LucideIcon) => {
    const iconMap: Record<string, string> = {
      Home: 'home',
      User: 'user',
      Briefcase: 'briefcase',
      FolderOpen: 'folder-open',
      Code2: 'code',
      GraduationCap: 'graduation-cap',
      MessageSquare: 'comments',
      BookOpen: 'book-open',
      Mail: 'envelope'
    };
    return iconMap[icon.name] || 'circle';
  };

  const getSocialIcon = (platform: string) => {
    const iconMap: Record<string, string> = {
      GitHub: 'github',
      LinkedIn: 'linkedin',
      Twitter: 'twitter',
      Website: 'globe',
      Email: 'envelope',
      Instagram: 'instagram',
      Facebook: 'facebook',
      YouTube: 'youtube'
    };
    return iconMap[platform] || 'link';
  };

  const generateCSS = (theme: Theme) => {
    return `/* Portfolio Styles */
:root {
    --primary-color: ${theme === 'light' ? '#3b82f6' : theme === 'dark' ? '#60a5fa' : theme === 'modern' ? '#8b5cf6' : '#00d4ff'};
    --secondary-color: ${theme === 'light' ? '#64748b' : theme === 'dark' ? '#94a3b8' : theme === 'modern' ? '#06b6d4' : '#ff006e'};
    --background-color: ${theme === 'light' ? '#ffffff' : theme === 'dark' ? '#0f172a' : theme === 'modern' ? '#1e1b4b' : 'rgba(255, 255, 255, 0.1)'};
    --text-color: ${theme === 'light' ? '#1f2937' : theme === 'dark' ? '#f8fafc' : theme === 'modern' ? '#ffffff' : '#ffffff'};
    --card-background: ${theme === 'light' ? '#f8fafc' : theme === 'dark' ? '#1e293b' : theme === 'modern' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
    --border-color: ${theme === 'light' ? '#e5e7eb' : theme === 'dark' ? '#374151' : theme === 'modern' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: ${theme === 'glassmorphism' 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : theme === 'modern' 
        ? 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #1e1b4b 100%)'
        : 'var(--background-color)'
    };
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
    width: 100%;
    background: ${theme === 'glassmorphism' ? 'rgba(255, 255, 255, 0.1)' : 'var(--card-background)'};
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
    background: var(--primary-color);
    color: white;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.nav-toggle span {
    width: 25px;
    height: 3px;
    background: var(--text-color);
    margin: 3px 0;
    transition: 0.3s;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 70px;
    position: relative;
    overflow: hidden;
}

.hero-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.hero-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 2rem;
    border: 4px solid var(--primary-color);
}

.hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    opacity: 0.9;
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
}

.btn {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary {
    background: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
    background: transparent;
    color: var(--text-color);
    border: 2px solid var(--border-color);
}

.btn-secondary:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.hero-social {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.social-link {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--card-background);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
}

.social-link:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-3px);
}

/* Sections */
section {
    padding: 5rem 0;
}

.section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--primary-color);
    border-radius: 2px;
}

/* About Section */
.about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.about-text {
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.about-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--secondary-color);
}

/* Experience Timeline */
.timeline {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary-color);
    transform: translateX(-50%);
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
}

.timeline-content {
    background: var(--card-background);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    position: relative;
    width: calc(50% - 30px);
}

.timeline-item:nth-child(even) .timeline-content {
    margin-left: auto;
}

.timeline-content h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.timeline-date {
    color: var(--secondary-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-card {
    background: var(--card-background);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-content {
    padding: 2rem;
}

.project-content h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.tech-tag {
    background: var(--primary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.project-link:hover {
    opacity: 0.8;
}

/* Skills Grid */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
}

.skill-item {
    background: var(--card-background);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.skill-item:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

/* Education & Certifications */
.education-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
}

.education-item,
.certification-item {
    background: var(--card-background);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    margin-bottom: 2rem;
}

.education-item h3,
.certification-item h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

/* Testimonials */
.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.testimonial-card {
    background: var(--card-background);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    text-align: center;
}

.testimonial-stars {
    color: #fbbf24;
    margin-bottom: 1rem;
}

.testimonial-author {
    margin-top: 1rem;
}

.testimonial-author strong {
    display: block;
    color: var(--primary-color);
}

/* Blog Grid */
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.blog-card {
    background: var(--card-background);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.blog-card:hover {
    transform: translateY(-3px);
}

.blog-card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.blog-meta {
    display: flex;
    gap: 1rem;
    color: var(--secondary-color);
    font-size: 0.875rem;
    margin: 1rem 0;
}

.blog-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
}

/* Contact Section */
.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
}

.contact-methods {
    margin-top: 2rem;
}

.contact-method {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    color: var(--text-color);
    text-decoration: none;
}

.contact-form {
    background: var(--card-background);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--background-color);
    color: var(--text-color);
    font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

/* Footer */
.footer {
    background: var(--card-background);
    border-top: 1px solid var(--border-color);
    padding: 2rem 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-social {
    display: flex;
    gap: 1rem;
}

.footer-social a {
    color: var(--text-color);
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.footer-social a:hover {
    color: var(--primary-color);
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: var(--card-background);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-toggle {
        display: flex;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-cta {
        flex-direction: column;
        align-items: center;
    }

    .timeline::before {
        left: 20px;
    }

    .timeline-content {
        width: calc(100% - 50px);
        margin-left: 50px !important;
    }

    .education-content,
    .contact-content {
        grid-template-columns: 1fr;
    }

    .about-info {
        flex-direction: column;
        align-items: center;
    }
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-content > * {
    animation: fadeInUp 0.8s ease-out forwards;
}

.hero-content > *:nth-child(1) { animation-delay: 0.1s; }
.hero-content > *:nth-child(2) { animation-delay: 0.2s; }
.hero-content > *:nth-child(3) { animation-delay: 0.3s; }
.hero-content > *:nth-child(4) { animation-delay: 0.4s; }
.hero-content > *:nth-child(5) { animation-delay: 0.5s; }

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--background-color);
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
}`;
  };

  const generateJS = () => {
    return `// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Active navigation highlight
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', updateActiveNav);

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form will be handled by Formspree
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.project-card, .testimonial-card, .blog-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing effect for hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = \`translateY(\${rate}px)\`;
        }
    });

    // Dark mode toggle (if needed)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('theme-dark');
            localStorage.setItem('theme', document.body.classList.contains('theme-dark') ? 'dark' : 'light');
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('theme-dark', savedTheme === 'dark');
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'var(--card-background)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });
    }
});`;
  };

  // Portfolio Preview Component with Navigation
  const PortfolioPreview = ({ isFullscreen = false }) => (
    <div className={`relative ${isFullscreen ? 'h-full' : 'min-h-[600px] max-h-[calc(100vh-200px)]'} overflow-y-auto rounded-lg ${getThemeClasses(currentTheme)} autobio-transition`}>
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-primary">
              {portfolioData.name}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-3 py-3 border-t border-border"
              >
                <div className="grid grid-cols-2 gap-2">
                  {navigationSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="preview-hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 h-full">
          <Scene3D theme={currentTheme} />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {portfolioData.profilePicture && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
              >
                <img 
                  src={portfolioData.profilePicture} 
                  alt={portfolioData.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              {portfolioData.heroTitle}
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-4 text-muted-foreground"
            >
              {portfolioData.heroSubtitle}
            </motion.p>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto"
            >
              {portfolioData.heroDescription}
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button onClick={() => scrollToSection('projects')} size="lg" className="group">
                <Eye className="w-5 h-5 mr-2" />
                View My Work
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" size="lg">
                <Send className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex justify-center space-x-4"
            >
              {portfolioData.socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="preview-about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {portfolioData.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm">{portfolioData.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm">{portfolioData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">{portfolioData.availability}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm">{portfolioData.timezone}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Languages</h3>
                <div className="space-y-2">
                  {portfolioData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{lang.name}</span>
                      <Badge variant="secondary">{lang.proficiency}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.interests.map((interest, index) => (
                    <Badge key={index} variant="outline">{interest}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="preview-experience" className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-8 border-l-2 border-primary/20 last:border-l-0"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary">{exp.position}</h3>
                      <h4 className="text-lg font-medium">{exp.company}</h4>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="preview-projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.filter(p => p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary group-hover:text-primary/80 transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                      <Button asChild variant="outline" size="sm">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="preview-skills" className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {portfolioData.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm font-medium bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="preview-education" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Education & Certifications</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-primary" />
                Education
              </h3>
              <div className="space-y-6">
                {portfolioData.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <h4 className="text-lg font-semibold text-primary">{edu.degree} in {edu.field}</h4>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground mb-2">{edu.startDate} - {edu.endDate}</p>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-primary" />
                Certifications
              </h3>
              <div className="space-y-6">
                {portfolioData.certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <h4 className="text-lg font-semibold text-primary">{cert.name}</h4>
                      <p className="font-medium">{cert.issuer}</p>
                      <p className="text-sm text-muted-foreground mb-2">{cert.date}</p>
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex items-center"
                      >
                        View Certificate <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="preview-testimonials" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What People Say</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    {testimonial.avatar && (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="preview-blog" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Latest Blog Posts</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary mb-3 hover:text-primary/80 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{post.publishDate}</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium flex items-center"
                  >
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="preview-contact" className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
                <p className="text-muted-foreground mb-6">
                  I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together!
                </p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${portfolioData.email}`}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>{portfolioData.email}</span>
                </a>
                {portfolioData.phone && (
                  <a 
                    href={`tel:${portfolioData.phone}`}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{portfolioData.phone}</span>
                  </a>
                )}
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{portfolioData.location}</span>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                {portfolioData.socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Project discussion" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell me about your project..." 
                      rows={5}
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {portfolioData.socialLinks.slice(0, 4).map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            AutoBio - Developer Portfolio Builder
          </h1>
          <p className="text-muted-foreground">Create your professional portfolio in minutes with beautiful themes and modern animations</p>
        </div>

        {/* Theme Selector & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-primary" />
            <span className="font-medium">Theme:</span>
            <div className="flex space-x-2">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <Button
                    key={theme.id}
                    variant={currentTheme === theme.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentTheme(theme.id as Theme)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{theme.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Expand className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl h-[90vh] p-0">
                <PortfolioPreview isFullscreen={true} />
              </DialogContent>
            </Dialog>
            
            <Button 
              onClick={generatePortfolioFiles}
              disabled={isGenerating}
              className="flex items-center space-x-2"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isGenerating ? 'Generating...' : 'Download Portfolio'}</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={portfolioData.name}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Alex Thompson"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={portfolioData.title}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Full-Stack Developer"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={portfolioData.bio}
                    onChange={(e) => setPortfolioData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={portfolioData.email}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="alex@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={portfolioData.location}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="profile-picture">Profile Picture</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="flex-1"
                    />
                    {portfolioData.profilePicture && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                        <img 
                          src={portfolioData.profilePicture} 
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Hero Section</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Hero Title</Label>
                  <Input
                    id="hero-title"
                    value={portfolioData.heroTitle}
                    onChange={(e) => setPortfolioData(prev => ({ ...prev, heroTitle: e.target.value }))}
                    placeholder="Building Digital Experiences"
                  />
                </div>
                
                <div>
                  <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                  <Input
                    id="hero-subtitle"
                    value={portfolioData.heroSubtitle}
                    onChange={(e) => setPortfolioData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    placeholder="Full-Stack Developer & Creative Problem Solver"
                  />
                </div>
                
                <div>
                  <Label htmlFor="hero-description">Hero Description</Label>
                  <Textarea
                    id="hero-description"
                    value={portfolioData.heroDescription}
                    onChange={(e) => setPortfolioData(prev => ({ ...prev, heroDescription: e.target.value }))}
                    placeholder="Describe your passion and expertise..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Social Links</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <div key={link.id} className="flex items-center space-x-2">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <select
                        value={link.platform}
                        onChange={(e) => {
                          const platform = socialPlatforms.find(p => p.name === e.target.value);
                          updateSocialLink(link.id, 'platform', e.target.value);
                          updateSocialLink(link.id, 'icon', platform?.icon || 'Globe');
                        }}
                        className="px-3 py-2 border border-border rounded-md bg-background"
                      >
                        {socialPlatforms.map(platform => (
                          <option key={platform.name} value={platform.name}>
                            {platform.name}
                          </option>
                        ))}
                      </select>
                      <Input
                        value={link.url}
                        onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                        placeholder={socialPlatforms.find(p => p.name === link.platform)?.placeholder}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSocialLink(link.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
                <Button
                  variant="outline"
                  onClick={addSocialLink}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Social Link
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code2 className="w-5 h-5" />
                  <span>Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6">
            <Card className="h-[calc(100vh-120px)]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="w-5 h-5" />
                  <span>Live Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full portfolio-preview overflow-auto">
                <PortfolioPreview />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}