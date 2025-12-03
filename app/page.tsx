'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { 
  Mic, Zap, ShieldCheck, PlayCircle, Menu, X, User, 
  Facebook, Instagram, Mail, Phone, Send, MessageCircle, 
  Box, Star 
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // נעילת גלילה כשהסרטון פתוח
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVideoOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-white selection:bg-primary/30 overflow-x-hidden" dir="rtl">
      
      {/* --- Navigation Bar --- */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[430px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="text-primary w-6 h-6" />
            <span className="font-bold text-xl tracking-tight">DebateDrive</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-300 hover:text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-surface border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-fade-in z-50">
            <button onClick={() => scrollToSection('how-it-works')} className="text-right text-gray-300 hover:text-white py-2">איך זה עובד</button>
            <button onClick={() => scrollToSection('waitlist')} className="text-right text-gray-300 hover:text-white py-2">הרשמה לעדכונים</button>
            <Link href="/login" className="text-right text-primary font-bold py-2">כניסה למשתמשים</Link>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative pt-16 pb-24 px-6 text-center overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-primary tracking-widest uppercase mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
          Alpha V0.1
        </div>

        <h1 className="text-5xl font-black tracking-tight mb-6 leading-[1.15]">
          מעלים הילוך <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-blue-200">בשיח הישראלי</span>
        </h1>
        
        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xs mx-auto font-medium">
          הרשת החברתית-קולית הראשונה לנהגים. שומרים על ערנות, מכירים את האחר.
        </p>

        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          {/* כפתור שמפעיל את הסרטון */}
          <button 
            onClick={() => setIsVideoOpen(true)}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            נסו את הדמו עכשיו
            <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={() => scrollToSection('waitlist')}
            className="w-full bg-surface text-gray-300 font-medium py-4 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all active:scale-95"
          >
            הצטרפות לרשימת המתנה
          </button>
        </div>
      </header>

      {/* --- How It Works Section --- */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-surface/30 to-background border-y border-white/5">
        <h2 className="text-3xl font-bold text-center mb-12">איך זה עובד?</h2>
        
        <div className="space-y-12 max-w-sm mx-auto">
          <FeatureCard 
            icon={<Mic className="w-8 h-8 text-primary" />}
            title="בוחרים עמדה"
            desc="בוחרים נושא שבוער בנו - דת מדינה, ימין ושמאל, וכל דבר שמפחדים לריב בו במשפחה."
          />
          <FeatureCard 
            icon={<Box className="w-8 h-8 text-yellow-400" />}
            title="יוצאים מתיבת התהודה"
            desc="האלגוריתם שלנו מוצא לכם את מי שהאלגוריתם של הרשתות החברתיות מסתיר מכם וחושב בדיוק ההפך."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-green-400" />}
            title="מתווכחים בטוח"
            desc="דיון ענייני שמשאיר אותנו עירניים בנהיגה ומאוחדים במדינה."
          />
        </div>
      </section>

      {/* --- Waitlist Section --- */}
      <section id="waitlist" className="py-24 px-6 relative">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">רוצים להבין מה התפקיד שלכם בסיפור?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              הירשמו עכשיו כדי להיות השגרירים הראשונים של Debate Drive.
            </p>
            <p className="text-gray-400 leading-relaxed">
              אם אתם אוהבים לדבר על מה שקורה במדינה ורוצים להשפיע על השיח בישראל זה בדיוק המקום בשבילכם.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-sm mx-auto space-y-10">
          
          {/* Socials */}
          <div className="text-center">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">עקבו אחרינו לעדכונים</h4>
            <div className="flex justify-center gap-5">
               <SocialLink href="https://chat.whatsapp.com/EKoagLXksrSHWa90UtM6e8" icon={<MessageCircle size={22} />} label="WhatsApp" color="hover:text-green-500 hover:border-green-500/30" />
               <SocialLink href="https://t.me/+GQU-YtQPL0tlNjhk" icon={<Send size={22} />} label="Telegram" color="hover:text-blue-400 hover:border-blue-400/30" />
               <SocialLink href="https://www.instagram.com/debatesdrive/" icon={<Instagram size={22} />} label="Instagram" color="hover:text-pink-500 hover:border-pink-500/30" />
               <SocialLink href="#" icon={<Facebook size={22} />} label="Facebook" color="hover:text-blue-600 hover:border-blue-600/30" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-4 pt-8 border-t border-white/5">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">צרו קשר ישיר</h4>
             
             <a href="mailto:debatesdrive@gmail.com" className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition group">
               <div className="p-2 bg-white/5 rounded-full group-hover:bg-primary/20 transition">
                  <Mail size={16} />
               </div>
               <span className="text-sm">debatesdrive@gmail.com</span>
             </a>
             
             <a href="tel:+972505854505" className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition group">
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-primary/20 transition">
                   <Phone size={16} />
                </div>
                <span className="text-sm">050-585-4505</span>
             </a>
          </div>

          {/* Legal */}
          <div className="text-center text-[10px] text-gray-600 pt-6">
            <p className="mb-2">© 2024 Debate Drive Alpha.</p>
            <div className="flex justify-center gap-4">
              <span className="text-gray-600">כל הזכויות שמורות</span>
            </div>
          </div>

        </div>
      </footer>

      {/* --- YouTube Modal Overlay --- */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/xeMo1vF9Kqs?autoplay=1&rel=0" 
              title="DebateDrive Demo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sub-Components ---

function SocialLink({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) {
  return (
    <a href={href} className={`bg-surface/50 p-3.5 rounded-xl border border-white/5 text-gray-400 transition-all hover:scale-110 hover:shadow-lg hover:bg-surface ${color}`} aria-label={label}>
      {icon}
    </a>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 group">
      <div className="w-16 h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center shadow-lg group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm px-2">{desc}</p>
    </div>
  );
}

function WaitlistForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "waitlist"), {
        name,
        phone,
        email,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("אירעה שגיאה בשליחה, אנא נסו שנית.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-surface/50 border border-green-500/20 rounded-2xl p-8 text-center animate-fade-in shadow-2xl backdrop-blur-sm">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <ShieldCheck className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">תודה, {name}!</h3>
        <p className="text-gray-300 mb-6 text-sm">
          פרטיך נשמרו. ניצור קשר כשהגרסה המלאה תהיה מוכנה.
        </p>
        
        <div className="w-full h-px bg-white/10 my-6" />

        <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-wide">בינתיים, בואו לראות איך זה עובד:</p>
        
        <button 
            onClick={() => document.querySelector<HTMLButtonElement>('button[class*="bg-primary"]')?.click()}
            className="w-full block bg-primary hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition active:scale-95"
        >
            צפו בדמו שוב
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-surface p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient inside form */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div>
        <label className="block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wider">שם מלא</label>
        <div className="relative group">
            <input 
            type="text" 
            required 
            placeholder="ישראל ישראלי"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition outline-none"
            />
            <User className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wider">מספר טלפון</label>
        <div className="relative group">
          <input 
            type="tel" 
            required 
            placeholder="050-0000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition outline-none"
          />
          <Phone className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wider">אימייל</label>
        <div className="relative group">
          <input 
            type="email" 
            required 
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition outline-none"
          />
          <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" />
        </div>
      </div>

      <button 
        disabled={loading}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition active:scale-95 disabled:opacity-50 mt-2 shadow-xl flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="animate-pulse">שולח...</span>
        ) : (
          <>
            <span>צרפו אותי!</span>
            <Send size={16} />
          </>
        )}
      </button>
      <p className="text-[10px] text-center text-gray-600 mt-4">
        *לא נעביר את הפרטים שלך לאף גורם צד שלישי.
      </p>
    </form>
  );
}