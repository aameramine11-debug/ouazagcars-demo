import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, ArrowUpRight, ArrowRight, Check, ShieldCheck, Clock3, MapPin, MessageCircle, CarFront, ChevronDown, Fuel, Users, Gauge, Instagram } from 'lucide-react';
import './styles.css';

// IMPORTANT: remplace ce numéro par le WhatsApp de ton agence.
// Format international sans +, espace ni zéro initial. Exemple Maroc: 2126XXXXXXXX
const WHATSAPP_NUMBER = '212662839966';

const cars = [
  { name: 'Hyundai Accent 2025', color: 'Gris', category: 'Berline · Confort', price: 350, gearbox: 'Automatique', fuel: 'Essence', seats: 5, image: '/cars/accent-gris.png', description: '' },
  { name: 'Dacia Logan', color: 'Gris Nardo', category: 'Berline · Économique', price: 300, gearbox: 'Manuelle', fuel: 'Diesel', seats: 5, image: '/cars/logan-gris-nardo.png', description: '' },
  { name: 'Dacia Sandero Stepway', color: 'Kaki', category: 'Citadine · Stepway', price: 300, gearbox: 'Manuelle', fuel: 'Diesel', seats: 5, image: '/cars/stepway-kaki.png', description: '' },
  { name: 'Renault Clio 5', color: 'Gris foncé', category: 'Citadine · Économique', price: 300, gearbox: 'Manuelle', fuel: 'Diesel', seats: 5, image: '/cars/clio-gris.png', description: '' },
  { name: 'Hyundai Accent 2025', color: 'Noir', category: 'Berline · Confort', price: 350, gearbox: 'Automatique', fuel: 'Essence', seats: 5, image: '/cars/accent-noir.png', description: '' },
  { name: 'Dacia Logan', color: 'Noir', category: 'Berline · Économique', price: 300, gearbox: 'Manuelle', fuel: 'Diesel', seats: 5, image: '/cars/logan-noir.png', description: '' },
  { name: 'Dacia Sandero Stepway', color: 'Blanc', category: 'Citadine · Stepway', price: 300, gearbox: 'Manuelle', fuel: 'Diesel', seats: 5, image: '/cars/stepway-blanc.png', description: '' },
  { name: 'Dacia Sandero Stepway', color: 'Gris argenté', category: 'Citadine · Stepway', price: 300, gearbox: 'Manuelle', fuel: 'Diesel', seats: 5, image: '/cars/stepway-argent.png', description: '' }
];
const featuredCars = cars.slice(0, 4);

