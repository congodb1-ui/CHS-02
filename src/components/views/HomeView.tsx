import React from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  Building2,
  Droplets,
  Zap,
  ShieldCheck,
  Wrench,
  Calendar,
  FileText,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle,
  ClipboardCheck,
  Bot,
  MessageSquareText,
  HelpCircle,
  KeyRound,
  Truck,
  Search,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveTab, setIsBookingModalOpen, setTargetAmenity, notices, openAiWithPrompt, role } = useSociety();

  const heroImage = '/src/assets/images/hero_solitaire_society_1790929946633.jpg';

  const handleOpenAmenity = (amenity: 'pool' | 'gym' | 'clubhouse' | 'play_area') => {
    setTargetAmenity(amenity);
    setIsBookingModalOpen(true);
  };

  const aiUseCases = [
    {
      title: 'Society Bye-Laws & Timings',
      desc: 'Instant lookup of swimming pool dress code, quiet hours after 10 PM, gym access, and guest pass rules without browsing lengthy PDFs.',
      icon: Clock,
      samplePrompt: 'What are the swimming pool timings and dress code rules for residents?',
      badge: 'Rules & Bylaws',
    },
    {
      title: 'Tenant Shifting & Elevator Hours',
      desc: 'Ask allowed elevator shifting hours (11 AM–2 PM & 2 PM–5 PM) to avoid elevator jams during peak office commute times.',
      icon: Truck,
      samplePrompt: 'What are the allowed elevator shifting hours and required police documents for tenants?',
      badge: 'Tenancy',
    },
    {
      title: 'Domestic Water & STP Recycled Telemetry',
      desc: 'Check morning/evening water supply slots (6–9 AM & 6–9 PM), flushing line pressure, or last overhead tank cleaning dates.',
      icon: Droplets,
      samplePrompt: 'What are today\'s domestic water supply timings and how does the STP recycled water work?',
      badge: 'Utilities',
    },
    {
      title: 'Draft Automated Repair Tickets',
      desc: 'AI formats detailed service requests for plumbing, electrical tripping, or lift jerky motion ready to submit on the Helpdesk.',
      icon: Wrench,
      samplePrompt: 'Help me draft an urgent complaint about low water pressure in Tower A master bathroom.',
      badge: 'Helpdesk',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md">
        <div className="relative h-[440px] md:h-[500px] w-full overflow-hidden">
          <img
            src={heroImage}
            alt="Solitaire Cooperative Housing Society Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              // Fallback styling if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 max-w-4xl text-white">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              Registration No. PNA/HSG/TC/12492/2018 · Towers A, B & C
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight mb-3">
              A Peaceful, Well-Managed Community Living at Solitaire CHS
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-6 font-normal">
              2 BHK & 3 BHK premium residences with 100% automated DG backup, an in-house tertiary sewage treatment plant (STP), and seamless digital governance for all residents.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('helpdesk')}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Wrench className="w-4 h-4" />
                <span>Log a Complaint / Service Request</span>
              </button>
              <button
                onClick={() => setActiveTab('amenities')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Amenities & Slots</span>
              </button>
              <button
                onClick={() => setActiveTab('inspection')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <ClipboardCheck className="w-4 h-4 text-teal-300" />
                <span>Daily Inspection & Staff (Day 2)</span>
              </button>
              <button
                onClick={() => setActiveTab('committee')}
                className="px-4 py-2.5 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                <span>Society Bye-Laws</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Society Overview & Towers Configuration */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Society Configuration & Towers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Active residential inventory and progressive infrastructure development across the estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tower A */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">Phase 1</span>
                <h3 className="text-lg font-bold text-slate-900">Tower A (Maple)</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                Active Operations
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              60 Residential units spanning 15 floors. 2 & 3 BHK configurations. 2 Otis passenger elevators + dual utility shafts.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Occupancy: <strong className="text-slate-800 tabular-nums">98%</strong></span>
              <span>Units: <strong className="text-slate-800 tabular-nums">60 / 60</strong></span>
            </div>
          </div>

          {/* Tower B */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">Phase 1</span>
                <h3 className="text-lg font-bold text-slate-900">Tower B (Cedar)</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                Active Operations
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              60 Residential units spanning 15 floors. Premium garden facing balconies. Dedicated service lift with stretcher capacity.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Occupancy: <strong className="text-slate-800 tabular-nums">95%</strong></span>
              <span>Units: <strong className="text-slate-800 tabular-nums">60 / 60</strong></span>
            </div>
          </div>

          {/* Tower C */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider block">Phase 2</span>
                <h3 className="text-lg font-bold text-slate-900">Tower C (Oak)</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-md">
                Handover Prep
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              80 Residential units. Structural completion achieved; final electrical metering and PMC water pipeline tie-ins underway.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Possession: <strong className="text-slate-800">Q1 2027</strong></span>
              <span>Units: <strong className="text-slate-800 tabular-nums">80 Total</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Utilities Showcase (2x2 Grid Layout) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Essential Utilities & Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Zero-downtime mechanical, electrical, and environmental infrastructure.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('utilities')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Open Operations Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Box 1: 24/7 Power */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Standby 100%
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">24/7 Diesel Generator (DG) Backup</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Twin 350 kVA Cummins acoustic generators with automatic changeover switch (AMF). Supplies 100% power to elevators, water pumps, common lighting, and resident emergency backup points.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-100 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Diesel Fuel Level:</span>
                <span className="font-semibold tabular-nums text-slate-900">82% (2,100 Liters Reserve)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Auto-Transfer Latency:</span>
                <span className="font-semibold text-slate-900">7 Seconds</span>
              </div>
            </div>
          </div>

          {/* Box 2: Water & STP */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                Eco-Treated
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Water Supply & In-House STP</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Dual supply via municipal PMC line and borewells. Our tertiary Moving Bed Biofilm Reactor (MBBR) plant cleans 48,000 liters daily for toilet flushing and landscape drip irrigation.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-100 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Daily Water Hours:</span>
                <span className="font-semibold tabular-nums text-slate-900">06:00–09:00 & 18:00–21:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recycled Water Available:</span>
                <span className="font-semibold tabular-nums text-emerald-700">60,000 Liters (Full)</span>
              </div>
            </div>
          </div>

          {/* Box 3: Security & Access */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                24/7 Guarded
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Security Gate & Access Control</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Dual manned checkpoints at Gate A and Gate B. RFID boom barriers for resident vehicles, visitor pre-authorization, and 128 high-definition CCTV cameras across perimeters and lifts.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-100 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Gate A Contact:</span>
                <span className="font-semibold font-mono text-slate-900">+91 20 2748 1101</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Visitor Verification:</span>
                <span className="font-semibold text-slate-900">App Pass & Gate Intercom</span>
              </div>
            </div>
          </div>

          {/* Box 4: Elevators & AMCs */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                Certified
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Elevator Safety & Preventative AMCs</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                6 High-speed gearless Otis lifts operating at 1.75 m/s. Fitted with Automatic Rescue Devices (ARD) and direct audio emergency intercom to the 24/7 guard room.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-100 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Maintenance:</span>
                <span className="font-semibold text-slate-900">Otis Elevator India (Active)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Government Safety Audit:</span>
                <span className="font-semibold text-emerald-700">Valid till Dec 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solitaire AI Assistant & Knowledge Concierge Section */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-lg text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                AI Knowledge Concierge for All Members
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              How Society Members Can Use Solitaire AI on this Website
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Equipped with Solitaire CHS registered bye-laws, live utility schedules, and real-time Google Search grounding. Ask anything 24/7 in plain English or Marathi.
            </p>
          </div>

          <button
            onClick={() => openAiWithPrompt()}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Launch AI Assistant</span>
          </button>
        </div>

        {/* 4 Feature Use-Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiUseCases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/60 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-colors group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-slate-900 rounded-lg text-teal-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold text-teal-300 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                      {useCase.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>

                <button
                  onClick={() => openAiWithPrompt(useCase.samplePrompt)}
                  className="w-full pt-2 border-t border-slate-700/60 text-left text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center justify-between group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span className="truncate">Try this prompt</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Search Grounding Callout */}
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Search className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              <strong>Pune Civic Grounding Active:</strong> Solitaire AI searches Pune Municipal Corporation (PMC) alerts, local Baner/Pashan water cuts, traffic notices, and Maharashtra Co-operative Societies Act statutory guidance.
            </span>
          </div>
          <button
            onClick={() => openAiWithPrompt('Are there any PMC water supply cuts or maintenance announced in Pune Baner area this week?')}
            className="text-teal-400 hover:text-teal-300 font-semibold whitespace-nowrap cursor-pointer hover:underline text-left sm:text-right"
          >
            Check PMC Water Alerts &rarr;
          </button>
        </div>
      </section>

      {/* Announcements & Community Bulletins */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Managing Committee Official Bulletins</h2>
            <p className="text-xs text-slate-500">Important dates, circulars, and community notices.</p>
          </div>
          <button
            onClick={() => setActiveTab('committee')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
          >
            All Circulars
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {notices.map((notice) => (
            <div key={notice.id} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900 hover:text-teal-700 cursor-pointer">
                    {notice.title}
                  </span>
                  {notice.urgent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                      Important
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">{notice.summary}</p>
              </div>
              <div className="text-xs text-slate-400 sm:text-right shrink-0">
                <span className="tabular-nums font-medium text-slate-600">{notice.date}</span>
                <span className="block text-[11px] text-slate-400 capitalize">{notice.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Amenity Booking Teaser Bar */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-teal-300">
            <Sparkles className="w-4 h-4" />
            <span>Community Living Amenities</span>
          </div>
          <h3 className="text-xl font-bold">Reserve Society Facilities in Seconds</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Book morning pool passes, reserve the air-conditioned clubhouse banquet for family events, or check gym peak hours.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => handleOpenAmenity('pool')}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Book Pool Slot
          </button>
          <button
            onClick={() => handleOpenAmenity('clubhouse')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Reserve Banquet Lawn
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className="px-4 py-2 text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
          >
            View All Rules &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
