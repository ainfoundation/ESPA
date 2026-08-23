import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export default function GetInvolved() {
  const { t } = useLanguage();
  const [isVolunteerForm, setIsVolunteerForm] = useState(false);
  const [isVolunteerSuccess, setIsVolunteerSuccess] = useState(false);
  const cards = [
    { title: t('getInvolved.c1.title'), desc: t('getInvolved.c1.desc'), btn: t('getInvolved.c1.btn') },
    { title: t('getInvolved.c2.title'), desc: t('getInvolved.c2.desc'), btn: t('getInvolved.c2.btn') },
    { title: t('getInvolved.c3.title'), desc: t('getInvolved.c3.desc'), btn: t('getInvolved.c3.btn') }
  ];

  return (
    <section id="get-involved" className="bg-[#004B36] py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-16">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3 transition-colors duration-300">{t('getInvolved.title')}</h2>
          <p className="text-justify font-sans text-xl font-normal text-white/70 max-w-3xl mx-auto">{t('getInvolved.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-[#003828] p-6 md:p-12 rounded-3xl shadow-sm border border-white/5 flex flex-col h-full overflow-hidden transition-colors duration-300">
              {i === 1 ? (
                <div className="flex flex-col h-full relative">
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-center font-display text-lg font-bold mb-2 md:mb-3 text-white transition-colors duration-300">{card.title}</h3>
                    {!isVolunteerForm && !isVolunteerSuccess && (
                      <div className="flex-grow flex flex-col">
                        <p className="text-justify font-sans text-white/70 mb-8 flex-grow text-lg font-normal transition-colors duration-300">{card.desc}</p>
                        <button onClick={() => setIsVolunteerForm(true)} className="w-full bg-white text-[#004B36] py-4 hover:bg-neutral-200 rounded-full font-bold hover:bg-[#003828] :bg-neutral-200 transition-colors">
                          {card.btn}
                        </button>
                      </div>
                    )}
                    {isVolunteerForm && !isVolunteerSuccess && (
                      <form className="flex-grow flex flex-col gap-4 text-sm mt-4" onSubmit={async (e) => { 
                        e.preventDefault(); 
                        const form = e.currentTarget;
                        const formData = new FormData(form);
                        formData.append("access_key", "d1101fbe-2fae-4c4f-8fa1-c096c2e57702");
                        formData.append("subject", "New Volunteer Application");
                        
                        try {
                          const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
                          const data = await res.json();
                          if (data.success) {
                            setIsVolunteerSuccess(true);
                          } else {
                            alert("Something went wrong. Please try again.");
                          }
                        } catch (err) {
                          alert("Network error. Please try again.");
                        }
                      }}>
                        <input type="email" name="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors" />
                        <select name="area_of_interest" required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors bg-[#004B36] text-white">
                          <option value="">Area of Interest</option>
                          <option value="mentoring">Virtual Mentoring</option>
                          <option value="logistics">Library Logistics</option>
                          <option value="teaching">On-ground Teaching</option>
                        </select>
                        <select name="availability" required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors bg-[#004B36] text-white">
                          <option value="">Availability</option>
                          <option value="2-4">2-4 hours/week</option>
                          <option value="5-10">5-10 hours/week</option>
                          <option value="10+">10+ hours/week</option>
                        </select>
                        <div className="mt-auto pt-4 flex gap-2">
                          <button type="button" onClick={() => setIsVolunteerForm(false)} className="w-1/3 bg-white/10 text-white py-4 hover:bg-white/20 rounded-full font-bold hover:bg-neutral-200 :bg-neutral-700 transition-colors">
                            Back
                          </button>
                          <button type="submit" className="w-2/3 bg-white text-[#004B36] py-4 hover:bg-neutral-200 rounded-full font-bold hover:bg-[#003828] :bg-neutral-200 transition-colors">
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                    {isVolunteerSuccess && (
                      <div className="flex-grow flex flex-col items-center justify-center text-center mt-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Welcome to the team!</h4>
                        <p className="text-justify text-[#004B36]/60 mb-8">We'll be in touch shortly with next steps.</p>
                        <button onClick={() => { setIsVolunteerSuccess(false); setIsVolunteerForm(false); }} className="w-full bg-white/10 text-white py-4 hover:bg-white/20 rounded-full font-bold hover:bg-neutral-200 :bg-neutral-700 transition-colors">
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-center font-display text-lg font-bold mb-2 md:mb-3 text-white transition-colors duration-300">{card.title}</h3>
                  <p className="text-justify font-sans text-white/70 mb-8 flex-grow text-lg font-normal transition-colors duration-300">{card.desc}</p>
                  <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent(i === 2 ? "open-partner" : "open-donation")); }} className="w-full bg-white text-[#004B36] py-4 hover:bg-neutral-200 rounded-full font-bold hover:bg-[#003828] :bg-neutral-200 transition-colors">
                    {card.btn}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
