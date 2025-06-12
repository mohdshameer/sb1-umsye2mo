"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Network, 
  Server, 
  Shield, 
  Monitor, 
  Code, 
  Database,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Download,
  ChevronDown,
  Menu,
  X,
  Zap,
  Globe,
  Cpu,
  HardDrive,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Image as ImageIcon,
  MessageCircle
} from 'lucide-react';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Navigation items with icons
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  // Mouse tracking for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px';
        cursorDotRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'Network Infrastructure', level: 95, icon: Network, color: 'from-blue-500 to-cyan-500' },
    { name: 'Server Administration', level: 90, icon: Server, color: 'from-green-500 to-emerald-500' },
    { name: 'Cybersecurity', level: 85, icon: Shield, color: 'from-red-500 to-pink-500' },
    { name: 'System Monitoring', level: 88, icon: Monitor, color: 'from-purple-500 to-violet-500' },
    { name: 'Cloud Computing', level: 82, icon: Globe, color: 'from-orange-500 to-yellow-500' },
    { name: 'Database Management', level: 80, icon: Database, color: 'from-indigo-500 to-blue-500' },
  ];

  const services = [
    {
      title: 'Network Design & Implementation',
      description: 'Complete network infrastructure planning, design, and deployment for enterprise environments.',
      icon: Network,
      features: ['LAN/WAN Setup', 'VPN Configuration', 'Network Security', 'Performance Optimization'],
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Server Administration',
      description: 'Comprehensive server management, maintenance, and optimization services.',
      icon: Server,
      features: ['Linux/Windows Servers', 'Virtualization', 'Backup Solutions', 'Disaster Recovery'],
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      title: 'Cybersecurity Solutions',
      description: 'Advanced security implementations to protect your digital infrastructure.',
      icon: Shield,
      features: ['Firewall Configuration', 'Intrusion Detection', 'Security Audits', 'Compliance'],
      gradient: 'from-red-600 to-pink-600'
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Modern cloud solutions for scalable and efficient business operations.',
      icon: Globe,
      features: ['AWS/Azure Setup', 'Migration Services', 'Auto-scaling', 'Cost Optimization'],
      gradient: 'from-purple-600 to-violet-600'
    }
  ];

  const projects = [
    {
      title: 'Enterprise Network Redesign',
      description: 'Complete network infrastructure overhaul for a 500+ employee company, improving performance by 300%.',
      tech: ['Cisco', 'Fortinet', 'VMware', 'PowerShell'],
      category: 'Infrastructure',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Cloud Migration Strategy',
      description: 'Migrated on-premise infrastructure to AWS, reducing costs by 40% while improving scalability.',
      tech: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
      category: 'Cloud',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Security Framework Implementation',
      description: 'Deployed comprehensive security framework meeting ISO 27001 standards for financial services.',
      tech: ['Splunk', 'Palo Alto', 'Azure AD', 'PowerBI'],
      category: 'Security',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: 'Automated Monitoring System',
      description: 'Built custom monitoring solution reducing incident response time by 70%.',
      tech: ['Prometheus', 'Grafana', 'Python', 'Ansible'],
      category: 'Automation',
      gradient: 'from-purple-500 to-violet-500'
    }
  ];

  const galleryItems = [
    {
      title: 'Data Center Setup',
      description: 'Modern server room with advanced cooling and monitoring systems',
      category: 'Infrastructure',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Network Operations Center',
      description: '24/7 monitoring facility with real-time network analytics',
      category: 'Monitoring',
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud architecture with automated deployment pipelines',
      category: 'Cloud',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Security Command Center',
      description: 'Advanced cybersecurity monitoring and threat detection systems',
      category: 'Security',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  // Particle animation component
  const ParticleField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        opacity: number;
      }> = [];

      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
          ctx.fill();

          // Draw connections
          particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          });
        });

        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden cursor-none transition-colors duration-300">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 transition-all duration-300 ${
          isHovering ? 'scale-150 bg-cyan-400/20' : 'scale-100'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Liquid Glass Navigation */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
        isScrolled ? 'top-2' : 'top-4'
      }`}>
        <div className="glass-nav rounded-full px-6 py-3 mx-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold text-foreground mr-8 interactive">
              White<span className="text-cyan-400">Zadow</span>
            </div>
            
            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`glass-nav-item p-3 rounded-full interactive group relative ${
                    activeSection === item.id ? 'active' : ''
                  }`}
                  title={item.label}
                >
                  <item.icon 
                    size={18} 
                    className={`transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'text-cyan-400 scale-110' 
                        : 'text-foreground/70 group-hover:text-cyan-400 group-hover:scale-110'
                    }`} 
                  />
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass-nav-item p-3 rounded-full ml-2 interactive"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10 animate-fade-in">
              <div className="grid grid-cols-3 gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`glass-nav-item p-4 rounded-xl interactive flex flex-col items-center gap-2 ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                  >
                    <item.icon 
                      size={20} 
                      className={`transition-colors duration-300 ${
                        activeSection === item.id ? 'text-cyan-400' : 'text-foreground/70'
                      }`} 
                    />
                    <span className={`text-xs font-medium ${
                      activeSection === item.id ? 'text-cyan-400' : 'text-foreground/70'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden light-bg">
        <ParticleField />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            {/* Animated Icons */}
            <div className="flex justify-center space-x-8 mb-8 animate-float">
              <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-cyan-500/30">
                <Network className="text-cyan-400" size={32} />
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-blue-500/30 animate-delay-200">
                <Server className="text-blue-400" size={32} />
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-purple-500/30 animate-delay-400">
                <Shield className="text-purple-400" size={32} />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-text-glow">
              <span className="inline-block animate-bounce-in">IT</span>{' '}
              <span className="inline-block animate-bounce-in delay-200">Network</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x animate-bounce-in delay-400">
                Specialist
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto animate-fade-in delay-600">
              Designing, implementing, and securing enterprise network infrastructures 
              with cutting-edge technology solutions and innovative approaches.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-800">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg interactive transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                onClick={() => scrollToSection('projects')}
              >
                <Zap className="mr-2" size={20} />
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg interactive transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="mr-2" size={20} />
                Get In Touch
              </Button>
            </div>

            {/* Tech Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in delay-1000">
              {[
                { number: '50+', label: 'Projects', icon: Cpu },
                { number: '8+', label: 'Years', icon: HardDrive },
                { number: '25+', label: 'Clients', icon: Globe },
                { number: '99.9%', label: 'Uptime', icon: Zap }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 group-hover:border-cyan-500/50 transition-all duration-300 interactive">
                    <stat.icon className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                    <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-cyan-400 animate-pulse" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-5xl font-bold text-foreground mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                With over 8 years of experience in IT networking and infrastructure, I specialize in 
                designing and implementing robust, scalable network solutions for enterprise environments. 
                My expertise spans from traditional on-premise setups to modern cloud-native architectures.
              </p>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                I'm passionate about leveraging the latest technologies to solve complex networking challenges, 
                ensuring optimal performance, security, and reliability for mission-critical systems.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'CCNP Certified', color: 'from-cyan-500 to-blue-500' },
                  { label: 'AWS Solutions Architect', color: 'from-orange-500 to-yellow-500' },
                  { label: 'Security+ Certified', color: 'from-green-500 to-emerald-500' }
                ].map((cert, index) => (
                  <Badge 
                    key={index}
                    className={`bg-gradient-to-r ${cert.color} text-white px-4 py-2 interactive hover:scale-105 transition-transform duration-300`}
                  >
                    {cert.label}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Experience Highlights</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '50+', label: 'Projects Completed', icon: '🚀' },
                    { number: '8+', label: 'Years Experience', icon: '⭐' },
                    { number: '25+', label: 'Happy Clients', icon: '😊' },
                    { number: '99.9%', label: 'Uptime Achieved', icon: '⚡' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-3xl font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-foreground text-center mb-12 animate-fade-in">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan-500/50 transition-all duration-500 interactive group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-r ${skill.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <skill.icon className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-foreground text-lg">{skill.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 animate-skill-bar`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-foreground text-center mb-12 animate-fade-in">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan-500/50 transition-all duration-500 interactive group animate-fade-in-up overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-none`}>
                      {project.category}
                    </Badge>
                    <ExternalLink className="text-muted-foreground group-hover:text-cyan-400 transition-colors duration-300 interactive" size={20} />
                  </div>
                  <CardTitle className="text-foreground text-xl mb-2 group-hover:text-cyan-400 transition-colors duration-300">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="border-border text-muted-foreground hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300 interactive">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-foreground text-center mb-12 animate-fade-in">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Gallery</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {galleryItems.map((item, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan-500/50 transition-all duration-500 interactive group animate-fade-in-up overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className={`absolute top-4 left-4 bg-gradient-to-r ${item.gradient} text-white border-none`}>
                    {item.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-foreground text-xl group-hover:text-cyan-400 transition-colors duration-300">{item.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-foreground text-center mb-12 animate-fade-in">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <h3 className="text-3xl font-semibold text-foreground mb-6">Let's Discuss Your Project</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Ready to enhance your network infrastructure? I'm here to help you design and implement 
                solutions that drive your business forward with cutting-edge technology.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Mail, text: 'contact@whitezadow.com', color: 'from-cyan-500 to-blue-500' },
                  { icon: Phone, text: '+1 (555) 123-4567', color: 'from-green-500 to-emerald-500' },
                  { icon: MapPin, text: 'Available for Remote & On-site', color: 'from-purple-500 to-violet-500' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className={`p-3 bg-gradient-to-r ${contact.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className="text-white" size={20} />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{contact.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                {[
                  { icon: Github, color: 'hover:bg-muted' },
                  { icon: Linkedin, color: 'hover:bg-blue-600' },
                  { icon: Twitter, color: 'hover:bg-cyan-600' }
                ].map((social, index) => (
                  <Button key={index} size="sm" variant="outline" className={`border-border text-muted-foreground ${social.color} transition-all duration-300 interactive hover:scale-110`}>
                    <social.icon size={20} />
                  </Button>
                ))}
              </div>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 animate-slide-in-right">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300 interactive"
                    />
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      className="bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300 interactive"
                    />
                  </div>
                  <Input 
                    placeholder="Subject" 
                    className="bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300 interactive"
                  />
                  <Textarea 
                    placeholder="Your Message" 
                    rows={5}
                    className="bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-cyan-400 transition-colors duration-300 interactive resize-none"
                  />
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 interactive transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                    <Mail className="mr-2" size={20} />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-4 interactive">
              White<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Zadow</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Transforming businesses through innovative IT network solutions
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social, index) => (
                <a key={index} href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors duration-300 interactive">
                  <social.icon size={24} />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 WhiteZadow. All rights reserved. | Designed with ❤️ for the future of networking
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}