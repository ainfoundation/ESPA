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
                <>
                  <h3 className="text-center font-display text-lg font-bold mb-2 md:mb-3 text-white transition-colors duration-300">{card.title}</h3>
                  <p className="text-justify font-sans text-white/70 mb-8 flex-grow text-lg font-normal transition-colors duration-300">{card.desc}</p>
                  <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-volunteer")); }} className="w-full bg-white text-[#004B36] py-4 hover:bg-neutral-200 rounded-full font-bold hover:bg-[#003828] :bg-neutral-200 transition-colors">
                    {card.btn}
                  </button>
                </>
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
