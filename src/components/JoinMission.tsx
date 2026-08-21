
import { useLanguage } from '../contexts/LanguageContext';
import EditableText from './EditableText';

export default function JoinMission() {
  const { t } = useLanguage();

  return (
    <section className="bg-white transition-colors duration-300 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center bg-[#004B36]/5 rounded-3xl p-6 md:p-12 border border-[#004B36]/10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-[#004B36] tracking-tight mb-2 md:mb-3">
          <EditableText id="join_mission_title" defaultText="Join Our Mission" as="span" />
        </h2>
        <div className="font-sans text-lg md:text-xl text-[#004B36]/80 mb-10 max-w-2xl mx-auto text-justify">
          <EditableText 
            id="join_mission_desc" 
            defaultText="Interested in volunteering with the ESPA Foundation? We'd love to have you on board to help make education accessible to all." 
            as="span" 
          />
        </div>
        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            window.dispatchEvent(new CustomEvent("open-volunteer")); 
          }} 
          className="bg-[#004B36] text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-[#003828] transition-colors"
        >
          Volunteer With Us
        </button>
      </div>
    </section>
  );
}