const translations = {
  en: {
    'Notre flotte':'Our fleet','Nos services':'Our services','Découvrir Agadir':'Discover Agadir','Devis WhatsApp':'WhatsApp quote',
    'LOCATION DE VOITURE · AGADIR, MAROC':'CAR RENTAL · AGADIR, MOROCCO','La route fait partie':'The road is part','du voyage.':'of the journey.',
    'Découvrez Agadir et la côte atlantique en toute liberté. Une voiture adaptée à votre séjour, un contact direct et un devis clair avant de réserver.':'Explore Agadir and the Atlantic coast freely. Choose a car for your stay, contact us directly and get a clear quote before booking.',
    'Réserver ma voiture':'Book my car','Découvrir la flotte':'Explore our fleet','Assurance incluse':'Insurance included','Conditions confirmées avant départ':'Terms confirmed before departure','Contact direct':'Direct contact','Échange par WhatsApp':'Contact us on WhatsApp','Disponibles tous les jours':'Available every day',
    "L'EXPÉRIENCE OUAZAG":"THE OUAZAG EXPERIENCE",'Plus de liberté.':'More freedom.','Moins de contraintes.':'Fewer constraints.','Parlons de votre voyage':'Let’s plan your trip',
    'CHOISISSEZ VOTRE COMPAGNE DE ROUTE':'CHOOSE YOUR RIDE','Notre':'Our','flotte.':'fleet.','Tarif journalier':'Daily rate','Couleur :':'Colour:','places':'seats','Choisir':'Choose','Découvrir toutes les voitures':'Discover all cars',
    'Livraison gratuite':'Free delivery','Tarif communiqué à l\'avance':'Upfront pricing','Voitures entretenues':'Well-maintained cars','Organiser ma livraison':'Arrange delivery',
    'VOTRE DEMANDE EN QUELQUES INSTANTS':'YOUR REQUEST IN A FEW STEPS','Prêt à prendre':'Ready to hit','la route ?':'the road?','Simple et sans paiement en ligne':'Simple, no online payment','DEMANDE DE DEVIS':'REQUEST A QUOTE','Véhicule souhaité':'Preferred car','Lieu de prise en charge':'Pick-up location','Date de départ':'Pick-up date','Date de retour':'Return date','Votre nom':'Your name','Téléphone':'Phone','Nom complet':'Full name','Continuer sur WhatsApp':'Continue on WhatsApp','Total estimé':'Estimated total','Remise longue durée appliquée : −50 DH/jour':'Long-rental discount applied: −50 DH/day',
    'Dès 15 jours :':'From 15 days:','Dès 15 jours, remise de 50 DH/jour sur tous les véhicules.':'From 15 days, save 50 DH/day on every car.',
    'OFFRE LONGUE DURÉE':'LONG-STAY OFFER','Dès 15 jours de location · Tous les véhicules':'From 15 rental days · All vehicles','PRIX & CONDITIONS':'PRICES & CONDITIONS','Un tarif clair.':'Clear pricing.','Aucune surprise.':'No surprises.','PROMOTION':'SPECIAL OFFER','Pour toute location de 15 jours ou plus.':'For rentals of 15 days or more.','FRANCHISE D’ASSURANCE':'INSURANCE EXCESS','Le montant et les conditions applicables sont à confirmer directement avec l’agence avant de valider la location.':'The amount and applicable conditions must be confirmed directly with the agency before confirming the rental.','Confirmer sur WhatsApp':'Confirm on WhatsApp',
    'L’ATLANTIQUE VOUS ATTEND':'THE ATLANTIC AWAITS','Questions':'Frequently','fréquentes.':'asked questions.','Retour à l’accueil':'Back to home','Toutes nos':'All our','voitures.':'cars.'
  },
  ar: {
    'Notre flotte':'أسطول سياراتنا','Nos services':'خدماتنا','Découvrir Agadir':'اكتشف أكادير','Devis WhatsApp':'عرض سعر عبر واتساب',
    'LOCATION DE VOITURE · AGADIR, MAROC':'كراء السيارات · أكادير، المغرب','La route fait partie':'الطريق جزء','du voyage.':'من الرحلة.',
    'Découvrez Agadir et la côte atlantique en toute liberté. Une voiture adaptée à votre séjour, un contact direct et un devis clair avant de réserver.':'اكتشف أكادير والساحل الأطلسي بحرية. اختر السيارة المناسبة لإقامتك وتواصل معنا مباشرة للحصول على عرض سعر واضح قبل الحجز.',
    'Réserver ma voiture':'احجز سيارتي','Découvrir la flotte':'اكتشف السيارات','Assurance incluse':'التأمين مشمول','Conditions confirmées avant départ':'تأكيد الشروط قبل الانطلاق','Contact direct':'تواصل مباشر','Échange par WhatsApp':'التواصل عبر واتساب','Disponibles tous les jours':'متاحون يومياً',
    "L'EXPÉRIENCE OUAZAG":'تجربة أوزاغ','Plus de liberté.':'حرية أكبر.','Moins de contraintes.':'قيود أقل.','Parlons de votre voyage':'لنتحدث عن رحلتك',
    'CHOISISSEZ VOTRE COMPAGNE DE ROUTE':'اختر سيارة رحلتك','Notre':'أسطول','flotte.':'سياراتنا.','Tarif journalier':'السعر اليومي','Couleur :':'اللون:','places':'مقاعد','Choisir':'اختر','Découvrir toutes les voitures':'اكتشف جميع السيارات',
    'Livraison gratuite':'توصيل مجاني','Tarif communiqué à l\'avance':'السعر معروف مسبقاً','Voitures entretenues':'سيارات تتم صيانتها','Organiser ma livraison':'تنظيم التوصيل',
    'VOTRE DEMANDE EN QUELQUES INSTANTS':'طلبك في خطوات بسيطة','Prêt à prendre':'هل أنت مستعد','la route ?':'للانطلاق؟','Simple et sans paiement en ligne':'بسهولة ودون دفع إلكتروني','DEMANDE DE DEVIS':'طلب عرض سعر','Véhicule souhaité':'السيارة المطلوبة','Lieu de prise en charge':'مكان الاستلام','Date de départ':'تاريخ الاستلام','Date de retour':'تاريخ الإرجاع','Votre nom':'الاسم الكامل','Téléphone':'الهاتف','Nom complet':'الاسم الكامل','Continuer sur WhatsApp':'المتابعة عبر واتساب','Total estimé':'المجموع التقديري','Remise longue durée appliquée : −50 DH/jour':'تخفيض المدة الطويلة: ناقص 50 درهم لليوم',
    'Dès 15 jours :':'ابتداءً من 15 يوماً:','Dès 15 jours, remise de 50 DH/jour sur tous les véhicules.':'ابتداءً من 15 يوماً، تخفيض 50 درهماً في اليوم على جميع السيارات.',
    'OFFRE LONGUE DURÉE':'عرض المدة الطويلة','Dès 15 jours de location · Tous les véhicules':'ابتداءً من 15 يوماً · جميع السيارات','PRIX & CONDITIONS':'الأسعار والشروط','Un tarif clair.':'أسعار واضحة.','Aucune surprise.':'بدون مفاجآت.','PROMOTION':'عرض خاص','Pour toute location de 15 jours ou plus.':'للحجوزات لمدة 15 يوماً أو أكثر.','FRANCHISE D’ASSURANCE':'مبلغ التحمل التأميني','Le montant et les conditions applicables sont à confirmer directement avec l’agence avant de valider la location.':'يرجى تأكيد المبلغ والشروط مباشرة مع الوكالة قبل تأكيد الحجز.','Confirmer sur WhatsApp':'التأكيد عبر واتساب',
    'L’ATLANTIQUE VOUS ATTEND':'المحيط الأطلسي في انتظارك','Questions':'الأسئلة','fréquentes.':'الشائعة.','Retour à l’accueil':'العودة إلى الرئيسية','Toutes nos':'جميع','voitures.':'السيارات.'
  }
};
function tr(text, lang) { return translations[lang]?.[text] || text; }


