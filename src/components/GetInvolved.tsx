import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export default function GetInvolved() {
  const { t } = useLanguage();
  const [isVolunteerForm, setIsVolunteerForm] = useState(false);
  const [isVolunteerSuccess, setIsVolunteerSuccess] = useState(false);
  const cards = [
    { title: t('getInvolved.c1.title'), desc: t('getInvolved.c1.desc'), btn: t('getInvolved.c1.btn'), action: 'open-donation' },
    { title: t('getInvolved.c2.title'), desc: t('getInvolved.c2.desc'), btn: t('getInvolved.c2.btn'), action: 'open-volunteer' },
    { title: t('getInvolved.c3.title'), desc: t('getInvolved.c3.desc'), btn: t('getInvolved.c3.btn'), action: 'open-partner' },
    { title: 'Ambassador', desc: 'Represent ESPA Foundation in your community and help us spread awareness and raise funds.', btn: 'Become an Ambassador', action: 'open-ambassador' }
  ];

  return (
    <section id="get-involved" className="bg-[#004B36] py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3 transition-colors duration-300">{t('getInvolved.title')}</h2>
          <p className="text-justify font-sans text-xl font-normal text-white/70 max-w-3xl mx-auto">{t('getInvolved.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-[#003828] p-8 lg:p-6 xl:p-10 rounded-3xl shadow-sm border border-white/5 flex flex-col h-full overflow-hidden transition-colors duration-300">
              <h3 className="text-center font-display text-xl font-bold mb-4 text-white transition-colors duration-300">{card.title}</h3>
              <p className="text-justify font-sans text-white/70 mb-8 flex-grow text-lg lg:text-base xl:text-lg font-normal transition-colors duration-300">{card.desc}</p>
              <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent(card.action)); }} className="w-full bg-white text-[#004B36] py-4 px-4 rounded-full font-bold hover:bg-neutral-200 transition-colors text-base flex items-center justify-center">
                {card.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
