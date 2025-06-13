"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import { 
  Network, 
  Server, 
  Shield, 
  Monitor, 
  Mail,
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="flex items-center mr-8 interactive">
              <Image
                src="/wzlogo-light-1.png"
                alt="WhiteZadow Logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
            
            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
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

      {/* Hero Section - Full Screen Landing */}
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
            {/* Logo in Hero */}
            <div className="flex justify-center mb-8 animate-bounce-in">
              <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl backdrop-blur-sm border border-cyan-500/20">
                <Image
                  src="/wzlogo-light-1.png"
                  alt="WhiteZadow Logo"
                  width={300}
                  height={100}
                  className="h-16 w-auto object-contain"
                  priority
                />
              </div>
            </div>

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
              >
                <Zap className="mr-2" size={20} />
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg interactive transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm"
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
    </div>
  );
}