const faqs = [
  ['Quels documents faut-il pour louer ?', 'Un permis de conduire valide et une pièce d’identité (CIN ou passeport). Les conditions finales sont confirmées par WhatsApp avant la location. Contact : 09:00–23:00.'],
  ['Quel est l’âge minimum du conducteur ?', 'Les conditions d’âge et d’ancienneté du permis sont à confirmer avec l’agence avant de valider votre demande.'],
  ['La livraison est-elle gratuite ?', 'La livraison est gratuite à l’aéroport d’Agadir Al Massira (AGA), à Taghazout et au centre-ville d’Agadir. Confirmez l’horaire avec l’agence sur WhatsApp.'],
  ['Le carburant est-il inclus ?', 'Le carburant n’est pas inclus dans le tarif indicatif. Les modalités de restitution sont précisées lors de la confirmation.'],
  ['Dois-je payer en ligne ?', 'Non. Le site prépare une demande sur WhatsApp : vous échangez directement avec l’agence et confirmez les conditions avant de vous engager.'],
  ['Quel est le montant de la franchise d’assurance ?', 'La franchise indiquée est de 8 000 DH. Contactez Ouazag Cars pour confirmer les conditions exactes applicables au véhicule choisi avant de réserver.'],
  ['Le prix affiché est-il définitif ?', 'Les prix indiqués sont des tarifs de départ à titre indicatif. Le tarif final dépend des dates, de la durée et de la disponibilité du véhicule.']
];

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function rentalDays(start, end) {
  if (!start || !end) return 0;
  const from = new Date(`${start}T12:00:00`);
  const to = new Date(`${end}T12:00:00`);
  const diff = Math.round((to - from) / 86400000);
  return diff > 0 ? diff : 0;
}
function dailyPrice(car, days) {
  return days >= 15 ? car.price - 50 : car.price;
}
function FleetPage() {
  const tx = (text) => tr(text, 'fr');
  return (
    <>
      <header className="topbar">
        <a className="brand" href="/" aria-label="Ouazag Cars accueil"><img className="brand-logo" src="/ouazagcars-logo.png" alt="Ouazag Cars — Location automobile" /></a>
        <nav className="fleet-page-nav"><a href="/#home">Accueil</a><a href="/#reservation">Réserver</a><a className="nav-cta" href={waLink('Bonjour Ouazag Cars, je souhaite demander un devis de location.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> {tx('Devis WhatsApp')}</a></nav>
      </header>
      <main className="all-fleet-page section-pad">
        <div className="section-kicker">OUAZAG CARS · AGADIR</div>
        <h1 className="all-fleet-title">Toutes nos <em>voitures.</em></h1>
        <p className="all-fleet-intro">Découvrez les 8 véhicules de notre flotte. Hyundai Accent : 350 DH/jour. Autres modèles : 300 DH/jour. Pour toute location de 15 jours ou plus, bénéficiez de 50 DH de remise par jour.</p>
        <div className="car-grid all-cars-grid">
          {cars.map((car) => <article className="car-card" key={`${car.name}-${car.color}`}>
            <div className="car-photo"><img src={car.image} alt={`${car.name} en couleur ${car.color}`} loading="lazy"/><span className="car-tag">{car.color}</span></div>
            <div className="car-info"><div className="car-category">{car.category}</div><h3>{car.name}</h3><div className="car-color">Couleur : {car.color}</div><div className="car-specs"><span><Users size={15}/>{car.seats} places</span><span><Fuel size={15}/>{car.fuel}</span><span>{car.gearbox}</span></div><div className="car-bottom"><div><small>{tx('Tarif journalier')}</small><strong>{car.price} DH<small> / jour</small></strong><small className="discount-note">Dès 15 jours : {car.price-50} DH/jour</small></div><a className="text-link" href={`/?car=${encodeURIComponent(`${car.name} (${car.color})`)}#reservation`}>Réserver <ArrowUpRight size={16}/></a></div></div>
          </article>)}
        </div>
        <section className="fleet-franchise"><div><span className="section-kicker">FRANCHISE D’ASSURANCE</span><h2>Franchise annoncée : <em>8 000 DH</em></h2><p>Les conditions exactes doivent être confirmées par l’agence avant la réservation.</p></div><a className="btn btn-gold" href={waLink('Bonjour Ouazag Cars, je souhaite confirmer la franchise d’assurance de 8 000 DH et ses conditions.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Confirmer sur WhatsApp</a></section>
        <div className="fleet-more"><a className="btn btn-ghost" href="/">Retour à l’accueil <ArrowRight size={17}/></a></div>
      </main>
      <SiteFooter/>
      <a className="floating-wa" href={waLink('Bonjour Ouazag Cars, je souhaite obtenir un devis de location.')} target="_blank" rel="noreferrer" aria-label="Contacter Ouazag Cars sur WhatsApp"><MessageCircle/></a>
    </>
  );
}


function PageHeader({ active = '' }) {
  return <header className="topbar page-topbar">
    <a className="brand" href="/" aria-label="Ouazag Cars accueil"><img className="brand-logo" src="/ouazagcars-logo.png" alt="Ouazag Cars" /></a>
    <nav className="page-nav"><a href="/flotte">Véhicules</a><a href="/services">Nos services</a><a href="/decouvrir">Découvrir Agadir</a><a href="/faq">FAQ</a><a href="/#promo">Prix & promos</a><a className="nav-cta" href={waLink('Bonjour Ouazag Cars, je souhaite demander un devis de location.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Devis WhatsApp</a></nav>
  </header>;
}
function SiteFooter() {
  return <footer className="footer jdl-footer">
    <div className="footer-columns">
      <div className="footer-about"><a className="brand" href="/"><img className="brand-logo" src="/ouazagcars-logo.png" alt="Ouazag Cars" /></a><p>Agence locale de location de voiture à Agadir. Livraison gratuite à l’aéroport AGA, Taghazout et centre-ville. Devis rapide sur WhatsApp, prix clairs et conditions confirmées avant départ.</p></div>
      <div className="footer-column"><h3>CONTACT</h3><a href="https://wa.me/212662839966" target="_blank" rel="noreferrer">+212 662 839 966</a><a href="mailto:ouazagcars@gmail.com">ouazagcars@gmail.com</a><span>COMPLEXE SOUS RUE SOUK MG N:45 AGADIR</span><a href="https://www.google.com/maps/search/?api=1&query=COMPLEXE+SOUS+RUE+SOUK+MG+N45+AGADIR" target="_blank" rel="noreferrer">Voir l’agence sur Google Maps</a><strong>7j/7 · 09:00–23:00</strong></div>
      <div className="footer-column footer-links"><h3>LIENS UTILES</h3><a href="/flotte">Véhicules</a><a href="/services">Nos services</a><a href="/#promo">Prix & promos</a><a href="/decouvrir">Découvrir Agadir</a><a href="/faq">FAQ</a><a href="/#contact">Contact</a><a href="/faq#conditions">Conditions</a></div>
      <div className="footer-column footer-social"><h3>SUIVEZ-NOUS</h3><a className="social-pill" href="https://www.instagram.com/ouazagcars/" target="_blank" rel="noreferrer"><Instagram size={17}/> @ouazagcars</a><a href="https://www.facebook.com/share/19axHV9rTY/?mibextid=wwXIfr" target="_blank" rel="noreferrer">Facebook</a><p>Devis, disponibilités et confirmation écrite via WhatsApp.</p><a className="footer-wa" href={waLink('Bonjour Ouazag Cars, je souhaite obtenir un devis.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Contacter sur WhatsApp</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Ouazag Cars. Tous droits réservés.</span><span>Location de voiture · Agadir · Maroc</span></div>
  </footer>;
}
function StandalonePage({ type }) {
  const [faqOpen, setFaqOpen] = useState(0);
  const pageInfo = {
    decouvrir: { kicker: 'L’ATLANTIQUE VOUS ATTEND', title: <>Découvrir <em>Agadir.</em></>, intro: 'Explorez la côte atlantique et les paysages du Sud à votre rythme avec Ouazag Cars.' },
    services: { kicker: 'UN SERVICE PENSÉ POUR VOUS', title: <>Nos <em>services.</em></>, intro: 'Un service de location simple, avec des conditions communiquées avant confirmation.' },
    faq: { kicker: 'BESOIN D’INFORMATIONS ?', title: <>Questions <em>fréquentes.</em></>, intro: 'Retrouvez les réponses utiles avant de réserver votre véhicule.' }
  }[type];
  return <><PageHeader active={type}/><main className="standalone-page"><section className="standalone-hero"><div className="section-kicker">{pageInfo.kicker}</div><h1>{pageInfo.title}</h1><p>{pageInfo.intro}</p><a className="btn btn-gold" href={waLink('Bonjour Ouazag Cars, je souhaite obtenir des informations sur la location.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Devis WhatsApp</a></section>
    {type === 'decouvrir' && <section className="section-pad standalone-content"><div className="destination-grid"><article className="destination dest-agadir"><span>VILLE & FRONT DE MER</span><h3>Agadir Centre</h3><p>La baie d’Agadir, la promenade et les adresses du centre-ville.</p></article><article className="destination dest-taghazout"><span>SURF & VILLAGE CÔTIER</span><h3>Taghazout</h3><p>Maisons colorées, cafés face à l’océan et ambiance surf.</p></article><article className="destination dest-aghroud"><span>ÉVASION ATLANTIQUE</span><h3>Plage d’Aghroud</h3><p>Une plage paisible pour profiter du littoral et du coucher de soleil.</p></article></div><div className="standalone-note"><h2>Partez à votre rythme.</h2><p>Choisissez une voiture adaptée à votre séjour et demandez à l’agence de confirmer les conditions de votre trajet.</p><a className="btn btn-gold" href="/flotte">Découvrir les voitures <ArrowRight size={17}/></a></div></section>}
    {type === 'services' && <section className="section-pad standalone-content"><div className="services-page-grid"><article className="service-tile"><Check/><h2>Livraison gratuite</h2><p>Aéroport Agadir Al Massira (AGA), Taghazout et centre-ville d’Agadir, selon confirmation avec l’agence.</p></article><article className="service-tile"><ShieldCheck/><h2>Franchise d’assurance</h2><strong className="franchise-amount">8 000 DH</strong><p>Franchise annoncée : 8 000 DH. Confirmez les conditions exactes applicables au véhicule choisi avant de signer.</p></article><article className="service-tile"><Clock3/><h2>Horaires flexibles</h2><p>Contactez l’agence tous les jours de 09:00 à 23:00 pour vérifier les disponibilités.</p></article><article className="service-tile"><MessageCircle/><h2>Devis WhatsApp</h2><p>Envoyez les dates, le modèle souhaité et le lieu de prise en charge. La réservation est confirmée uniquement après réponse de l’agence.</p></article><article className="service-tile"><CarFront/><h2>Flotte entretenue</h2><p>Hyundai Accent, Dacia Logan, Dacia Sandero Stepway et Renault Clio 5, selon disponibilité.</p></article><article className="service-tile"><MapPin/><h2>Agence à Agadir</h2><p>COMPLEXE SOUS RUE SOUK MG N:45 AGADIR.</p></article></div><div className="standalone-note"><h2>Prix & promotion</h2><p>Hyundai Accent : 350 DH/jour. Autres véhicules : 300 DH/jour. Dès 15 jours de location, remise de 50 DH/jour, soit une remise appliquée à chaque journée de location dès le seuil atteint.</p><a className="btn btn-gold" href="/#promo">Voir les prix <ArrowRight size={17}/></a></div></section>}
    {type === 'faq' && <section className="section-pad standalone-content" id="conditions"><div className="faq-list">{faqs.map(([q,a],i)=><div className={faqOpen===i?'faq-item active':'faq-item'} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span>{q}</span><ChevronDown/></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div><div className="standalone-note"><h2>Une autre question ?</h2><p>Contactez directement Ouazag Cars pour confirmer les tarifs, la franchise de 8 000 DH et les conditions applicables à votre véhicule.</p><a className="btn btn-gold" href={waLink('Bonjour Ouazag Cars, j’ai une question concernant la location et la franchise de 8 000 DH.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Poser ma question sur WhatsApp</a></div></section>}
  </main><SiteFooter/><a className="floating-wa" href={waLink('Bonjour Ouazag Cars, je souhaite obtenir un devis de location.')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('fr');
  const tx = (text) => tr(text, lang);
  const [faqOpen, setFaqOpen] = useState(0);
  const [form, setForm] = useState(() => {
    const requestedCar = new URLSearchParams(window.location.search).get('car');
    const defaultCar = 'Hyundai Accent 2025 (Noir)';
    return { car: cars.some(c => `${c.name} (${c.color})` === requestedCar) ? requestedCar : defaultCar, pickup: 'Aéroport Agadir (AGA)', start: '', end: '', name: '', phone: '' };
  });

  useEffect(() => {
    if (window.location.hash === '#reservation' && new URLSearchParams(window.location.search).has('car')) {
      window.setTimeout(() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' }), 150);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const selectedCar = cars.find(c => `${c.name} (${c.color})` === form.car) || cars[0];
  const rentalDays = form.start && form.end ? Math.ceil((new Date(form.end + 'T12:00:00') - new Date(form.start + 'T12:00:00')) / 86400000) : 0;
  const dailyRate = rentalDays >= 15 ? selectedCar.price - 50 : selectedCar.price;
  const estimatedTotal = rentalDays > 0 ? rentalDays * dailyRate : 0;
  const bookingMessage = `Bonjour Ouazag Cars, je souhaite demander un devis de location.\n` +
    `Véhicule : ${form.car}\n` +
    `Lieu de prise en charge : ${form.pickup}\n` +
    `Date de départ : ${form.start || 'À préciser'}\n` +
    `Date de retour : ${form.end || 'À préciser'}\n` +
    `Durée : ${rentalDays > 0 ? rentalDays + ' jour(s)' : 'À confirmer'}\n` +
    `Tarif indicatif : ${rentalDays > 0 ? dailyRate + ' DH/jour' : selectedCar.price + ' DH/jour'}\n` +
    `Total indicatif : ${estimatedTotal > 0 ? estimatedTotal + ' DH' : 'À confirmer'}\n` +
    `Nom : ${form.name || 'À préciser'}\n` +
    `Téléphone : ${form.phone || 'À préciser'}\n` +
    `Merci de me confirmer la disponibilité et le tarif final.`;

  const closeMenu = () => setMenuOpen(false);
  const today = new Date().toISOString().slice(0,10);
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  if (currentPath === '/flotte') return <FleetPage />;
  if (['/decouvrir','/services','/faq'].includes(currentPath)) return <StandalonePage type={currentPath.slice(1)} />;
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Ouazag Cars accueil">
          <img className="brand-logo" src="/ouazagcars-logo.png" alt="Ouazag Cars — Location automobile" />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <a href="/flotte" onClick={closeMenu}>Véhicules</a>
          <a href="/services" onClick={closeMenu}>Nos services</a>
          <a href="/#promo" onClick={closeMenu}>Prix & promos</a>
          <a href="/faq" onClick={closeMenu}>FAQ</a>
          <a href="/decouvrir" onClick={closeMenu}>Découvrir Agadir</a>
          <a href="/#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href={waLink('Bonjour Ouazag Cars, je souhaite demander un devis de location.')} target="_blank" rel="noreferrer" onClick={closeMenu}><MessageCircle size={16}/> Devis WhatsApp</a>
        </nav>
        <label className="language-picker" aria-label="Language / Langue / اللغة"><span>🌐</span><select value={lang} onChange={e => { setLang(e.target.value); document.documentElement.dir = e.target.value === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = e.target.value; }}><option value="fr">FR</option><option value="en">EN</option><option value="ar">AR</option></select></label>
      </header>
      <div className="promo-banner"><span>{tx('OFFRE LONGUE DURÉE')}</span><strong>−50 DH / JOUR</strong><span>{tx('Dès 15 jours de location · Tous les véhicules')}</span></div>

      <main dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <section className="hero" id="home">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/cars/accent-gris.png" aria-hidden="true">
            <source src="/ouazagcars-hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow"><span /> {tx('LOCATION DE VOITURE · AGADIR, MAROC')}</div>
            <h1>{tx('La route fait partie')} <em>{tx('du voyage.')}</em></h1>
            <p className="hero-copy">{tx('Découvrez Agadir et la côte atlantique en toute liberté. Une voiture adaptée à votre séjour, un contact direct et un devis clair avant de réserver.')}</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#reservation">{tx('Réserver ma voiture')} <ArrowUpRight size={18}/></a>
              <a className="btn btn-ghost" href="#flotte">{tx('Découvrir la flotte')} <ArrowRight size={17}/></a>
            </div>
            <div className="hero-trust">
              <div><ShieldCheck/><span><b>{tx('Assurance incluse')}</b><small>{tx('Conditions confirmées avant départ')}</small></span></div>
              <div><Clock3/><span><b>{tx('Contact direct')}</b><small>{tx('Échange par WhatsApp')}</small></span></div>
              <div><Clock3/><span><b>09:00 – 23:00</b><small>{tx('Disponibles tous les jours')}</small></span></div>
            </div>
          </div>
        </section>

        <section className="intro section-pad reveal" id="apropos">
          <div className="section-kicker">L'EXPÉRIENCE OUAZAG</div>
          <div className="intro-grid">
            <h2>Plus de liberté.<br/><em>Moins de contraintes.</em></h2>
            <div className="intro-text"><p>Votre séjour commence dès votre arrivée. Choisissez votre véhicule, envoyez vos dates sur WhatsApp et recevez une confirmation écrite avec les conditions de location.</p><a className="text-link" href={waLink('Bonjour Ouazag Cars, je souhaite connaître vos conditions de location.')} target="_blank" rel="noreferrer">Parlons de votre voyage <ArrowUpRight size={17}/></a></div>
          </div>
          <div className="stats-row">
            <div><strong>24/7</strong><span>Demandes possibles à tout moment</span></div>
            <div><strong>0</strong><span>Paiement en ligne sur ce site</span></div>
            <div><strong>100%</strong><span>Conditions confirmées avant validation</span></div>
          </div>
        </section>

        <section className="franchise-section section-pad reveal" id="promo">
          <div className="franchise-copy"><div className="section-kicker">{tx('PRIX & CONDITIONS')}</div><h2>{tx('Un tarif clair.')}<br/><em>{tx('Aucune surprise.')}</em></h2><p>Hyundai Accent à 350 DH/jour. Les autres véhicules à 300 DH/jour.</p><div className="franchise-promo"><span className="promo-label">{tx('PROMOTION')}</span><strong>−50 DH / JOUR</strong><span>{tx('Pour toute location de 15 jours ou plus.')}</span></div></div>
          <div className="franchise-card"><ShieldCheck size={30}/><span>{tx('FRANCHISE D’ASSURANCE')}</span><strong>8 000 DH</strong><p>{tx('Le montant et les conditions applicables sont à confirmer directement avec l’agence avant de valider la location.')}</p><a className="btn btn-gold" href={waLink('Bonjour Ouazag Cars, je souhaite confirmer les conditions de franchise d’assurance de 8 000 DH et la promotion longue durée.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> {tx('Confirmer sur WhatsApp')}</a></div>
        </section>

        <section className="fleet section-pad" id="flotte">
          <div className="section-head reveal"><div><div className="section-kicker">{tx('CHOISISSEZ VOTRE COMPAGNE DE ROUTE')}</div><h2>{tx('Notre')} <em>{tx('flotte.')}</em></h2></div><p>Choisissez parmi nos Hyundai Accent, Dacia Sandero Stepway, Dacia Logan et Renault Clio 5.</p></div>
          <div className="car-grid">
            {featuredCars.map((car, i) => <article className="car-card reveal" style={{'--delay': `${i * 100}ms`}} key={`${car.name}-${car.color}`}>
              <div className="car-photo"><img src={car.image} alt={`${car.name}, voiture de location`} loading="lazy"/><span className="car-tag">{car.color}</span><button className="round-arrow" aria-label={`Demander ${car.name}`} onClick={() => { setForm({...form, car: `${car.name} (${car.color})`}); document.getElementById('reservation').scrollIntoView({behavior:'smooth'}); }}><ArrowUpRight/></button></div>
              <div className="car-info"><div className="car-category">{car.category}</div><h3>{car.name}</h3><div className="car-color">Couleur : {car.color}</div><div className="car-specs"><span><Users size={15}/>{car.seats} places</span><span><Fuel size={15}/>{car.fuel}</span></div><div className="car-bottom"><div><small>{tx('Tarif journalier')}</small><strong>{car.price} DH<small> / jour</small></strong><small className="discount-note">Dès 15 jours : {car.price - 50} DH/jour</small></div><button className="text-link" onClick={() => { setForm({...form, car: `${car.name} (${car.color})`}); document.getElementById('reservation').scrollIntoView({behavior:'smooth'}); }}>{tx('Choisir')} <ArrowRight size={16}/></button></div></div>
            </article>)}
          </div>
          <div className="fleet-more"><a className="btn btn-ghost" href="/flotte">{tx('Découvrir toutes les voitures')} <ArrowRight size={17}/></a></div>
          <p className="price-note">Hyundai Accent : 350 DH/jour · Autres modèles : 300 DH/jour. Dès 15 jours, remise de 50 DH/jour sur tous les véhicules.</p>
        </section>

        <section className="testimonials section-pad reveal" id="temoignages">
          <div className="section-head testimonial-head">
            <div><div className="section-kicker">VOTRE CONFIANCE COMPTE</div><h2>Ils parlent de <em>leur expérience.</em></h2></div>
            <p>La qualité du service se construit avec chaque voyage et chaque retour client.</p>
          </div>
          <div className="testimonial-grid">
            <article className="testimonial-card">
              <div className="testimonial-stars" aria-label="Exemple de note 5 étoiles">★★★★★</div>
              <p>« Réservation simple et réponse rapide sur WhatsApp. La voiture était propre et prête à l’heure convenue. »</p>
              <div className="testimonial-person"><span className="testimonial-avatar">M</span><span><strong>Client — exemple</strong><small>Avis illustratif à confirmer</small></span></div>
            </article>
            <article className="testimonial-card">
              <div className="testimonial-stars" aria-label="Exemple de note 5 étoiles">★★★★★</div>
              <p>« Accueil agréable à Agadir et prise en charge facile. Les informations sur le prix étaient claires dès le départ. »</p>
              <div className="testimonial-person"><span className="testimonial-avatar">S</span><span><strong>Client — exemple</strong><small>Avis illustratif à confirmer</small></span></div>
            </article>
            <article className="testimonial-card">
              <div className="testimonial-stars" aria-label="Exemple de note 5 étoiles">★★★★★</div>
              <p>« Très pratique pour se déplacer pendant le séjour. Communication fluide et restitution du véhicule sans complication. »</p>
              <div className="testimonial-person"><span className="testimonial-avatar">A</span><span><strong>Client — exemple</strong><small>Avis illustratif à confirmer</small></span></div>
            </article>
          </div>
          <div className="testimonial-cta"><span>Vous avez déjà loué avec nous ?</span><a className="btn btn-gold" href={waLink('Bonjour Ouazag Cars, je souhaite partager mon avis sur mon expérience de location.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Partager mon avis</a></div>
        </section>

        <section className="reservation section-pad" id="reservation">
          <div className="reservation-copy reveal"><div className="section-kicker">VOTRE DEMANDE EN QUELQUES INSTANTS</div><h2>Prêt à prendre <em>la route ?</em></h2><p>Remplissez les informations ci-contre. WhatsApp s'ouvrira avec votre demande préremplie. L'envoi du message et la confirmation se font directement dans WhatsApp.</p><div className="reservation-note"><MessageCircle/><span><b>Simple et sans paiement en ligne</b><small>La demande ne confirme pas automatiquement la disponibilité du véhicule.</small></span></div></div>
          <form className="booking-form reveal" onSubmit={(e) => { e.preventDefault(); window.open(waLink(bookingMessage), '_blank', 'noopener,noreferrer'); }}>
            <div className="form-title"><span>{tx('DEMANDE DE DEVIS')}</span><CarFront/></div>
            <label>{tx('Véhicule souhaité')}<select value={form.car} onChange={e => setForm({...form, car:e.target.value})}>{cars.map((c,i)=><option key={i} value={`${c.name} (${c.color})`}>{c.name} — {c.color}</option>)}</select></label>
            <label>{tx('Lieu de prise en charge')}<input value={form.pickup} onChange={e => setForm({...form,pickup:e.target.value})} placeholder="Ex. Aéroport Agadir (AGA)" required/></label>
            <div className="form-row"><label>{tx('Date de départ')}<input type="date" min={today} value={form.start} onChange={e=>setForm({...form,start:e.target.value,end:form.end && form.end <= e.target.value ? '' : form.end})} required/></label><label>{tx('Date de retour')}<input type="date" min={form.start || today} value={form.end} onChange={e=>setForm({...form,end:e.target.value})} required/></label></div>
            <div className="form-row"><label>{tx('Votre nom')}<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={tx('Nom complet')} required/></label><label>{tx('Téléphone')}<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+212 ..." required/></label></div>
            {rentalDays > 0 && <div className="estimate"><div><span>{rentalDays} jour(s) de location</span><b>{dailyRate} DH / jour</b></div>{rentalDays >= 15 && <p>{tx('Remise longue durée appliquée : −50 DH/jour')}</p>}<div className="estimate-total"><span>{tx('Total estimé')}</span><strong>{estimatedTotal.toLocaleString('fr-FR')} DH</strong></div></div>}
            <button className="btn btn-gold form-submit" type="submit">{tx('Continuer sur WhatsApp')} <ArrowUpRight size={18}/></button>
            <p className="form-legal">En continuant, vous ouvrez WhatsApp pour envoyer votre demande à l'agence. Aucune réservation n'est confirmée avant réponse.</p>
          </form>
        </section>

        
      </main>

      <div id="contact"><SiteFooter/></div>
      <a className="floating-wa" href={waLink('Bonjour Ouazag Cars, je souhaite obtenir un devis de location.')} target="_blank" rel="noreferrer" aria-label="Contacter Ouazag Cars sur WhatsApp"><MessageCircle/></a>
    </>
  );
}
createRoot(document.getElementById('root')).render(<App />);