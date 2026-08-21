import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh' | 'fr' | 'es';

interface LanguageContextType {
 lang: Language;
 setLang: (lang: Language) => void;
 t: (key: string) => string;
 dir: 'ltr' | 'rtl';
}

const dict = {
 en: {
 'nav.about': 'About',
 'nav.programs': 'Programs',
 'nav.impact': 'Impact',
 'nav.getInvolved': 'Get Involved',
 'hero.title': 'From Exclusion\nTo Education',
 'hero.subtitle': 'Helping the Deserving Underprivileged Children Get Access to Education; Enabling Them to Learn, Grow, and Reach.',
 'hero.donate': 'Donate Now',
 'hero.story': 'Our Story',
 'hero.stat1': 'Libraries Built',
 'hero.stat2': 'Children Reached',
 'hero.stat3': 'Scholarships',
 'about.tag': 'Our Story',
 'about.title1': 'It started with a single bookshelf in Gilgit.',
 'about.title2': 'Limitless potential. Limited resources.',
 'about.desc2': 'We saw brilliant minds without access to basic educational tools, holding back an entire generation.',
 'about.title3': 'Bridging the gap.',
 'about.desc3': 'Today, we build libraries, fund scholarships, and ensure every child has the chance to write their own story.',
 'programs.title': 'What We Do',
 'programs.subtitle': 'Targeted initiatives designed to remove the barriers between a child and their education.',
 'programs.p1.title': 'Libraries',
 'programs.p1.desc': 'We build modern, fully-equipped libraries in rural schools, providing access to thousands of books and digital learning tools.',
 'programs.p2.title': 'Scholarships',
 'programs.p2.desc': 'Merit and need-based financial support ensuring that no deserving student is forced to drop out due to economic constraints.',
 'programs.p3.title': 'Libraries',
 'programs.p3.desc': 'Mobilizing communities to donate and distribute educational materials to regions where they are needed most.',
 'impact.title': 'Our Impact Map',
 'impact.chart.title': '5-Year Growth',
 'impact.schools': 'Schools Partnered Across the Region',
 'impact.t1': 'Founded in Gilgit with 1 library.',
 'impact.t2': 'Expanded to 5 districts, 2,000+ students reached.',
 'impact.t3': 'Launched National Scholarship Program.',
 'getInvolved.title': 'Get Involved',
 'getInvolved.subtitle': 'There are many ways to support the mission. Join us in making education accessible to all.',
 'getInvolved.c1.title': 'Donate',
 'getInvolved.c1.desc': '100% of your contribution goes directly to funding libraries and scholarships.',
 'getInvolved.c1.btn': 'Make a Donation',
 'getInvolved.c2.title': 'Volunteer',
 'getInvolved.c2.desc': 'Join our on-ground teams or mentor a student virtually from anywhere in the world.',
 'getInvolved.c2.btn': 'Join the Team',
 'getInvolved.c3.title': 'Partner',
 'getInvolved.c3.desc': 'Corporate and institutional partnerships to scale our impact across more regions.',
 'getInvolved.c3.btn': 'Become a Partner',
 'footer.desc': 'A registered non-profit organization dedicated to empowering children through education, libraries, and scholarships.',
 'footer.contact': 'Contact',
 'footer.social': 'Social',
 'footer.subscribe': 'Subscribe to our newsletter',
 'footer.subscribe.desc': 'Get updates on our latest projects and impact.',
 'footer.email': 'Email Address',
 'footer.submit': 'Subscribe',
 'footer.success': 'Thank you for subscribing!'
 },
 zh: {
 'nav.about': '关于我们', 'nav.programs': '我们的项目', 'nav.impact': '社会影响', 'nav.getInvolved': '参与其中',
 'hero.title': '教育改变一切。', 'hero.subtitle': '赋能贫困儿童，帮助他们创造自己的未来。',
 'hero.donate': '立即捐款', 'hero.story': '我们的故事',
 'hero.stat1': '建立的图书馆', 'hero.stat2': '帮助的儿童', 'hero.stat3': '提供的奖学金',
 'about.tag': '我们的故事', 'about.title1': '一切始于吉尔吉特的一个书架。', 'about.title2': '潜力无限，资源有限。',
 'about.desc2': '我们看到聪明的孩子因为缺乏基础教育工具而停滞不前，这拖累了整整一代人。',
 'about.title3': '消除差距。', 'about.desc3': '如今，我们建立图书馆，提供奖学金，确保每个孩子都有机会书写自己的人生。',
 'programs.title': '我们的工作', 'programs.subtitle': '开展有针对性的项目，消除儿童接受教育的障碍。',
 'programs.p1.title': '图书馆', 'programs.p1.desc': '我们在乡村学校建立现代化、设备齐全的图书馆，提供数千册图书和数字学习工具。',
 'programs.p2.title': '奖学金', 'programs.p2.desc': '基于成绩和需求的资金支持，确保没有一个优秀的学生因经济拮据而辍学。',
 'programs.p3.title': '图书捐赠', 'programs.p3.desc': '动员社区捐赠教育物资，并分发到最需要的地区。',
 'impact.title': '我们的影响版图。', 'impact.chart.title': '5年增长', 'impact.schools': '全区合作学校',
 'impact.t1': '在吉尔吉特成立，拥有1个图书馆。', 'impact.t2': '扩展到5个地区，惠及2000多名学生。', 'impact.t3': '启动国家奖学金项目。',
 'getInvolved.title': '参与其中。', 'getInvolved.subtitle': '有很多方式可以支持我们的使命。加入我们，让所有人都能获得教育。',
 'getInvolved.c1.title': '捐赠', 'getInvolved.c1.desc': '您的捐款将100%直接用于资助图书馆和奖学金。', 'getInvolved.c1.btn': '进行捐赠',
 'getInvolved.c2.title': '志愿者', 'getInvolved.c2.desc': '加入我们的地面团队，或在世界任何地方在线辅导学生。', 'getInvolved.c2.btn': '加入团队',
 'getInvolved.c3.title': '合作伙伴', 'getInvolved.c3.desc': '企业和机构合作伙伴关系，以扩大我们在更多地区的影响力。', 'getInvolved.c3.btn': '成为合作伙伴',
 'footer.desc': '一家注册的非营利组织，致力于通过教育、图书馆和奖学金为儿童赋能。',
 'footer.contact': '联系我们', 'footer.social': '社交媒体', 'footer.subscribe': '订阅我们的通讯',
 'footer.subscribe.desc': '获取有关我们最新项目和影响的更新。', 'footer.email': '邮箱地址', 'footer.submit': '订阅', 'footer.success': '感谢您的订阅！'
 },
 fr: {
 'nav.about': 'À propos', 'nav.programs': 'Programmes', 'nav.impact': 'Impact', 'nav.getInvolved': 'S\'impliquer',
 'hero.title': 'L\'éducation change tout.', 'hero.subtitle': 'Donner aux enfants méritants les moyens de construire leur propre avenir.',
 'hero.donate': 'Faire un don', 'hero.story': 'Notre histoire',
 'hero.stat1': 'Bibliothèques construites', 'hero.stat2': 'Enfants aidés', 'hero.stat3': 'Bourses d\'études',
 'about.tag': 'Notre histoire', 'about.title1': 'Tout a commencé avec une seule étagère à Gilgit.', 'about.title2': 'Potentiel illimité. Ressources limitées.',
 'about.desc2': 'Nous avons vu des esprits brillants sans accès aux outils éducatifs de base, freinant toute une génération.',
 'about.title3': 'Combler le fossé.', 'about.desc3': 'Aujourd\'hui, nous construisons des bibliothèques, finançons des bourses et veillons à ce que chaque enfant ait la chance d\'écrire sa propre histoire.',
 'programs.title': 'Ce que nous faisons', 'programs.subtitle': 'Des initiatives ciblées conçues pour supprimer les obstacles entre un enfant et son éducation.',
 'programs.p1.title': 'Bibliothèques', 'programs.p1.desc': 'Nous construisons des bibliothèques modernes et entièrement équipées dans les écoles rurales.',
 'programs.p2.title': 'Bourses d\'études', 'programs.p2.desc': 'Un soutien financier fondé sur le mérite et les besoins pour éviter le décrochage scolaire.',
 'programs.p3.title': 'Collectes de livres', 'programs.p3.desc': 'Mobiliser les communautés pour faire don de matériel éducatif aux régions qui en ont le plus besoin.',
 'impact.title': 'Notre carte d\'impact', 'impact.chart.title': 'Croissance sur 5 ans', 'impact.schools': 'Écoles partenaires dans la région',
 'impact.t1': 'Fondation à Gilgit avec 1 bibliothèque.', 'impact.t2': 'Extension à 5 districts, plus de 2 000 élèves touchés.', 'impact.t3': 'Lancement du programme national de bourses.',
 'getInvolved.title': 'S\'impliquer', 'getInvolved.subtitle': 'Il existe de nombreuses façons de soutenir la mission. Rejoignez-nous.',
 'getInvolved.c1.title': 'Faire un don', 'getInvolved.c1.desc': '100% de votre contribution va directement au financement.', 'getInvolved.c1.btn': 'Faire un don',
 'getInvolved.c2.title': 'Bénévolat', 'getInvolved.c2.desc': 'Rejoignez nos équipes sur le terrain ou encadrez un étudiant virtuellement.', 'getInvolved.c2.btn': 'Rejoindre l\'équipe',
 'getInvolved.c3.title': 'Partenariat', 'getInvolved.c3.desc': 'Partenariats pour étendre notre impact sur d\'autres régions.', 'getInvolved.c3.btn': 'Devenir partenaire',
 'footer.desc': 'Une organisation à but non lucratif dédiée à l\'autonomisation des enfants par l\'éducation.',
 'footer.contact': 'Contact', 'footer.social': 'Réseaux sociaux', 'footer.subscribe': 'Abonnez-vous à notre newsletter',
 'footer.subscribe.desc': 'Recevez des mises à jour sur nos projets.', 'footer.email': 'Adresse e-mail', 'footer.submit': 'S\'abonner', 'footer.success': 'Merci de votre abonnement !'
 },
 es: {
 'nav.about': 'Sobre nosotros', 'nav.programs': 'Programas', 'nav.impact': 'Impacto', 'nav.getInvolved': 'Involúcrate',
 'hero.title': 'La educación lo cambia todo.', 'hero.subtitle': 'Empoderando a niños para construir su propio futuro.',
 'hero.donate': 'Donar ahora', 'hero.story': 'Nuestra historia',
 'hero.stat1': 'Bibliotecas construidas', 'hero.stat2': 'Niños alcanzados', 'hero.stat3': 'Becas',
 'about.tag': 'Nuestra historia', 'about.title1': 'Comenzó con una sola estantería en Gilgit.', 'about.title2': 'Potencial ilimitado. Recursos limitados.',
 'about.desc2': 'Vimos mentes brillantes sin acceso a herramientas educativas básicas, frenando a toda una generación.',
 'about.title3': 'Cerrando la brecha.', 'about.desc3': 'Hoy, construimos bibliotecas, financiamos becas y aseguramos que cada niño tenga la oportunidad de escribir su propia historia.',
 'programs.title': 'Lo que hacemos', 'programs.subtitle': 'Iniciativas enfocadas en eliminar las barreras entre un niño y su educación.',
 'programs.p1.title': 'Bibliotecas', 'programs.p1.desc': 'Construimos bibliotecas modernas y totalmente equipadas en escuelas rurales.',
 'programs.p2.title': 'Becas', 'programs.p2.desc': 'Apoyo financiero basado en el mérito y la necesidad para evitar la deserción escolar.',
 'programs.p3.title': 'Colectas de libros', 'programs.p3.desc': 'Movilizando comunidades para donar y distribuir materiales educativos en las regiones que más los necesitan.',
 'impact.title': 'Nuestro mapa de impacto', 'impact.chart.title': 'Crecimiento de 5 años', 'impact.schools': 'Escuelas asociadas en la región',
 'impact.t1': 'Fundado en Gilgit con 1 biblioteca.', 'impact.t2': 'Expansión a 5 distritos, llegando a más de 2000 estudiantes.', 'impact.t3': 'Lanzamiento del Programa Nacional de Becas.',
 'getInvolved.title': 'Involúcrate', 'getInvolved.subtitle': 'Hay muchas formas de apoyar la misión. Únete a nosotros.',
 'getInvolved.c1.title': 'Donar', 'getInvolved.c1.desc': 'El 100% de tu contribución se destina a financiar bibliotecas y becas.', 'getInvolved.c1.btn': 'Hacer una donación',
 'getInvolved.c2.title': 'Voluntariado', 'getInvolved.c2.desc': 'Únete a nuestros equipos en el terreno o asesora a un estudiante virtualmente.', 'getInvolved.c2.btn': 'Únete al equipo',
 'getInvolved.c3.title': 'Ser socio', 'getInvolved.c3.desc': 'Asociaciones corporativas e institucionales para escalar nuestro impacto.', 'getInvolved.c3.btn': 'Conviértete en socio',
 'footer.desc': 'Una organización sin fines de lucro dedicada a empoderar a los niños a través de la educación.',
 'footer.contact': 'Contacto', 'footer.social': 'Redes sociales', 'footer.subscribe': 'Suscríbete a nuestro boletín',
 'footer.subscribe.desc': 'Recibe actualizaciones sobre nuestros últimos proyectos e impacto.', 'footer.email': 'Correo electrónico', 'footer.submit': 'Suscribirse', 'footer.success': '¡Gracias por suscribirte!'
 }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
 const [lang, setLang] = useState<Language>('en');

 const t = (key: string) => {
 return (dict[lang as keyof typeof dict] as any)?.[key] || (dict['en'] as any)[key] || key;
 };

 const dir = 'ltr';

 return (
 <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
 <div dir={dir}>{children}</div>
 </LanguageContext.Provider>
 );
}

export function useLanguage() {
 const context = useContext(LanguageContext);
 if (context === undefined) {
 throw new Error('useLanguage must be used within a LanguageProvider');
 }
 return context;
}
