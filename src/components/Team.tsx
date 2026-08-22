import { User, Linkedin } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

const teamMembers = [
  { name: "Shabbir Ahmed", role: "Founder | Chief-in-Patron", bio: "Guides the strategic vision and provides foundational support for ESPA's overarching mission.", linkedin: "https://www.linkedin.com/in/shaaaaabbir/" },
  { name: "Rameez Taj", role: "General Secretary", bio: "Oversees all operational initiatives and ensures smooth execution of programs across the foundation.", linkedin: "https://www.linkedin.com/in/rameez-taj-962a4a28a/" },
  { name: "Ashfaq Jan", role: "Assistant General Sec.", bio: "Supports day-to-day operations and coordinates closely with the General Secretary on key programs.", linkedin: "https://www.linkedin.com/in/ashaq-jan-738723287" },
  { name: "Ali Hasnain", role: "Treasurer", bio: "Manages financial planning, transparent fund allocation, and the organization's fiscal health.", linkedin: "https://www.linkedin.com/in/ali-hasnain-695b88257/" },
  { name: "Aitzaz Rahim", role: "Information Secretary", bio: "Directs internal and external communications, public relations, and media outreach.", linkedin: "https://www.linkedin.com/in/aitzaz-rahim-551777213/" },
  { name: "Azhan Khan", role: "Member", bio: "Actively contributes to the foundation's core initiatives and community outreach projects.", linkedin: "#" },
  { name: "Akbar Ali", role: "Member", bio: "Dedicated team member supporting various educational and organizational activities.", linkedin: "#" }
];

export default function Team() {
  const { t } = useLanguage();
  return (
    <section id="team" className="bg-[#004B36] py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-16">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-3 text-white">Meet Our Team</h2>
          <p className="text-justify font-sans text-xl text-white/80 max-w-3xl mx-auto">The dedicated individuals behind ESPA Foundation's mission.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className={`bg-[#003828] rounded-3xl p-8 border border-white/5 shadow-sm hover:shadow-md transition-all duration-300 group ${
                i === 0
                  ? 'md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-center gap-4 md:gap-6 max-w-6xl mx-auto w-full'
                  : 'flex flex-col items-center text-center'
              }`}
            >
              <div className={`flex items-center justify-center rounded-full shrink-0 bg-neutral-200 border-4 border-[#004B36] shadow-sm ${i === 0 ? 'w-40 h-40 md:w-56 md:h-56' : 'w-40 h-40 mb-4 md:mb-6'}`}>
                <User className="text-[#004B36]/30 w-1/2 h-1/2" />
              </div>
              <div className={i === 0 ? 'text-center sm:text-left flex-1' : 'flex flex-col items-center'}>
                <h3 className={`font-display font-bold text-white mb-1 ${i === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{member.name}</h3>
                <p className={`text-sm font-semibold text-white mb-4 uppercase tracking-wider ${i === 0 ? "text-center sm:text-left" : "text-center"}`}>{member.role}</p>
                <p className={`text-white/80 leading-relaxed mb-6 ${i === 0 ? "text-center sm:text-left text-lg" : "text-center text-sm"}`}>{member.bio}</p>
                <div className={`flex w-full ${i === 0 ? "justify-center sm:justify-start" : "justify-center"}`}>
                  <a href={member.linkedin} target={member.linkedin !== "#" ? "_blank" : "_self"} rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors group/link">
                    <Linkedin className="w-5 h-5 text-white/50 group-hover/link:text-white transition-colors" />
                  </a>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
