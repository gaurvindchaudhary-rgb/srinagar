/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Heart, 
  Sparkles, 
  UtensilsCrossed, 
  Flame, 
  Ship, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  ChevronRight, 
  Info, 
  X, 
  Gift, 
  Menu, 
  Globe, 
  Award, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Star,
  Layers,
  CloudSun
} from 'lucide-react';
import { SUITES, ADDONS, WAZWAN_MENU, ITINERARIES, FAQS, HERO_IMAGE, SUITE_IMAGE, WAZWAN_IMAGE, HOUSEBOAT_IMAGE } from './data';
import { RoomSuite, BookingState, ReservationConfirmation } from './types';

export default function App() {
  // Navigation active states
  const [activeTab, setActiveTab] = useState<'suites' | 'dining' | 'experiences' | 'itineraries' | 'faqs'>('suites');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Time of Day Simulation State (Srinagar 360° Virtual Sanctuary)
  const [simulatedTime, setSimulatedTime] = useState<'sunrise' | 'afternoon' | 'sunset' | 'midnight'>('sunset');

  // Room Customizer States
  const [selectedRoom, setSelectedRoom] = useState<RoomSuite>(SUITES[0]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['shikara-sunrise']);
  const [stayNights, setStayNights] = useState<number>(3);
  const [numGuests, setNumGuests] = useState<number>(2);

  // Experience itinerary states
  const [selectedVibeId, setSelectedVibeId] = useState<string>('lakeside-serenity');

  // Interactive booking engine modal states
  const [bookingForm, setBookingForm] = useState<BookingState>({
    checkIn: '2026-06-15',
    checkOut: '2026-06-18',
    guests: 2,
    suiteId: SUITES[0].id,
    selectedAddons: ['shikara-sunrise'],
    guestName: '',
    guestEmail: '',
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [reservationReceipt, setReservationReceipt] = useState<ReservationConfirmation | null>(null);

  // Local Time Clock for Srinagar, J&K
  const [srinagarTime, setSrinagarTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setSrinagarTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track window scroll to transparently blur navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Addon selection toggle
  const toggleAddon = (addonId: string) => {
    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter(id => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  // Synchronize customizer state with booking form
  const handleOpenBooking = () => {
    setBookingForm({
      ...bookingForm,
      suiteId: selectedRoom.id,
      selectedAddons: [...selectedAddonIds],
      guests: numGuests,
    });
    setIsBookingModalOpen(true);
  };

  // Submit Simulated Booking
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.guestName || !bookingForm.guestEmail) {
      alert('Kindly enter your name and email to prepare your royal welcome.');
      return;
    }

    const nights = stayNights > 0 ? stayNights : 3;
    const baseAmount = selectedRoom.price * nights;
    const addonsAmount = selectedAddonIds.reduce((sum, id) => {
      const addon = ADDONS.find(a => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0) * nights;

    const grandTotal = baseAmount + addonsAmount;
    const generatedId = 'SHC-' + Math.random().toString(36).substring(3, 9).toUpperCase();
    const waxStampCode = 'CHINAR-' + Math.floor(1000 + Math.random() * 9000);

    setReservationReceipt({
      reservationId: generatedId,
      guestName: bookingForm.guestName,
      roomName: selectedRoom.name,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      totalNights: nights,
      baseAmount,
      addonsAmount,
      grandTotal,
      stampCode: waxStampCode
    });
  };

  // Time details for Srinagar Virtual Sanctuary Simulator
  const timeDetails = {
    sunrise: {
      bg: 'bg-gradient-to-r from-amber-50 to-orange-100',
      text: 'text-[#1b1c19]',
      cardBg: 'bg-white/95',
      timeLabel: 'Sunrise (05:00 AM - 07:30 AM)',
      atmosphere: 'Thick fog rises in silky columns from Dal Lake. Ancient Hazratbal prayers echo in soft undertones through the crisp mountain air. Siberian cranes land gracefully on the wetland bounds. The fragrance of burning cedar charcoal begins to drift.',
      poem: '“O Lalla, do not think of the world of names, nor of the body or mind... Search inside thy heart, where the silence of the absolute resides.”',
      author: 'Lalleshwari (Sufi Mystic Poetess of Kashmir, 1340 AD)',
      icon: <CloudSun className="w-6 h-6 text-[#805600]" />,
      aestheticColor: '#fdba49'
    },
    afternoon: {
      bg: 'bg-gradient-to-r from-sky-50 to-amber-50',
      text: 'text-[#1b1c19]',
      cardBg: 'bg-white/95',
      timeLabel: 'Warm Afternoon (12:00 PM - 03:00 PM)',
      atmosphere: 'The bright Himalayan sun cuts through the pine corridors. Clear turquoise waters shimmer. Vendors trace quiet patterns in their Shiras, selling wild fresh-cut lavender, blue lotuses, and fresh Kashmiri pears. The mountain breeze is cool and sweet.',
      poem: '“Arise, O maiden of spring, and scatter the Chinar flowers! Saffron fields are waiting, of early dawn-dreaming... let our hearts bloom like the rose.”',
      author: 'Habba Khatoon (The Nightingale of Kashmir, 1550 AD)',
      icon: <Globe className="w-6 h-6 text-[#1f364a]" />,
      aestheticColor: '#1f364a'
    },
    sunset: {
      bg: 'bg-gradient-to-r from-[#8b261e]/10 to-[#6b0d0a]/20',
      text: 'text-[#1b1c19]',
      cardBg: 'bg-[#faf9f4]',
      timeLabel: 'Golden Sunset Hours (05:30 PM - 07:00 PM)',
      atmosphere: 'A stunning fiery curtain drape. The entire Zabarwan mountain ridge is lit in glowing copper and hot magenta shades, casting exact reflections in the calm lake. Saffron tea (Kahwa) starts steaming in heavy hand-hammered copper samovars.',
      poem: '“If there is a paradise on earth, it is this, it is this, it is this...”',
      author: 'Emperor Jahangir (During his summer stay at Shalimar Gardens)',
      icon: <Flame className="w-6 h-6 text-[#a6392f]" />,
      aestheticColor: '#a6392f'
    },
    midnight: {
      bg: 'bg-gradient-to-r from-[#171a21]/95 to-[#1f364a]',
      text: 'text-[#f2f1ec]',
      cardBg: 'bg-[#1b1c19]/90 border-[#8b716e]/30',
      timeLabel: 'Starlit Midnight (11:00 PM - 03:00 AM)',
      atmosphere: 'A silence so deep you can hear the light lapping of water on our wooden houseboat hulls. Stars are crystal clear above the snowy peaks. Cozy wool-wrapped salons are warmed by coal fires, smelling of ancient cedarwood and roasted saffron threads.',
      poem: '“The sky is deep, the water is a mirror... I slept with the wool of patience, and woke with the crown of early morning light in Kashmir.”',
      author: 'Sheikh Noor-ud-Din Wali (Spiritual Father of Kashmir Valley)',
      icon: <Clock className="w-6 h-6 text-[#fdba49]" />,
      aestheticColor: '#fdba49'
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f4] text-[#1b1c19] font-sans antialiased selection:bg-[#ffa396] selection:text-[#6b0d0a]">
      
      {/* Dynamic Saffron Header Alert Bar */}
      <div className="bg-[#6b0d0a] text-white text-xs tracking-[0.15em] uppercase py-2.5 px-4 text-center font-sans font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 bg-[#fdba49] animate-pulse"></span>
        HIMALAYAN SILENCE: EXPERIENCE AUTUMN IN SRINAGAR • COMPLIMENTARY JETTY SHUTTLE SHIKARA
        <span className="hidden md:inline-block ml-4 text-[#dec0bb]">|</span>
        <span className="hidden md:flex items-center gap-1 ml-2">
          <Clock className="w-3.5 h-3.5 text-[#fdba49]" /> 
          Srinagar Local Time: <span className="font-mono text-[#fdba49]">{srinagarTime || "10:10 AM"}</span>
        </span>
      </div>

      {/* Main Luxury Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#faf9f4]/95 backdrop-blur-md border-b border-[#dec0bb] py-3 shadow-xs' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#" className="flex flex-col group" id="brand-logo">
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#6b0d0a] group-hover:text-[#a6392f] transition-colors flex items-center gap-1.5 uppercase">
              <span className="text-xl">🍁</span> Srinagar Heritage
            </span>
            <span className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] text-[#8b716e] uppercase font-semibold">
              Collective &amp; Houseboats
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#57423f]">
            <a href="#suites" onClick={() => setActiveTab('suites')} className={`hover:text-[#6b0d0a] transition-all relative pb-1 ${activeTab === 'suites' ? 'text-[#6b0d0a] font-bold' : ''}`}>
              Suites
              {activeTab === 'suites' && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6b0d0a]"></span>}
            </a>
            <a href="#heritage-wood" className="hover:text-[#6b0d0a] transition-all">Heritage Craft</a>
            <a href="#dining" onClick={() => setActiveTab('dining')} className={`hover:text-[#6b0d0a] transition-all relative pb-1 ${activeTab === 'dining' ? 'text-[#6b0d0a] font-bold' : ''}`}>
              Royal Dining
              {activeTab === 'dining' && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6b0d0a]"></span>}
            </a>
            <a href="#itineraries" onClick={() => setActiveTab('itineraries')} className={`hover:text-[#6b0d0a] transition-all relative pb-1 ${activeTab === 'itineraries' ? 'text-[#6b0d0a] font-bold' : ''}`}>
              Expeditions
              {activeTab === 'itineraries' && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6b0d0a]"></span>}
            </a>
            <a href="#simulations" className="hover:text-[#6b0d0a] text-[#805600] flex items-center gap-1 transition-all">
              <span className="inline-block w-2 h-2 bg-[#fdba49] rounded-none animate-ping"></span>
              Virtual Sanctuary hour
            </a>
          </nav>

          {/* Header Button Frame */}
          <div className="flex items-center gap-4">
            <button 
              id="header-reserve-button"
              onClick={handleOpenBooking}
              className="bg-[#6b0d0a] hover:bg-[#a6392f] text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-none transition-all duration-300 border border-[#6b0d0a]"
            >
              Reserve Sanctuary
            </button>

            {/* Mobile Menu Icon */}
            <button 
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#57423f] hover:text-[#6b0d0a] focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#faf9f4] border-b border-[#dec0bb] overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-[#57423f]">
                <a href="#suites" onClick={() => { setMobileMenuOpen(false); setActiveTab('suites'); }} className="py-2 hover:text-[#6b0d0a]">Suites &amp; Customizer</a>
                <a href="#heritage-wood" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#6b0d0a]">Khatamband Craftwork</a>
                <a href="#dining" onClick={() => { setMobileMenuOpen(false); setActiveTab('dining'); }} className="py-2 hover:text-[#6b0d0a]">Royal Wazwan Banquet</a>
                <a href="#itineraries" onClick={() => { setMobileMenuOpen(false); setActiveTab('itineraries'); }} className="py-2 hover:text-[#6b0d0a]">Personalised Itineraries</a>
                <a href="#simulations" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#805600]">Atmosphere Simulator</a>
                <a href="#faqs" onClick={() => { setMobileMenuOpen(false); setActiveTab('faqs'); }} className="py-2 hover:text-[#6b0d0a]">Heritage Guides &amp; FAQ</a>
                <div className="py-2 border-t border-[#dec0bb]/50 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-none inline-block"></span>
                  <span className="text-[10px] text-gray-500 normal-case tracking-normal">Direct Chinar Jetty Shuttle Active</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full-screen Background Image with Subtle Parallax Zoom */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="Majestic Sunrise over Dal Lake Srinagar J&K" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.85) contrast(1.02)' }}
            referrerPolicy="no-referrer"
          />
          {/* Saffron and Crimson Warm Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c19]/90 via-transparent to-[#1b1c19]/30" />
        </div>

        {/* Floating Luxurious Card Overlay - Off center design as requested */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row justify-between items-center h-full pt-12 md:pt-24 pb-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-[#faf9f4]/95 border border-[#dec0bb] p-8 md:p-14 max-w-2xl text-left shadow-2xl relative rounded-none flex flex-col gap-6"
            id="hero-content-card"
          >
            {/* Elegant Double golden accent line in corners */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#dec0bb]/30 pointer-events-none rounded-none" />
            
            <header className="flex flex-col gap-2">
              <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#a6392f] uppercase flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#fdba49]"></span>
                Srinagar, Kashmir
              </span>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#6b0d0a] leading-tight tracking-tight">
                A Saffron &amp; <br />Silk Sanctuary
              </h1>
            </header>

            <p className="font-sans text-sm md:text-base text-[#57423f] leading-relaxed max-w-lg">
              Where the majestic legacy of the Mughal royal court meets the absolute mountain silence of the Zabarwan range. Float over cedar craftsmanship, dine wrapped in exquisite Pashmina wool, and find absolute peace on our historic waters.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#customizer" 
                className="bg-[#6b0d0a] hover:bg-[#a6392f] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-none transition-all duration-300 border border-[#6b0d0a]"
              >
                Reserve Your Stay
              </a>
              <a 
                href="#gallery" 
                className="bg-transparent hover:bg-[#6b0d0a]/5 text-[#57423f] hover:text-[#6b0d0a] text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-none transition-all duration-300 border border-[#dec0bb]"
              >
                Explore Sanctuary Suite
              </a>
            </div>

            {/* Micro Details Grid */}
            <div className="border-t border-[#dec0bb]/60 pt-6 mt-4 grid grid-cols-3 gap-4 text-center md:text-left">
              <div>
                <span className="block font-serif text-xl font-bold text-[#6b0d0a]">100%</span>
                <span className="block text-[9px] font-bold text-[#8b716e] uppercase tracking-wider">Khatamband Wood</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#6b0d0a]">Dal Lake</span>
                <span className="block text-[9px] font-bold text-[#8b716e] uppercase tracking-wider">Ghat 7 Access</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#6b0d0a]">5-Star</span>
                <span className="block text-[9px] font-bold text-[#8b716e] uppercase tracking-wider">Kashmiri Hospitality</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats float bubble for visual hierarchy */}
          <div className="hidden lg:flex flex-col gap-4 self-end ml-12 bg-[#1b1c19]/80 border border-[#8b716e]/40 p-5 text-[#faf9f4] max-w-xs mb-8 rounded-none backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍂</span>
              <span className="font-serif text-sm font-semibold text-[#fdba49]">Autumn &amp; Snow Retreats</span>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-300">
              Each wood plank of our traditional houseboat has been hand-carved with historical pine patterns. Direct step-down boat docks ready.
            </p>
          </div>

        </div>

        {/* Scroll helper */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center animate-bounce">
          <a href="#heritage-wood" className="text-white hover:text-[#fdba49] transition-all flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-widest uppercase font-semibold">Enter Sanctuary</span>
            <span className="text-lg">↓</span>
          </a>
        </div>
      </section>

      {/* Heritage Craft Story Section */}
      <section id="heritage-wood" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-gradient-to-b from-[#faf9f4] to-[#f5f4ef]">
        
        {/* Architectural Divider */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#a6392f] uppercase block mb-2">The Imperial Legacy</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#6b0d0a] tracking-tight">Heritage Carved in Cedar &amp; Time</h2>
          <div className="w-16 h-0.5 bg-[#dec0bb] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Column 1: Descriptive Story */}
          <div className="flex flex-col gap-6 text-[#57423f]">
            <span className="font-serif text-lg md:text-xl font-semibold italic text-[#805600] border-l-2 border-[#fdba49] pl-4">
              “To step in here is to dwell inside an imperial masterpiece, where every walnut panel whisper stories of the ancient Kashmiri kings.”
            </span>
            <p className="text-sm md:text-base leading-relaxed">
              For centuries, the artisans of Srinagar have perfected <strong>"Khatamband"</strong> ceiling art—a geometric wooden puzzle of joinery that locks together without a single nail. Our houseboats and suites stand as living monuments to this craftsmanship.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              Our structures are constructed entirely of thick deodar and Himalayan cypress beams. They resist decade-long winter lake snows while releasing a gentle, organic wooden fragrance. Every curtain is woven with original patterns of saffron threads and blue almond paisleys.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 py-4 border-y border-[#dec0bb]/50">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#a6392f] mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-[#6b0d0a] uppercase tracking-wide">Pinjrakari Screens</h4>
                  <p className="text-[11px] text-gray-500">Intricate geometric wooden lattices filtering sunset rays beautifully.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#a6392f] mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-[#6b0d0a] uppercase tracking-wide">Pashmina Drapery</h4>
                  <p className="text-[11px] text-gray-500">Premium heavy wool drapes which insulate beautifully in chill alpine evenings.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a href="#customizer" className="inline-flex items-center gap-2 text-xs font-bold text-[#6b0d0a] hover:text-[#a6392f] uppercase tracking-widest">
                Explore Available Suites <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Framed Cedar Suite Image */}
          <div className="relative group p-4 border border-[#dec0bb]/40 bg-white">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#a6392f]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#a6392f]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#a6392f]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#a6392f]" />
            
            <img 
              src={SUITE_IMAGE} 
              alt="Luxury suite interior in J&K Srinagar with walnut wood carvings and snowy mountain sunset view" 
              className="w-full h-auto object-cover grayscale-xs group-hover:grayscale-0 transition-all duration-700"
              style={{ maxHeight: '480px' }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6 bg-[#faf9f4] p-4 border border-[#dec0bb] max-w-xs shadow-md">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#a6392f] block">ROOM PREVIEW</span>
              <p className="font-serif text-sm font-semibold text-[#1b1c19] mt-1">The Maharaja Pavilion Wing</p>
              <span className="text-xs text-gray-500 block mt-1">Stated from $850/night</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Suite customizer Section */}
      <section id="customizer" className="py-24 bg-[#efeee9] border-y border-[#dec0bb]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <header className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#a6392f] uppercase block mb-2">Build Your Dream Stay</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#6b0d0a] tracking-tight">Imperial Sanctuaries Explorer</h2>
            <p className="font-sans text-xs text-gray-500 uppercase tracking-widest mt-2">
              Select an heirloom suite and customize your local Kashmiri experience in real-time.
            </p>
            <div className="w-16 h-0.5 bg-[#dec0bb] mx-auto mt-4" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Suites Selector & Details Panel (Left 8 columns) */}
            <div className="lg:col-span-8 bg-[#faf9f4] border border-[#dec0bb] p-6 md:p-8">
              
              {/* Custom Suite Selection Tabs */}
              <div className="flex border-b border-[#dec0bb]/60 mb-6 flex-wrap">
                {SUITES.map((suite) => (
                  <button
                    key={suite.id}
                    onClick={() => {
                      setSelectedRoom(suite);
                      // sync default booking form room
                    }}
                    className={`flex-1 min-w-[120px] py-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all ${
                      selectedRoom.id === suite.id 
                        ? 'border-[#6b0d0a] text-[#6b0d0a] bg-white' 
                        : 'border-transparent text-gray-400 hover:text-[#6b0d0a] hover:bg-[#faf9f4]/50'
                    }`}
                  >
                    {suite.name}
                  </button>
                ))}
              </div>

              {/* Suite Detail Panel Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Visual */}
                <div className="relative group">
                  <img 
                    src={selectedRoom.featuredImg} 
                    alt={selectedRoom.name} 
                    className="w-full h-64 md:h-80 object-cover shadow-sm border border-[#dec0bb]/40"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-[#6b0d0a] text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 mt-1 ml-1">
                    Featured View
                  </div>
                  <div className="mt-4 flex justify-between text-xs text-gray-500 border-t border-[#dec0bb]/40 pt-4">
                    <span><strong>Dimensions:</strong> {selectedRoom.size}</span>
                    <span><strong>Capacity:</strong> {selectedRoom.capacity}</span>
                  </div>
                </div>

                {/* Narrative & Custom Addons */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#805600] font-bold uppercase block">
                      {selectedRoom.title}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#6b0d0a] mt-1">{selectedRoom.name}</h3>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-[#805600]">
                      <Star className="w-3.5 h-3.5 fill-[#fdba49] text-[#fdba49]" />
                      <Star className="w-3.5 h-3.5 fill-[#fdba49] text-[#fdba49]" />
                      <Star className="w-3.5 h-3.5 fill-[#fdba49] text-[#fdba49]" />
                      <Star className="w-3.5 h-3.5 fill-[#fdba49] text-[#fdba49]" />
                      <Star className="w-3.5 h-3.5 fill-[#fdba49] text-[#fdba49]" />
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider ml-2">Heritage Rated</span>
                    </div>

                    <p className="text-xs text-[#57423f] leading-relaxed mt-4">
                      {selectedRoom.longDesc}
                    </p>

                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#a6392f] mt-6 mb-3 border-b border-[#dec0bb]/40 pb-1">
                      Included Sanctuary Curated Aminities
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                      {selectedRoom.amenities.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-[#a6392f] font-bold text-[10px]">♦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#dec0bb]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-widest">EST. VALUE RATE</span>
                      <span className="font-serif text-3xl font-bold text-[#6b0d0a]">${selectedRoom.price} <span className="text-sm font-sans font-normal text-gray-500">/ night</span></span>
                    </div>
                  </div>

                </div>

              </div>
              
              {/* Experiential Addon choices nested beautifully */}
              <div className="mt-12 pt-8 border-t border-[#dec0bb]">
                <h4 className="font-serif text-lg font-bold text-[#1f364a] mb-2 flex items-center gap-2">
                  <span>🍁</span> Personalize Your Srinagar Experience (Optional Add-ons)
                </h4>
                <p className="text-xs text-gray-500 mb-6 font-sans">
                  Choose local experiential excursions to automatically stitch into your stay. All events include secure transport, private guides, and historical context.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ADDONS.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);
                    return (
                      <div 
                        key={addon.id} 
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#6b0d0a]/5 border-[#6b0d0a] shadow-xs' 
                            : 'bg-white border-[#dec0bb]/60 hover:border-[#6b0d0a]/60'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-center gap-2">
                            <span className="p-1 px-1.5 bg-[#dfd9ce] font-mono text-[9px] tracking-widest font-bold uppercase rounded-none text-[#6b0d0a]">
                              {addon.id === 'shikara-sunrise' ? '⛵' : addon.id === 'royal-wazwan' ? '🍽️' : addon.id === 'kahwa-samovar' ? '☕' : '🧣'}
                            </span>
                            <h5 className="font-bold text-xs text-[#1f364a]">{addon.name}</h5>
                          </div>
                          <span className="text-xs font-bold text-[#a6392f] font-serif">+${addon.price}/day</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-normal mt-2">
                          {addon.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Customizer Sticky Summary Panel (Right 4 columns) */}
            <div className="lg:col-span-4 bg-[#6b0d0a] text-white p-6 md:p-8 border border-[#8b261e] shadow-lg sticky top-28 self-start">
              
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-white/10 pointer-events-none" />

              <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#fdba49] block mb-2">Live Escapes Invoice Summary</span>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-[#ffdad5] pb-4 border-b border-white/20">Custom Sanctuary</h3>
              
              <div className="flex flex-col gap-5 py-6">
                
                {/* Suite Segment */}
                <div className="flex justify-between text-xs pb-1 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-gray-300 block uppercase">Selected Room Suite</span>
                    <strong className="text-white text-sm">{selectedRoom.name}</strong>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#fdba49]">${selectedRoom.price}/nt</span>
                </div>

                {/* Duration Configurator */}
                <div>
                  <span className="text-[10px] text-gray-300 block uppercase mb-2">Length of Stay (Nights)</span>
                  <div className="flex bg-[#8b261e] border border-white/20 p-1">
                    <button 
                      onClick={() => setStayNights(Math.max(1, stayNights - 1))}
                      className="w-10 h-8 font-bold hover:bg-[#6b0d0a] transition-all text-sm rounded-none focus:outline-none"
                    >
                      -
                    </button>
                    <span className="flex-1 flex items-center justify-center font-mono text-xs font-bold text-white bg-[#6b0d0a]">
                      {stayNights} Nights
                    </span>
                    <button 
                      onClick={() => setStayNights(stayNights + 1)}
                      className="w-10 h-8 font-bold hover:bg-[#6b0d0a] transition-all text-sm rounded-none focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Guest Configurator */}
                <div>
                  <span className="text-[10px] text-gray-300 block uppercase mb-2">Number of Travelers</span>
                  <div className="flex bg-[#8b261e] border border-white/20 p-1">
                    <button 
                      onClick={() => setNumGuests(Math.max(1, numGuests - 1))}
                      className="w-10 h-8 font-bold hover:bg-[#6b0d0a] transition-all text-sm rounded-none focus:outline-none"
                    >
                      -
                    </button>
                    <span className="flex-1 flex items-center justify-center font-mono text-xs font-bold text-white bg-[#6b0d0a]">
                      {numGuests} Guests
                    </span>
                    <button 
                      onClick={() => setNumGuests(Math.min(3, numGuests + 1))}
                      className="w-10 h-8 font-bold hover:bg-[#6b0d0a] transition-all text-sm rounded-none focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Addons List display */}
                <div>
                  <span className="text-[10px] text-gray-300 block uppercase mb-1">Kashmiri Add-on Services</span>
                  {selectedAddonIds.length === 0 ? (
                    <span className="text-[11px] text-gray-400 italic">No experiential extras selected</span>
                  ) : (
                    <div className="flex flex-col gap-1.5 pt-1">
                      {selectedAddonIds.map(id => {
                        const addon = ADDONS.find(a => a.id === id);
                        return addon ? (
                          <div key={id} className="flex justify-between items-center text-[11px] bg-[#8b261e]/40 p-1.5 border-l-2 border-[#fdba49]">
                            <span className="truncate max-w-[180px]">{addon.name}</span>
                            <span className="font-mono text-[#fdba49]">${addon.price}/day</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

              </div>

              {/* Live Calculations */}
              <div className="mt-4 pt-6 border-t border-white/20 flex flex-col gap-2">
                <div className="flex justify-between text-xs text-gray-200">
                  <span>Room Base Summary:</span>
                  <span className="font-mono">${selectedRoom.price * stayNights}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-200">
                  <span>Add-on Activities Summary:</span>
                  <span className="font-mono">
                    ${selectedAddonIds.reduce((sum, id) => {
                      const addon = ADDONS.find(a => a.id === id);
                      return sum + (addon ? addon.price : 0);
                    }, 0) * stayNights}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#ffdad5] mt-2 pt-2 border-t border-white/10">
                  <span>Est. Total Amount:</span>
                  <span className="font-mono text-base text-[#fdba49]">
                    ${(selectedRoom.price * stayNights) + (selectedAddonIds.reduce((sum, id) => {
                      const addon = ADDONS.find(a => a.id === id);
                      return sum + (addon ? addon.price : 0);
                    }, 0) * stayNights)}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={handleOpenBooking}
                className="w-full bg-[#fdba49] hover:bg-[#805600] text-[#6b0d0a] hover:text-white text-xs font-bold uppercase tracking-widest py-3.5 mt-8 rounded-none transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                Book Selected Suite <ChevronRight className="w-4 h-4" />
              </button>

              <span className="block text-[9px] text-gray-300 text-center mt-3 normal-case italic">
                *Includes round-trip private jetty Shikara transit and sunrise flower platter greeting.
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* Srinagar 360° Atmosphere Simulator Section */}
      <section id="simulations" className="py-24 bg-[#1b1c19] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fdba49] via-[#6b0d0a] to-[#a6392f]" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <header className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#fdba49] uppercase block mb-2">The Celestial Clock</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">Srinagar Virtual Sanctuary Hour</h2>
            <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mt-2 max-w-2xl mx-auto">
              Simulate the mystical seasonal and celestial hours of J&amp;K to experience local Sufi poetry, sensory descriptions, and audio-visual tones.
            </p>
            <div className="w-16 h-0.5 bg-[#8b716e] mx-auto mt-4" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive Controllers (Left 4 columns) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#fdba49] block mb-2">SELECT CYCLIC PHASE</span>
                
                {(Object.keys(timeDetails) as Array<keyof typeof timeDetails>).map((time) => (
                  <button
                    key={time}
                    onClick={() => setSimulatedTime(time)}
                    className={`p-4 text-left border rounded-none transition-all duration-500 relative flex items-center justify-between ${
                      simulatedTime === time 
                        ? 'border-[#fdba49] bg-white/5 shadow-md' 
                        : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </h4>
                      <span className="text-[10px] text-gray-400">
                        {time === 'sunrise' ? '05:00 AM' : time === 'afternoon' ? '12:00 PM' : time === 'sunset' ? '05:30 PM' : 'Midnight'}
                      </span>
                    </div>

                    {/* Active Indicator or Icon */}
                    <div>
                      {simulatedTime === time ? (
                        <span className="w-2.5 h-2.5 bg-[#fdba49] rounded-none animate-pulse block"></span>
                      ) : (
                        <span className="text-gray-600">→</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Informational Box */}
              <div className="bg-white/[0.03] border border-white/5 p-5 text-xs text-gray-400">
                <div className="flex items-center gap-2 mb-2 text-[#fdba49]">
                  <Info className="w-4 h-4" />
                  <strong className="uppercase tracking-widest font-bold text-[10px] text-[#fdba49]">ECO-ETHICAL SANCTUARY</strong>
                </div>
                Our houseboats rely on local solar storage batteries charged during the afternoon phases to feed warm, soothing starlit night heaters quietly. Let us safeguard Kashmir.
              </div>

            </div>

            {/* Simulated Live View Canvas (Right 8 columns) */}
            <div className="lg:col-span-8 flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={simulatedTime}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className={`flex-1 p-8 md:p-12 border border-[#8b716e]/40 shadow-2xl relative rounded-none flex flex-col justify-between ${timeDetails[simulatedTime].bg} ${timeDetails[simulatedTime].text}`}
                >
                  {/* Outer double borders for manuscript theme */}
                  <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#8b716e]/10 pointer-events-none" />

                  {/* Top bar header of simulator */}
                  <div className="flex justify-between items-center pb-6 border-b border-[#8b716e]/20">
                    <div className="flex items-center gap-2.5">
                      {timeDetails[simulatedTime].icon}
                      <span className="font-serif text-sm font-semibold tracking-wide">
                        {timeDetails[simulatedTime].timeLabel}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 bg-black/10">
                      STATUS: ACTIVE
                    </span>
                  </div>

                  {/* Core Atmospheric Description */}
                  <div className="my-10">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8b261e] block mb-2">Sensory Atmosphere Description</span>
                    <p className="text-sm md:text-base leading-relaxed md:font-medium">
                      {timeDetails[simulatedTime].atmosphere}
                    </p>
                  </div>

                  {/* Poetic Quote Box */}
                  <div className="pt-6 border-t border-[#8b716e]/20 flex flex-col gap-2 bg-black/[0.02] p-4 max-w-2xl italic">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#a6392f] block not-italic">
                      Traditional Kashmiri Chant &amp; Verses
                    </span>
                    <p className="font-serif text-sm md:text-base text-[#6b0d0a] leading-relaxed font-semibold">
                      {timeDetails[simulatedTime].poem}
                    </p>
                    <span className="text-[10px] not-italic font-bold text-gray-500 uppercase tracking-widest mt-1">
                      — {timeDetails[simulatedTime].author}
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Royal Culinary section ("The Art of Wazwan & Kahwa") */}
      <section id="dining" className="py-24 bg-[#faf9f4] border-b border-[#dec0bb]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <header className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#a6392f] uppercase block mb-2">A Culinary Odyssey</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#6b0d0a] tracking-tight">The Art of Royal Wazwan</h2>
            <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mt-2 max-w-xl mx-auto">
              Our master chef prepares the historic 36-course royal feast, utilizing Pampore saffron, local cedar coals, and pure wild cardamoms.
            </p>
            <div className="w-16 h-0.5 bg-[#dec0bb] mx-auto mt-4" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image (Left 5 columns) */}
            <div className="lg:col-span-5 p-4 border border-[#dec0bb]/40 bg-white">
              <img 
                src={WAZWAN_IMAGE} 
                alt="Traditional Kashmiri Wazwan feast on copper Trami plate in highly luxurious wooden dining lounge" 
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#805600] block">THE SANCTUARY TRAMI BANQUET</span>
                <span className="text-xs text-gray-500 italic">Served under mahogany archways with warm silver cups</span>
              </div>
            </div>

            {/* Interactive Menu Tabs & Grid (Right 7 columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="flex border-b border-[#dec0bb]/60 pb-3 gap-6 flex-wrap">
                <h3 className="font-serif text-xl font-bold text-[#6b0d0a] flex-1">
                  Royal Wazwan Tasting Menu Logs
                </h3>
                <span className="text-[10px] tracking-widest bg-[#ffa396]/20 text-[#6b0d0a] font-bold py-1 px-3 uppercase border border-[#dec0bb]">
                  Fresh Pampore Saffron Guaranteed
                </span>
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WAZWAN_MENU.map((item, index) => (
                  <div key={index} className="p-4 bg-white border border-[#dec0bb]/40">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#1f364a]">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 tracking-wider">
                          {item.type.toUpperCase()} • {item.potency}
                        </span>
                      </div>
                      <span className="font-serif text-[11px] text-[#a6392f] font-semibold bg-[#faf9f4] px-2 py-0.5 border border-[#dec0bb]/30">
                        {item.localName}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#57423f] leading-relaxed mt-2 pt-2 border-t border-[#dec0bb]/25">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Saffron Tea Kahwa Sommelier Call */}
              <div className="bg-[#f5f4ef] border border-[#dec0bb] p-5 text-xs text-gray-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                <div>
                  <h4 className="font-bold text-[#6b0d0a] uppercase tracking-wide">Complimentary Midnight Kahwa Call</h4>
                  <p className="text-[11px] text-gray-500">Every night at 10:00 PM, a brass Samovar travels to each room door serving hot almond Kahwa.</p>
                </div>
                <button 
                  onClick={handleOpenBooking}
                  className="bg-[#6b0d0a] hover:bg-[#a6392f] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 text-nowrap rounded-none border border-[#6b0d0a]"
                >
                  Book Private Tasting
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Curated Himalayan Expeditions Section */}
      <section id="itineraries" className="py-24 bg-[#efeee9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <header className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#a6392f] uppercase block mb-2">Himalayan Curated Guide</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#6b0d0a] tracking-tight">Interactive Itinerary Vibe Planner</h2>
            <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mt-2 max-w-xl mx-auto">
              Select your desired retreat mood and see a step-by-step pre-planned Himalayan expedition in Srinagar.
            </p>
            <div className="w-16 h-0.5 bg-[#dec0bb] mx-auto mt-4" />
          </header>

          {/* Vibe Selection bar */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {ITINERARIES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedVibeId(item.id)}
                className={`px-6 py-4 border rounded-none transition-all duration-300 flex items-center gap-2.5 ${
                  selectedVibeId === item.id 
                    ? 'bg-[#6b0d0a] text-white border-[#6b0d0a] shadow-xs' 
                    : 'bg-white text-[#57423f] border-[#dec0bb] hover:border-[#6b0d0a]'
                }`}
              >
                <span>{item.id === 'chinar-heritage' ? '🏛️' : item.id === 'lakeside-serenity' ? '⛵' : '🕯️'}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Display active vibe timeline */}
          {(() => {
            const activeVibe = ITINERARIES.find(a => a.id === selectedVibeId);
            if (!activeVibe) return null;
            return (
              <div className="bg-[#faf9f4] border border-[#dec0bb] p-6 md:p-10">
                <div className="border-b border-[#dec0bb]/60 pb-6 mb-8 text-center md:text-left">
                  <span className="text-[10px] tracking-[0.25em] font-bold text-[#805600] uppercase block">
                    SANCTUARY SIGNATURE DIRECTIVE
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#6b0d0a] mt-1">
                    {activeVibe.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 max-w-3xl leading-relaxed">
                    {activeVibe.tagline}
                  </p>
                </div>

                {/* Days timeline layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeVibe.days.map((day) => (
                    <div key={day.dayNum} className="p-5 border border-[#dec0bb]/40 bg-white relative">
                      {/* Step index */}
                      <span className="absolute top-2 right-2 font-mono text-xs font-bold text-gray-300 bg-gray-50 border border-gray-100 p-1 px-2">
                        DAY 0{day.dayNum}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#805600] uppercase tracking-wider mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#a6392f]" /> 
                        <span>{day.location}</span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-[#1f364a] mb-2">
                        {day.title}
                      </h4>
                      
                      <p className="text-[11px] text-gray-500 mb-4 font-mono font-semibold">
                        Timing Coordination: {day.timing}
                      </p>

                      <p className="text-xs text-[#57423f] leading-relaxed pt-3 border-t border-gray-100 italic">
                        "{day.activity}"
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#dec0bb]/60 text-center">
                  <button 
                    onClick={handleOpenBooking}
                    className="bg-[#1f364a] hover:bg-[#364d62] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-none transition-all duration-300 border border-[#1f364a]"
                  >
                    Lock Itinerary into My Reservation
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* Traditional FAQ/Heritage advice guides section */}
      <section id="faqs" className="py-24 max-w-4xl mx-auto px-6 md:px-12">
        <header className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#a6392f] uppercase block mb-2">Heritage Guidance &amp; Tips</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#6b0d0a] tracking-tight">Essential Srinagar Advice</h2>
          <div className="w-16 h-0.5 bg-[#dec0bb] mx-auto mt-4" />
        </header>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="p-6 bg-[#f5f4ef] border border-[#dec0bb]/60">
              <h3 className="font-serif text-base font-bold text-[#6b0d0a] flex items-center gap-2">
                <span className="text-[#fdba49]">♦</span> {faq.question}
              </h3>
              <p className="text-xs md:text-sm text-[#57423f] leading-relaxed mt-3 pl-4 border-l-2 border-[#dec0bb]/30 italic bg-[#faf9f4] p-3">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Crimson Footer with Location coordinates and Srinagar Weather */}
      <footer className="bg-[#6b0d0a] text-[#ffdad5] pt-16 pb-8 border-t-2 border-[#fdba49] relative">
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
          
          {/* Column 1: Brand & location description */}
          <div className="flex flex-col gap-4">
            <span className="font-serif text-xl font-bold tracking-tight text-white uppercase block">
              🍁 SRINAGAR HERITAGE
            </span>
            <p className="text-[11px] leading-relaxed text-gray-300">
              A private, eco-conscious timber retreat on Dal Lake, J&amp;K, India. Preserving seventeen-century Khatamband joinery, organic pashmina weavers, and old Mughal royal cuisine cultures.
            </p>
            <span className="text-[10px] text-[#fdba49] font-mono tracking-widest block font-bold">
              COORDINATES: 34.0837° N, 74.7973° E
            </span>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-serif text-xs font-semibold uppercase text-[#fdba49] tracking-wider mb-1.5">Sanctuary Elements</h4>
            <a href="#suites" className="text-[11px] hover:text-white transition-all">Heritage Suite Selection</a>
            <a href="#heritage-wood" className="text-[11px] hover:text-white transition-all">Deodar Architecture Secrets</a>
            <a href="#dining" className="text-[11px] hover:text-[#fdba49] transition-all">Traditional Wazwan tasting</a>
            <a href="#simulations" className="text-[11px] hover:text-[#fdba49] text-[#fdba49] transition-all flex items-center gap-1">
              <span>●</span> Atmosphere Simulation console
            </a>
          </div>

          {/* Column 3: Local Ecology Certification */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-xs font-semibold uppercase text-[#fdba49] tracking-wider mb-0.5">Ecology Protection</h4>
            <div className="flex items-start gap-2 bg-[#8b261e]/40 p-3 border-l-2 border-[#fdba49]">
              <ShieldCheck className="w-5 h-5 text-[#fdba49] shrink-0" />
              <p className="text-[10px] leading-relaxed text-gray-300">
                100% bio-sewage treatment systems installed. ZERO direct liquid waste into pristine Dal Lake waters. Awarded Gold Green Stamp.
              </p>
            </div>
          </div>

          {/* Column 4: Contact details */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-serif text-xs font-semibold uppercase text-[#fdba49] tracking-wider mb-1.5">Direct Enquiries</h4>
            <span className="text-[11px] block">Ghat No. 7, Boulevard Road, Dal Lake, Srinagar, J&amp;K 190001</span>
            <span className="text-[11px] font-mono block text-[#fdba49] font-bold">WELCOME@SRINAGARHERITAGE.COM</span>
            <span className="text-[11px] font-mono block">SECURE TELEPHONE: +91 194 2450000</span>
          </div>

        </div>

        {/* Global certification footprint */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 gap-4">
          <span>© 2026 Srinagar Heritage Collective Private Resort Ltd. All rights, including Khatamband timber patterns, are reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Ecology Charter</a>
            <span>•</span>
            <a href="#" className="hover:underline">Heritage Code Privacy</a>
            <span>•</span>
            <span>Developed under Himalayan Quiet Luxury System</span>
          </div>
        </div>
      </footer>

      {/* Reservation booking Form Modal with Wax Seal Receipts */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#faf9f4] border-2 border-[#dec0bb] max-w-2xl w-full p-6 md:p-10 relative rounded-none shadow-2xl overflow-hidden"
              id="booking-modal-panel"
            >
              {/* Outer classic outline margin */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#dec0bb]/30 pointer-events-none" />

              {/* Close button */}
              <button 
                onClick={() => {
                  setIsBookingModalOpen(false);
                  setReservationReceipt(null);
                }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#6b0d0a] focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Conditional viewport: Show form OR show confirmed receipt */}
              {!reservationReceipt ? (
                <form onSubmit={handleConfirmReservation} className="flex flex-col gap-5">
                  
                  <div className="text-center border-b border-[#dec0bb]/60 pb-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#a6392f]">Heritage Escapes Portal</span>
                    <h3 className="font-serif text-2xl font-bold text-[#6b0d0a]">Request Your Sanctuary</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      You are preparing a customized stay in <strong>{selectedRoom.name}</strong>.
                    </p>
                  </div>

                  {/* Standard date select input rows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#8b716e] mb-1">Check-in Date </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="date" 
                          value={bookingForm.checkIn}
                          onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-[#dec0bb] font-sans text-xs focus:outline-none focus:border-[#6b0d0a] rounded-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#8b716e] mb-1">Check-out Date</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="date" 
                          value={bookingForm.checkOut}
                          onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-[#dec0bb] font-sans text-xs focus:outline-none focus:border-[#6b0d0a] rounded-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Traveler details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#8b716e] mb-1">Your Royal Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Alexander Mercer"
                        value={bookingForm.guestName}
                        onChange={(e) => setBookingForm({...bookingForm, guestName: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#dec0bb] font-sans text-xs focus:outline-none focus:border-[#6b0d0a] rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#8b716e] mb-1">Secure Contact Email</label>
                      <input 
                        type="email" 
                        placeholder="yourname@domain.com"
                        value={bookingForm.guestEmail}
                        onChange={(e) => setBookingForm({...bookingForm, guestEmail: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#dec0bb] font-sans text-xs focus:outline-none focus:border-[#6b0d0a] rounded-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Summary verification inside form */}
                  <div className="bg-[#f5f4ef] border border-[#dec0bb]/70 p-4 font-sans text-xs flex flex-col gap-1.5">
                    <div className="flex justify-between font-bold text-[#6b0d0a] border-b border-[#dec0bb]/50 pb-1 mb-1 uppercase text-[9px] tracking-widest">
                      <span>Verification Summary</span>
                      <span>Configured Rates</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Room Selection:</span>
                      <strong>{selectedRoom.name} (${selectedRoom.price}/night)</strong>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Configured Stay Length:</span>
                      <strong>{stayNights} Nights</strong>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Add-ons Included:</span>
                      <strong>{selectedAddonIds.length} Selections</strong>
                    </div>
                  </div>

                  {/* Core Action */}
                  <button 
                    type="submit"
                    className="w-full bg-[#6b0d0a] hover:bg-[#a6392f] text-white text-xs font-bold uppercase tracking-widest py-3.5 mt-2 rounded-none transition-all duration-300 border border-[#6b0d0a]"
                  >
                    Confirm Simulated Reservation
                  </button>

                  <span className="text-[10px] text-gray-400 text-center uppercase tracking-widest block font-medium">
                    🍁 NO PAYMENT REQUIRED • SIMULATED RESERVATION
                  </span>

                </form>
              ) : (
                /* WAX LEAF RESERVATION CONFIRMED VIEW */
                <div className="flex flex-col gap-6">
                  
                  {/* Wax Seal Envelope visual styling */}
                  <div className="bg-white border-2 border-dashed border-[#8b716e] p-6 md:p-8 relative">
                    
                    {/* Aligned Heritage Stamp */}
                    <div className="absolute top-4 right-4 bg-amber-50 border border-amber-200 text-center text-[10px] p-2 leading-none uppercase tracking-widest font-mono text-[#805600] scale-90 w-24">
                      🌴 KASHMIR<br />
                      <span className="font-bold font-serif text-lg text-[#6b0d0a]">1900</span><br />
                      OFFICIAL
                    </div>

                    <div className="text-center pb-6 border-b border-[#dec0bb] flex flex-col gap-1">
                      <span className="text-[10px] text-[#805600] tracking-[0.25em] font-sans font-bold uppercase">
                        Srinagar Heritage Collective
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-[#6b0d0a]">
                        Sanctuary Heritage Receipt
                      </h4>
                      <p className="text-xs text-gray-500 font-mono">
                        CONFIRMATION ID: <span className="font-bold text-gray-900">{reservationReceipt.reservationId}</span>
                      </p>
                    </div>

                    {/* Breakdown details */}
                    <div className="grid grid-cols-2 gap-4 py-6 text-xs text-slate-800 border-b border-[#dec0bb]">
                      
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase block">Distinguished Guest</span>
                        <strong className="text-sm font-serif text-[#1f364a]">{reservationReceipt.guestName}</strong>
                      </div>
                      
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase block">Selected Suite Cabin</span>
                        <strong className="text-sm font-serif text-[#1f364a]">{reservationReceipt.roomName}</strong>
                      </div>

                      <div className="mt-2">
                        <span className="text-[10px] text-gray-400 uppercase block">Arrival at Ghat 7 Jetty</span>
                        <strong className="font-semibold text-gray-900">{reservationReceipt.checkIn}</strong>
                      </div>

                      <div className="mt-2">
                        <span className="text-[10px] text-gray-400 uppercase block">Departure</span>
                        <strong className="font-semibold text-gray-900">{reservationReceipt.checkOut}</strong>
                      </div>

                    </div>

                    {/* Invoice breakdown */}
                    <div className="py-6 flex flex-col gap-2 border-b border-[#dec0bb] text-xs font-sans">
                      <div className="flex justify-between text-gray-600">
                        <span>Total Room Base Cost ({reservationReceipt.totalNights} Nights):</span>
                        <span className="font-mono font-semibold">${reservationReceipt.baseAmount}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Curated Excursions Sum total:</span>
                        <span className="font-mono font-semibold">${reservationReceipt.addonsAmount}</span>
                      </div>

                      <div className="flex justify-between text-sm font-serif font-bold text-[#6b0d0a] pt-3 border-t border-dotted border-[#dec0bb]">
                        <span>Grand Total Invoice Amount:</span>
                        <span className="font-mono text-base text-[#6b0d0a]">${reservationReceipt.grandTotal}</span>
                      </div>
                    </div>

                    {/* Wax Stamp Graphic element at bottom center */}
                    <div className="pt-8 flex flex-col items-center justify-center gap-3 relative">
                      
                      {/* Virtual Wax Stamp */}
                      <div className="relative w-24 h-24 bg-[#a6392f] rounded-full border-4 border-[#85221b] shadow-md flex items-center justify-center text-white scale-100 flex-col cursor-help">
                        {/* Golden leaf inner mask */}
                        <div className="absolute inset-2 border border-dashed border-white/20 rounded-full" />
                        <span className="text-3xl filter drop-shadow-md select-none">🍁</span>
                        <span className="text-[7px] font-bold text-[#fdba49] uppercase tracking-widest mt-1 select-none font-sans">
                          WAX SEALED
                        </span>
                      </div>

                      <div className="text-center font-sans text-[10px] text-[#57423f]">
                        <strong className="block font-bold">RESERVATION SECURED</strong>
                        <span className="text-gray-400">Authentic J&amp;K Heritage Stamp {reservationReceipt.stampCode}</span>
                      </div>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        alert('Printed successfully! We have also dispatched a complimentary physical copy with raw pampore saffron threads in envelope to your simulated email address.');
                      }}
                      className="flex-1 bg-[#1f364a] hover:bg-[#364d62] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-none transition-all duration-300"
                    >
                      Print Receipt
                    </button>
                    <button 
                      onClick={() => {
                        setIsBookingModalOpen(false);
                        setReservationReceipt(null);
                      }}
                      className="flex-1 bg-[#6b0d0a] hover:bg-[#a6392f] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-none transition-all"
                    >
                      Return to Sanctuary
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
