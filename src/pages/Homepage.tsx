import  { useState, useEffect, useRef } from 'react'
import { RocketIcon, MenuIcon, CpuIcon, LayersIcon, ChevronDownIcon, InstagramIcon, LinkedinIcon, PhoneIcon } from "lucide-react"
import { Navigate } from 'react-router-dom'
const Button = ({ className, onClick, children }:any) => (
  <button className={className} onClick={onClick}>{children}</button>
)

const Card = ({ className, children }:any) => (
  <div className={className}>{children}</div>
)

const CardHeader = ({ children }:any) => (
  <div className="p-4">{children}</div>
)

const CardTitle = ({ className, children }:any) => (
  <h3 className={className}>{children}</h3>
)

const CardContent = ({ children }:any) => (
  <div className="p-4">{children}</div>
)



const Accordion = ({ items }:any) => {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef(Array(items.length).fill(null));

  useEffect(() => {
    answerRefs.current = answerRefs.current.slice(0, items.length);
  }, [items]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item :any, index :any):any => (
        <div key={index} className="mb-4">
          <button
            className="flex justify-between items-center w-full p-4 bg-gray-800 bg-opacity-50 rounded-lg text-left text-cyan-300 hover:bg-opacity-70 transition-all duration-200"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-lg font-semibold">{item.q}</span>
            <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          <div
            ref={el => answerRefs.current[index] = el}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: openIndex === index ? answerRefs.current[index]?.scrollHeight + 'px' : '0',
              opacity: openIndex === index ? 1 : 0,
            }}
          >
            <div className="p-4 bg-gray-800 bg-opacity-30 rounded-b-lg text-gray-300">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ScrollAnimation = ({ children }:any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

const TimelineItem = ({ day, title, icon: Icon, description }:any) => (
  <div className="flex flex-col md:flex-row items-start mb-12 relative">
    <div className="flex-none w-20 mr-4 mb-4 md:mb-0">
      <div className="text-cyan-400 font-bold text-lg md:text-xl">{day}</div>
    </div>
    <div className="flex-grow pl-8 md:pl-0 max-w-lg w-full">
      <div className="absolute left-0 top-0 h-full w-px bg-cyan-500 md:left-[-17px]"></div>
      <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-gray-900 md:left-[-25px] md:top-0"></div>
      <Card className="bg-gray-800 bg-opacity-50 border-cyan-500 border transform hover:scale-105 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg md:text-xl text-cyan-300">
            <Icon className="w-6 h-6 mr-3 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </div>
  </div>
)

const CountdownTimer = ({ targetDate }:any) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center space-x-2 sm:space-x-4 text-cyan-300">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1">{value.toString().padStart(2, '0')}</span>
          <span className="text-xs sm:text-sm uppercase font-semibold">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export default function TechtonicLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const workshops = [
    {
      day: "Day 1",
      title: "Basics of Robotics",
      icon: CpuIcon,
      description: "Master microcontrollers, servo motors, and sensors for building intelligent robots. Get hands-on experience with Arduino programming and circuit design."
    },
    {
      day: "Day 2",
      title: "PCB Designing",
      icon: LayersIcon,
      description: "Design professional-grade PCBs and create complex electronic schematics. Learn industry-standard tools and techniques for electronic design automation."
    },
    {
      day: "Day 3",
      title: "Fusion 360",
      icon: LayersIcon,
      description: "Dive into 3D modeling and CAD design specifically tailored for robotics applications. Create, simulate, and prepare your designs for 3D printing and manufacturing."
    }
  ]

  // Set the target date for the workshop 
  const targetDate = new Date('2024-09-19T12:40:00+05:30');

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-gray-900 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMGZmZmYxMCIvPjwvc3ZnPg==')] animate-pulse"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-900 bg-opacity-70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">Techtonic</h1>
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
                <a className="block py-2 hover:text-cyan-400 transition-colors" onClick={() => Navigate({ to: '/InstallationGuide' })}> Installation Guide</a>
            </li>
            <li>
              <a 
                href="#register" 
                className="block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                Register Now
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <ScrollAnimation>
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Techtonic <span className="font-mono text-3xl md:text-6xl bg-cyan-500 text-gray-900 px-2 py-1 rounded-lg inline-block transform -rotate-3">1.0</span>
            </h1>
            <p className="text-lg md:text-3xl text-cyan-300 mb-8">Annual Robotics Workshops by CICR</p>
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 inline-block shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-300">Workshop Starts In:</h2>
              <CountdownTimer targetDate={targetDate} />
            </div>
          </header>
        </ScrollAnimation>
        
        <ScrollAnimation>
        <section id="topics" className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Workshop Timeline
          </h2>
          <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center">
            {workshops.map((workshop, index) => (
              <TimelineItem key={index} {...workshop} />
            ))}
          </div>
        </section>
        </ScrollAnimation>
        
        <ScrollAnimation>
          <section id="benefits" className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">What You Get</h2>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 md:p-8 flex flex-col md:flex-row justify-between items-center border border-cyan-500 shadow-lg max-w-4xl mx-auto">
              <ul className="list-none mb-8 md:mb-0 text-base md:text-lg grid grid-cols-2 gap-4 md:grid-cols-1">
                {["Arduino Set", "Official Certificate", "Exclusive Swag", "Hands-on Experience", "Networking"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <RocketIcon className="w-5 h-5 md:w-6 md:h-6 mr-2 text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center bg-gray-900 p-4 md:p-6 rounded-lg border border-cyan-400 w-full md:w-auto">
                <p className="text-lg md:text-2xl font-bold mb-2">All-Inclusive Price</p>
                <p className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-2">FREE</p>
                <p className="text-xs md:text-sm text-gray-400">Limited spots available!</p>
              </div>
            </div>
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation>
          <section id="register" className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Join?</h2>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              onClick={() => window.open('https://forms.gle/your-google-form-link', '_blank')}
            >
              Register Now
            </Button>
          </section>
        </ScrollAnimation>

        <ScrollAnimation>
          <section id="faq" className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            <Accordion items={[
              { q: "Who can attend?", a: "Anyone interested in robotics, regardless of experience level!" },
              { q: "Do I need to bring my own equipment?", a: "Nope! We provide all necessary hardware and software. Just bring your laptop." },
              { q: "How long are the workshops?", a: "Each workshop is a full-day event, typically running from 9 AM to 5 PM." },
              { q: "Will there be breaks?", a: "Yes, we will include breaks throughout the day." },
              { q: "I am from CSE/IT branch. Can I attend?", a: "Yes, the workshop is open for everyone irrespective of branch and programme." },
            ]} />
          </section>
        </ScrollAnimation>
      </main>
      
      <footer className="relative z-10 bg-gray-900 border-t border-cyan-800">
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
            <a href="tel:+1234567890" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              <PhoneIcon className="w-6 h-6" />
              <span className="sr-only">Contact Us</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating circuit lines */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 50 L100 50 M50 0 L50 100' stroke='%2300ffff10' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}></div>
      </div>
    </div>
  )
}