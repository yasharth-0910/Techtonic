'use client'

import { useState, useEffect, useRef } from 'react'
import { RocketIcon, MenuIcon, CpuIcon, LayersIcon, ChevronDownIcon, InstagramIcon, LinkedinIcon, PhoneIcon, Box, Zap} from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Particles } from '../components/Particles'
import { motion } from "framer-motion"
import { FaDiscord } from 'react-icons/fa'

const Button = ({ className, onClick, children }:any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={className}
    onClick={onClick}
  >
    {children}
  </motion.button>
)

const Card = ({ className, children }:any) => (
  <div className={className}>{children}</div>
)

const CardHeader = ({ children }:any) => (
  <div className="p-4">{children}</div>
)

const CardTitle = ({ className, children }:any ) => (
  <h3 className={className}>{children}</h3>
)

const CardContent = ({ children }:any) => (
  <div className="p-4">{children}</div>
)

const Accordion = ({ items }:any) => {
  const [openIndex, setOpenIndex] = useState(null)
  const answerRefs = useRef(Array(items.length).fill(null))

  useEffect(() => {
    answerRefs.current = answerRefs.current.slice(0, items.length)
  }, [items])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item:any, index:any) => (
        <div key={index} className="mb-4">
          <button
            className="flex justify-between items-center w-full p-4 bg-gray-800 bg-opacity-50 rounded-lg text-left text-cyan-300 hover:bg-opacity-70 transition-all duration-200 text-lg"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-xl font-semibold">{item.q}</span>
            <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          <div
            ref={el => answerRefs.current[index] = el}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: openIndex === index ? answerRefs.current[index]?.scrollHeight + 'px' : '0',
              opacity: openIndex === index ? 1 : 0,
            }}
          >
            <div className="p-4 bg-gray-800 bg-opacity-30 rounded-b-lg text-gray-300 text-lg">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const ScrollAnimation = ({ children }:any) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  )
}

const TimelineItem = ({ day, title, icon: Icon, description }:any) => (
  <div className="flex flex-col md:flex-row items-start mb-12 relative">
    <div className="flex-none w-20 mr-4 mb-4 md:mb-0">
      <div className="text-cyan-400 font-bold text-xl md:text-2xl">{day}</div>
    </div>
    <div className="flex-grow pl-8 md:pl-0 max-w-lg w-full">
      <div className="absolute left-0 top-0 h-full w-px bg-cyan-500 md:left-[-17px]"></div>
      <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-gray-900 md:left-[-25px] md:top-0"></div>
      <Card className="bg-gray-800 bg-opacity-50 border-cyan-500 border transform hover:scale-105 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-xl md:text-2xl text-cyan-300">
            <Icon className="w-7 h-7 mr-3 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-300">{description}</p>
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
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(intervalId)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [targetDate])

  return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-6 text-cyan-300">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-3xl sm:text-4xl md:text-6xl font-bold mb-1">{value.toString().padStart(2, '0')}</span>
          <span className="text-sm sm:text-base uppercase font-semibold">{unit}</span>
        </div>
      ))}
    </div>
  )
}

const AnimatedVersion = () => {
  return (
    <span className="text-4xl md:text-7xl bg-cyan-500 text-gray-900 px-2 py-1 rounded-lg inline-block transform -rotate-3 hover:rotate-0 transition-all duration-300 animate-pulse-rotate">
      1.0
    </span>
  )
}

