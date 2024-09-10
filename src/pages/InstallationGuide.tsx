import { useState } from 'react';

const AccordionItem = ({ title, content, isOpen, toggleOpen }:any) => {
  return (
    <div className="mb-4">
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-800 text-cyan-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        onClick={toggleOpen}
      >
        <span className="text-lg font-semibold">{title}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {content.map((step:any, index:any) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const InstallationGuide = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section:any) => {
    setOpenSection(openSection === section ? null : section);
  };

  const kicadSteps = [
    "Visit the official KiCad website (https://www.kicad.org/download/).",
    "Download the appropriate version for your operating system (Windows, macOS, or Linux).",
    "Run the installer and follow the on-screen instructions.",
    "Accept the license agreement and choose the installation location.",
    "Select the components you want to install (default selection is recommended).",
    "Wait for the installation to complete.",
    "Launch KiCad from your applications menu or desktop shortcut.",
    "Familiarize yourself with the KiCad interface and basic tools.",
  ];

  const fusion360Steps = [
    "Go to the Autodesk Fusion 360 website (https://www.autodesk.com/products/fusion-360/overview).",
    "Click on the 'Free trial' or 'Get started' button.",
    "Sign in to your Autodesk account or create a new one if you don't have an account.",
    "Choose the appropriate license type (e.g., Student, Hobbyist, or Start-up).",
    "Download the Fusion 360 installer for your operating system.",
    "Run the installer and follow the on-screen instructions.",
    "Once installed, launch Fusion 360 and sign in with your Autodesk account.",
    "Complete the initial setup and tutorial to get familiar with the interface.",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-300">Installation Guide</h1>
        
        <AccordionItem
          title="KiCad Installation"
          content={kicadSteps}
          isOpen={openSection === 'kicad'}
          toggleOpen={() => toggleSection('kicad')}
        />

        <AccordionItem
          title="Fusion 360 Installation"
          content={fusion360Steps}
          isOpen={openSection === 'fusion360'}
          toggleOpen={() => toggleSection('fusion360')}
        />
      </div>
    </div>
  );
};

export default InstallationGuide;