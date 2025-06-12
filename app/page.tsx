"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Monitor, 
  Server, 
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Zap,
  Network,
  Globe,
  Code,
  Settings,
  Activity,
  Terminal,
  Cloud,
  Lock,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated background with floating tech elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tech elements data
    const techElements = [
      { x: 0, y: 0, size: 20, speed: 0.5, type: 'server', opacity: 0.6 },
      { x: 0, y: 0, size: 16, speed: 0.3, type: 'database', opacity: 0.4 },
      { x: 0, y: 0, size: 18, speed: 0.7, type: 'network', opacity: 0.5 },
      { x: 0, y: 0, size: 14, speed: 0.4, type: 'cloud', opacity: 0.3 },
      { x: 0, y: 0, size: 22, speed: 0.6, type: 'shield', opacity: 0.7 },
      { x: 0, y: 0, size: 12, speed: 0.8, type: 'cpu', opacity: 0.4 },
    ];

    // Initialize positions
    techElements.forEach(element => {
      element.x = Math.random() * canvas.width;
      element.y = Math.random() * canvas.height;
    });

    // Animated IT character data
    const characters = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.7,
        targetX: canvas.width * 0.8,
        targetY: canvas.height * 0.7,
        speed: 0.5,
        direction: 1,
        action: 'walking',
        scale: 1
      },
      {
        x: canvas.width * 0.6,
        y: canvas.height * 0.5,
        targetX: canvas.width * 0.6,
        targetY: canvas.height * 0.5,
        speed: 0,
        direction: 1,
        action: 'working',
        scale: 0.8
      }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      const gridSize = 50;
      ctx.strokeStyle = isDarkMode ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animate floating tech elements
      techElements.forEach(element => {
        element.y -= element.speed;
        if (element.y < -element.size) {
          element.y = canvas.height + element.size;
          element.x = Math.random() * canvas.width;
        }

        // Draw tech icons as simple shapes
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = isDarkMode ? '#06b6d4' : '#3b82f6';
        
        switch (element.type) {
          case 'server':
            ctx.fillRect(element.x - element.size/2, element.y - element.size/2, element.size, element.size * 0.6);
            break;
          case 'database':
            ctx.beginPath();
            ctx.ellipse(element.x, element.y, element.size/2, element.size/3, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'network':
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.size/2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'cloud':
            ctx.beginPath();
            ctx.arc(element.x - element.size/3, element.y, element.size/3, 0, Math.PI * 2);
            ctx.arc(element.x + element.size/3, element.y, element.size/3, 0, Math.PI * 2);
            ctx.arc(element.x, element.y - element.size/4, element.size/2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'shield':
            ctx.beginPath();
            ctx.moveTo(element.x, element.y - element.size/2);
            ctx.lineTo(element.x + element.size/3, element.y + element.size/2);
            ctx.lineTo(element.x - element.size/3, element.y + element.size/2);
            ctx.closePath();
            ctx.fill();
            break;
          case 'cpu':
            ctx.fillRect(element.x - element.size/2, element.y - element.size/2, element.size, element.size);
            break;
        }
        ctx.restore();
      });

      // Draw server racks
      const drawServerRack = (x: number, y: number, height: number) => {
        ctx.fillStyle = isDarkMode ? '#1f2937' : '#e5e7eb';
        ctx.fillRect(x, y, 60, height);
        
        // Server units
        for (let i = 0; i < height / 20; i++) {
          ctx.fillStyle = isDarkMode ? '#374151' : '#d1d5db';
          ctx.fillRect(x + 5, y + i * 20 + 2, 50, 16);
          
          // LED indicators
          ctx.fillStyle = Math.random() > 0.5 ? '#10b981' : '#ef4444';
          ctx.fillRect(x + 8, y + i * 20 + 6, 4, 4);
          ctx.fillRect(x + 15, y + i * 20 + 6, 4, 4);
        }
      };

      // Draw multiple server racks
      drawServerRack(canvas.width * 0.1, canvas.height * 0.3, 200);
      drawServerRack(canvas.width * 0.25, canvas.height * 0.4, 150);
      drawServerRack(canvas.width * 0.75, canvas.height * 0.35, 180);
      drawServerRack(canvas.width * 0.9, canvas.height * 0.45, 120);

      // Draw animated characters
      characters.forEach(character => {
        if (character.action === 'walking') {
          // Simple walking animation
          const walkCycle = Math.sin(Date.now() * 0.01) * 5;
          
          // Move character
          if (character.direction > 0) {
            character.x += character.speed;
            if (character.x > character.targetX) {
              character.direction = -1;
              character.targetX = canvas.width * 0.2;
            }
          } else {
            character.x -= character.speed;
            if (character.x < character.targetX) {
              character.direction = 1;
              character.targetX = canvas.width * 0.8;
            }
          }

          // Draw walking character
          ctx.save();
          ctx.translate(character.x, character.y + walkCycle);
          ctx.scale(character.direction, 1);
          
          // Body
          ctx.fillStyle = isDarkMode ? '#60a5fa' : '#2563eb';
          ctx.fillRect(-8, -20, 16, 25);
          
          // Head
          ctx.fillStyle = isDarkMode ? '#fbbf24' : '#f59e0b';
          ctx.beginPath();
          ctx.arc(0, -30, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Legs (animated)
          ctx.strokeStyle = isDarkMode ? '#60a5fa' : '#2563eb';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-3, 5);
          ctx.lineTo(-3 + Math.sin(Date.now() * 0.02) * 8, 20);
          ctx.moveTo(3, 5);
          ctx.lineTo(3 + Math.sin(Date.now() * 0.02 + Math.PI) * 8, 20);
          ctx.stroke();
          
          ctx.restore();
        } else if (character.action === 'working') {
          // Working at server character
          const workMotion = Math.sin(Date.now() * 0.005) * 2;
          
          ctx.save();
          ctx.translate(character.x, character.y + workMotion);
          
          // Body
          ctx.fillStyle = isDarkMode ? '#34d399' : '#10b981';
          ctx.fillRect(-6, -15, 12, 20);
          
          // Head
          ctx.fillStyle = isDarkMode ? '#fbbf24' : '#f59e0b';
          ctx.beginPath();
          ctx.arc(0, -25, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Arms working
          ctx.strokeStyle = isDarkMode ? '#34d399' : '#10b981';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-6, -10);
          ctx.lineTo(-15 + workMotion, -5);
          ctx.moveTo(6, -10);
          ctx.lineTo(15 + workMotion, -8);
          ctx.stroke();
          
          ctx.restore();
        }
      });

      // Draw data flow lines
      const time = Date.now() * 0.001;
      ctx.strokeStyle = isDarkMode ? 'rgba(6, 182, 212, 0.6)' : 'rgba(59, 130, 246, 0.6)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 5; i++) {
        const startX = canvas.width * 0.1 + i * 20;
        const endX = canvas.width * 0.9;
        const y = canvas.height * 0.8 + i * 10;
        
        const progress = (time + i * 0.5) % 2;
        const currentX = startX + (endX - startX) * (progress / 2);
        
        ctx.beginPath();
        ctx.moveTo(currentX - 20, y);
        ctx.lineTo(currentX, y);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-black/20 backdrop-blur-lg border-b border-cyan-500/20' 
          : 'bg-white/20 backdrop-blur-lg border-b border-blue-500/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Tech<span className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'}>Space</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-cyan-400' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 animate-fade-in">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-2 transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-cyan-400' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating Tech Icons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[
            { Icon: Server, position: 'top-20 left-20', delay: '0s' },
            { Icon: Database, position: 'top-32 right-32', delay: '0.5s' },
            { Icon: Network, position: 'bottom-40 left-40', delay: '1s' },
            { Icon: Shield, position: 'bottom-32 right-20', delay: '1.5s' },
            { Icon: Cloud, position: 'top-1/2 left-10', delay: '2s' },
            { Icon: Cpu, position: 'top-1/3 right-10', delay: '2.5s' },
          ].map(({ Icon, position, delay }, index) => (
            <div
              key={index}
              className={`absolute ${position} animate-float opacity-30`}
              style={{ animationDelay: delay }}
            >
              <Icon 
                size={32} 
                className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'} 
              />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <div className="animate-fade-in-up">
            {/* Main Title */}
            <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="inline-block animate-bounce-in">IT</span>{' '}
              <span className="inline-block animate-bounce-in delay-200">Infrastructure</span>
              <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-cyan-400 via-blue-500 to-purple-500' 
                  : 'from-blue-600 via-indigo-600 to-purple-600'
              } animate-gradient-x animate-bounce-in delay-400`}>
                Solutions
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in delay-600 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Building tomorrow's technology infrastructure today with innovative solutions 
              and expert engineering.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-800">
              <Button 
                size="lg" 
                className={`px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white hover:shadow-cyan-500/25' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-blue-500/25'
                }`}
                onClick={() => scrollToSection('services')}
              >
                <Zap className="mr-2" size={20} />
                Explore Solutions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={`px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm ${
                  isDarkMode 
                    ? 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black' 
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
                onClick={() => scrollToSection('contact')}
              >
                <Terminal className="mr-2" size={20} />
                Get Started
              </Button>
            </div>

            {/* Tech Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in delay-1000">
              {[
                { number: '24/7', label: 'Monitoring', icon: Activity },
                { number: '99.9%', label: 'Uptime', icon: Zap },
                { number: '500+', label: 'Servers', icon: Server },
                { number: '100+', label: 'Clients', icon: Globe }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 group-hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50 group-hover:border-cyan-500/50' 
                      : 'bg-gradient-to-r from-white/50 to-gray-50/50 border-gray-300/50 group-hover:border-blue-500/50'
                  }`}>
                    <stat.icon 
                      className={`mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 ${
                        isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                      }`} 
                      size={24} 
                    />
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stat.number}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <ChevronDown 
            className={`animate-pulse ${
              isDarkMode ? 'text-cyan-400' : 'text-blue-600'
            }`} 
            size={32} 
          />
        </div>
      </section>

      {/* Additional sections would go here */}
      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            About Section
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Content coming soon...
          </p>
        </div>
      </section>

      <section id="services" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Services Section
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Content coming soon...
          </p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Contact Section
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Content coming soon...
          </p>
        </div>
      </section>
    </div>
  );
}