export default function TechtonicLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [, setScrollY] = useState(0)
  const navigate = useNavigate()

  const navigateToGuide = () => {
    navigate('/installation-guide')
  }

  const openRegistrationForm = () => {
    window.open('https://forms.gle/your-google-form-link', '_blank')
  }

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
      icon: Box,
      description: "Dive into 3D modeling and CAD design specifically tailored for robotics applications. Create, simulate, and prepare your designs for 3D printing and manufacturing."
    }
  ]

  const targetDate = new Date('2024-09-26T12:40:00+05:30')

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Particles count={7000} />
        </Canvas>
      </div>

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 bg-gray-900 bg-opacity-70 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-cyan-400">Techtonic</h1>
            <div className="md:hidden">
              <Button 
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="h-8 w-8" />
              </Button>
            </div>
            <ul className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-6 ${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-gray-900 bg-opacity-70 backdrop-blur-md p-4' : 'hidden'}`}>
              <li>
                <Button 
                  className="w-full md:w-auto py-2 px-4 hover:text-cyan-400 transition-colors text-lg" 
                  onClick={navigateToGuide}
                >
                  Installation Guide
                </Button>
              </li>
              <li>
                <Button 
                  className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                  onClick={openRegistrationForm}
                >
                  Register Now
                </Button>
              </li>
            </ul>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-12">
          <ScrollAnimation>
            <header className="text-center mb-16">
              <h1 className="text-5xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Techtonic <AnimatedVersion />
              </h1>
              <p className="text-xl md:text-4xl text-cyan-300 mb-10">Annual Robotics Workshops by CICR</p>
              <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 inline-block shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-300">Workshop Starts In:</h2>
                <CountdownTimer targetDate={targetDate} />
              </div>
            </header>
          </ScrollAnimation>
          
          <ScrollAnimation>
            <section id="topics" className="mb-24 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Workshop Timeline
              </h2>
              <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center pr-10">
                {workshops.map((workshop, index) => (
                  <TimelineItem key={index} {...workshop} />
                ))}
              </div>
            </section>
          </ScrollAnimation>
          
          <ScrollAnimation>
            <section id="benefits" className="mb-24">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">What You Get</h2>
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 md:p-10 flex flex-col md:flex-row justify-between items-center border border-cyan-500 shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300 max-w-4xl mx-auto">
                <ul className="list-none mb-8 md:mb-0 text-lg md:text-xl grid grid-cols-2 gap-6 md:grid-cols-1">
                  {["Official Certificate", "Hands-on Experience", "Exclusive Swag", "Networking"].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <RocketIcon className="w-6 h-6 md:w-7 md:h-7 mr-3 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div 
                  className="text-center bg-gray-900 p-6 md:p-8 rounded-lg border border-cyan-400 w-full md:w-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl md:text-2xl font-bold mb-2">All-Inclusive Price</p>
                  <p className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-2">FREE</p>
                  <p className="text-sm md:text-base text-gray-400">Limited spots available!</p>
                </motion.div>
              </div>
            </section>
          </ScrollAnimation>
          
          <ScrollAnimation>
            <section id="register" className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ready to Join?</h2>
              <div className="relative inline-block">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button
                  className="relative bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center space-x-3"
                  onClick={openRegistrationForm}
                >
                  <span>Reserve Your Spot</span>
                  <Zap className="w-7 h-7" />
                </Button>
              </div>
              <motion.p
                className="mt-6 text-xl text-cyan-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Join us and be part of the future of robotics!
              </motion.p>
            </section>
          </ScrollAnimation>

          <ScrollAnimation>
            <section id="faq" className="mb-24">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Frequently Asked Questions</h2>
              <Accordion items={[
                { q: "Who can attend?", a: "Any 1st Year interested in robotics, regardless of experience level!" },
                { q: "Do I need to bring my own equipment?", a: "Nope! We provide all necessary hardware and software. Just bring your laptop and charger." },
                { q: "Are there any Pre-requisites?", a: "No, the workshop will be totally beginner-friendly. However, we do expect you to download software beforehand, whose steps are given in the Installation Guide." },
                { q: "How long are the workshops?", a: "Each workshop is a full-day event, typically running from 9 AM to 5 PM." },
                { q: "I am from CSE/IT branch. Can I attend?", a: "Yes, the workshop is open for everyone irrespective of branch and programme." },
              ]} />
            </section>
          </ScrollAnimation>
        </main>
        
        <footer className="relative z-10 bg-gray-900 bg-opacity-70 backdrop-blur-md border-t border-cyan-800">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-cyan-300 mb-4 md:mb-0 text-base md:text-lg text-center md:text-left">&copy; 2024 Techtonic by CICR. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/cicr_jiit/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <InstagramIcon className="w-7 h-7" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/company/cicrjiit128/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <LinkedinIcon className="w-7 h-7" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://discord.gg/your-discord-invite" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <FaDiscord className="w-7 h-7" />
                <span className="sr-only">Discord</span>
              </a>
              <a href="https://chat.whatsapp.com/HpMOrRI723h1h0LAPxjLbY" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <PhoneIcon className="w-7 h-7" />
                <span className="sr-only">Contact Us</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}