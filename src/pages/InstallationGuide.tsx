import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, MonitorIcon, CpuIcon, BookOpenIcon, PhoneIcon, MenuIcon, InstagramIcon, LinkedinIcon  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Particles } from '../components/Particles';

const Button = ({ className, onClick, children }:any) => (
  <button className={className} onClick={onClick}>{children}</button>
)

interface AccordionItemProps {
  title: string;
  content: string[];
  isOpen: boolean;
  toggleOpen: () => void;
  icon: React.ElementType;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, toggleOpen, icon: Icon }) => {
  return (
    <div className="mb-4">
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-800 text-cyan-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="flex items-center text-lg font-semibold">
          <Icon className="w-6 h-6 mr-2" />
          {title}
        </span>
        <ChevronDownIcon
          className={`w-6 h-6 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`mt-2 bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ol className="list-decimal list-inside text-gray-300 space-y-2 p-4">
          {content.map((step, index) => (
            <li key={index} className="mb-2">
              <span className="ml-2">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{ title: string; description: string; link: string; icon: React.ElementType }> = ({ title, description, link, icon: Icon }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200"
  >
    <div className="flex items-center mb-2">
      <Icon className="w-6 h-6 mr-2 text-cyan-400" />
      <h3 className="text-lg font-semibold text-cyan-300">{title}</h3>
    </div>
    <p className="text-gray-300 text-sm">{description}</p>
  </a>
);

export default function InstallationGuide() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [, setScrollY] = useState(0)
  const navigate = useNavigate();

  const navigateToGuide = () => {
    navigate('/installation-guide');
  }

  const openRegistrationForm = () => {
    window.open('https://forms.gle/Ber4Z7n4jjw3RcgU6', '_blank');
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const kicadSteps = [
    "Visit the official KiCad website at https://www.kicad.org/download/",
    "Select your operating system (Windows, macOS, or Linux).",
    "For Windows 64-bit, click on 'Download via Github' in the 64-bit x64 section.",
    "Once the download is complete, run the .exe file.",
    "Follow the KiCad Installation Wizard, clicking 'Next' and selecting the destination folder.",
    "After installation, locate KiCad in your Start menu or desktop and run the application.",
    "On first launch, click 'Start with default settings'.",
    "If prompted about data collection, choose your preference.",
    "The KiCad interface should now appear. If asked about updates, select your preference.",
    "Congratulations! 🎉 You've successfully installed KiCad. See you at the workshop!",
  ];

  const fusion360Steps = [
    "Navigate to the Autodesk Fusion 360 website: https://www.autodesk.com/products/fusion-360/overview",
    "Click on the 'Free trial' or 'Get started' button.",
    "Sign in to your Autodesk account or create a new one if you don't have an account.",
    "Choose the appropriate license type (Student, Hobbyist, or Start-up).",
    "Download the Fusion 360 installer for your operating system.",
    "Run the installer and follow the on-screen instructions to complete the installation.",
    "Once installed, launch Fusion 360 and sign in with your Autodesk account.",
    "Complete the initial setup and tutorial to familiarize yourself with the interface.",
    "You're now ready to start designing in Fusion 360!",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Three.js Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Particles count={7000} />
        </Canvas>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-gray-900 bg-opacity-70 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-cyan-400">CICR</h1>
            <div className="md:hidden">
              <Button 
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
            <ul className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-6 ${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-gray-900 bg-opacity-70 backdrop-blur-md p-4' : 'hidden'}`}>
              <li>
                <Button 
                  className="w-full md:w-auto py-2 px-4 hover:text-cyan-400 transition-colors" 
                  onClick={navigateToGuide}
                >
                  Installation Guide
                </Button>
              </li>
              <li>
                <Button 
                  className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                  onClick={openRegistrationForm}
                >
                  Register Now
                </Button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Installation Guide
          </h1>
          
          <p className="text-gray-300 mb-8 text-center">
            Follow these step-by-step instructions to install the required software for the Techtonic workshop.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <AccordionItem
              title="KiCad Installation"
              content={kicadSteps}
              isOpen={openSection === 'kicad'}
              toggleOpen={() => toggleSection('kicad')}
              icon={CpuIcon}
            />

            <AccordionItem
              title="Fusion 360 Installation"
              content={fusion360Steps}
              isOpen={openSection === 'fusion360'}
              toggleOpen={() => toggleSection('fusion360')}
              icon={MonitorIcon}
            />
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Additional Resources & Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResourceCard
                  title="KiCad Documentation"
                  description="Official documentation and tutorials for KiCad."
                  link="https://docs.kicad.org/"
                  icon={BookOpenIcon}
                />
                <ResourceCard
                  title="Fusion 360 Learning Hub"
                  description="Autodesk's learning resources for Fusion 360."
                  link="https://help.autodesk.com/view/fusion360/ENU/courses/"
                  icon={BookOpenIcon}
                />
                <ResourceCard
                  title="Techtonic Support Chat"
                  description="Join our WhatsApp group for installation support."
                  link="https://chat.whatsapp.com/HpMOrRI723h1h0LAPxjLbY"
                  icon={PhoneIcon}
                />
                <ResourceCard
                  title="Video Tutorials"
                  description="Watch our curated playlist of installation guides."
                  link="https://www.youtube.com/watch?v=rthZcJ1AW_Q&list=PLMsGLEbV2EJYh0l-TzHCZUvebgZS4CVm9"
                  icon={MonitorIcon}
                />
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-4">
                If you encounter any issues during installation, please don't hesitate to reach out to us via WhatsApp or email.
              </p>
              <p className="text-cyan-400">
                We're excited to see you at the workshop! 🚀
              </p>
            </div>
          </div>
        </main>
        <footer className="relative z-10 bg-gray-900 bg-opacity-70 backdrop-blur-md border-t border-cyan-800">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-cyan-300 mb-4 md:mb-0 text-sm md:text-base text-center md:text-left">&copy; 2024 Techtonic by CICR. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/cicr_jiit/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <InstagramIcon className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/company/cicrjiit128/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <LinkedinIcon className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://chat.whatsapp.com/HpMOrRI723h1h0LAPxjLbY" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <PhoneIcon className="w-6 h-6" />
                <span className="sr-only">Contact Us</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}