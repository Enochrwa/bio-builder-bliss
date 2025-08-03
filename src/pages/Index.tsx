import { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, Plus, X, Github, Linkedin, Twitter, Globe, Mail, Instagram, Facebook, Youtube, Upload, Palette, Monitor, Sun, Moon } from 'lucide-react';
import JSZip from 'jszip';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface PortfolioData {
  name: string;
  bio: string;
  profilePicture: string;
  socialLinks: SocialLink[];
  skills: string[];
}

type Theme = 'light' | 'dark' | 'modern';

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
  const icons: { [key: string]: any } = {
    Github,
    Linkedin,
    Twitter,
    Globe,
    Mail,
    Instagram,
    Facebook,
    Youtube,
  };
  return icons[iconName] || Globe;
};

const Index = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [skillInput, setSkillInput] = useState('');
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: 'John Doe',
    bio: 'Full-stack developer passionate about creating beautiful and functional web applications. I love turning ideas into reality through code.',
    profilePicture: '',
    socialLinks: [
      { id: '1', platform: 'GitHub', url: 'https://github.com/johndoe', icon: 'Github' },
      { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'Linkedin' },
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design'],
  });

  const handleInputChange = (field: keyof PortfolioData, value: any) => {
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

    const currentThemeStyles = themeStyles[theme];

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="portfolio-container">
        <div class="portfolio-header">
            ${data.profilePicture ? `<img src="data:image/jpeg;base64,${data.profilePicture.split(',')[1]}" alt="Profile" class="profile-image">` : `<div class="profile-placeholder"></div>`}
            <h1 class="name">${data.name}</h1>
            <p class="bio">${data.bio}</p>
        </div>
        
        <div class="social-links">
            ${data.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">
                    <span class="social-icon">${link.platform}</span>
                </a>
            `).join('')}
        </div>
        
        <div class="skills-section">
            <h2>Skills</h2>
            <div class="skills-container">
                ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    </div>
    <script src="scripts.js"></script>
</body>
</html>`;
  }, []);

  const generateCSS = useCallback((theme: Theme) => {
    const themeStyles = {
      light: {
        background: '#ffffff',
        text: '#1f2937',
        card: '#f9fafb',
        accent: '#8b5cf6',
        border: '#e5e7eb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      dark: {
        background: '#111827',
        text: '#f9fafb',
        card: '#1f2937',
        accent: '#8b5cf6',
        border: '#374151',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
      },
      modern: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        text: '#ffffff',
        card: 'rgba(255, 255, 255, 0.1)',
        accent: '#fbbf24',
        border: 'rgba(255, 255, 255, 0.2)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }
    };

    const styles = themeStyles[theme];

    return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: ${styles.text};
    background: ${styles.background};
    min-height: 100vh;
    padding: 2rem;
}

.portfolio-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem;
    background: ${styles.card};
    border-radius: 20px;
    box-shadow: ${styles.shadow};
    ${theme === 'modern' ? 'backdrop-filter: blur(10px);' : ''}
    border: 1px solid ${styles.border};
}

.portfolio-header {
    text-align: center;
    margin-bottom: 3rem;
}

.profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${styles.accent};
    margin-bottom: 1.5rem;
    box-shadow: ${styles.shadow};
}

.profile-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: ${styles.border};
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: ${styles.text};
    opacity: 0.5;
}

.profile-placeholder::before {
    content: "👤";
}

.name {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${styles.accent};
}

.bio {
    font-size: 1.1rem;
    color: ${styles.text};
    opacity: 0.8;
    max-width: 600px;
    margin: 0 auto;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
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
    font-size: 0.8rem;
}

.skills-section h2 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: ${styles.accent};
}

.skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
}

.skill-tag {
    background: ${styles.accent};
    color: ${theme === 'modern' ? '#000' : '#fff'};
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: ${styles.shadow};
}

.skill-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
}

@media (max-width: 768px) {
    body {
        padding: 1rem;
    }
    
    .portfolio-container {
        padding: 2rem;
    }
    
    .name {
        font-size: 2rem;
    }
    
    .bio {
        font-size: 1rem;
    }
    
    .social-links {
        gap: 0.75rem;
    }
    
    .social-link {
        width: 45px;
        height: 45px;
    }
}`;
  }, []);

  const generateJS = useCallback(() => {
    return `document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add click effects to interactive elements
    const socialLinks = document.querySelectorAll('.social-link');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add loading animation
    const container = document.querySelector('.portfolio-container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    console.log('Portfolio loaded successfully! ✨');
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
        description: "Your portfolio website has been packaged and downloaded successfully.",
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
      default:
        return 'bg-white text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            AutoBio
          </h1>
          <p className="text-muted-foreground text-lg">
            Create beautiful portfolio websites in minutes
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="autobio-transition hover:shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Portfolio Builder</h2>
              <Button onClick={downloadPortfolio} className="autobio-transition hover:scale-105">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={portfolioData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="autobio-transition"
              />
            </div>

            {/* Bio Input */}
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={portfolioData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                className="autobio-transition resize-none"
              />
            </div>

            {/* Profile Picture Upload */}
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
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
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
              <Label>Skills</Label>
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
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="autobio-transition hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Live Preview</h2>
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
              </div>
            </div>

            {/* Preview Container */}
            <div className={`min-h-[600px] rounded-lg p-8 ${getThemeClasses(currentTheme)} autobio-transition`}>
              <div className="max-w-md mx-auto text-center space-y-6">
                {/* Profile Picture */}
                <div className="flex justify-center">
                  {portfolioData.profilePicture ? (
                    <img
                      src={portfolioData.profilePicture}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl opacity-50">
                      👤
                    </div>
                  )}
                </div>

                {/* Name */}
                <h1 className="text-3xl font-bold text-primary">
                  {portfolioData.name}
                </h1>

                {/* Bio */}
                <p className="text-sm opacity-80 leading-relaxed">
                  {portfolioData.bio}
                </p>

                {/* Social Links */}
                {portfolioData.socialLinks.length > 0 && (
                  <div className="flex justify-center gap-3 flex-wrap">
                    {portfolioData.socialLinks.map((link) => {
                      const IconComponent = getIconComponent(link.icon);
                      return (
                        <div
                          key={link.id}
                          className="social-icon autobio-transition hover:scale-110"
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Skills */}
                {portfolioData.skills.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Skills</h2>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {portfolioData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="skill-tag autobio-transition"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;