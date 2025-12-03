'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { 
  Mic, Zap, ShieldCheck, ChevronLeft, Menu, X, User, 
  Facebook, Instagram, Mail, Phone, Send, MessageCircle, 
  Box
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-white selection:bg-primary/30 overflow-x-hidden">
      
      {/* --- Navigation Bar --- */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
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
          <div className="absolute top-16 left-0 w-full bg-surface border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-fade-in">
            <button onClick={() => scrollToSection('how-it-works')} className="text-right text-gray-300 hover:text-white py-2">איך זה עובד</button>
            <button onClick={() => scrollToSection('waitlist')} className="text-right text-gray-300 hover:text-white py-2">הרשמה לעדכונים</button>
            <Link href="/login" className="text-right text-primary font-bold py-2">כניסה למשתמשים</Link>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative pt-20 pb-32 px-6 text-center overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-primary tracking-widest uppercase mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
          Alpha V0.1
        </div>

        <h1 className="text-5xl font-black tracking-tighter mb-6 leading-[1.1]">
         מעלים הילוך<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">בשיח הישראלי</span>
        </h1>
        
        <p className="text-muted text-lg leading-relaxed mb-10 max-w-xs mx-auto">
         הרשת החברתית-קולית הראשונה לנהגים. שומרים על ערנות, מכירים את האחר 
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            href="/topics" 
            className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            נסו את הדמו עכשיו
            <ChevronLeft size={20} />
          </Link>
          <button 
            onClick={() => scrollToSection('waitlist')}
            className="w-full bg-surface text-gray-300 font-medium py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all active:scale-95"
          >
            הצטרפות לרשימת המתנה
          </button>
        </div>
      </header>

      {/* --- How It Works Section --- */}
      <section id="how-it-works" className="py-20 px-6 bg-surface/30 border-y border-white/5">
        <h2 className="text-2xl font-bold text-center mb-12">איך זה עובד?</h2>
        
        <div className="space-y-12">
          <FeatureCard 
            icon={<Mic className="w-8 h-8 text-primary" />}
            title="בוחרים עמדה."
            desc="בוחרים נושא שבוער בנו -דת מדינה ימין ושמאל וכל דבר שמפחדים לריב בו במשפחה."
          />
          <FeatureCard 
            icon={<Box className="w-8 h-8 text-yellow-400" />}
            title="יוצאים מתיבת התהודה"
            desc="האלגוריתם שלנו מוצא לכם את מי שהאלגוריתם של הרשתות החברתיות מסתיר מכם  וחושב בדיוק ההפך."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-green-400" />}
            title="מתווכחים בטוח"
            desc="דיון ענייני שמשאיר אותנו עירניים בנהיגה ומאוחדים במדינה"
          />
        </div>
      </section>

      {/* --- Waitlist Section --- */}
      <section id="waitlist" className="py-24 px-6 relative">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">רוצים להבין מה אתה התפקיד שלכם בסיפור ?</h2>
            <p className="text-muted">
              הירשמו עכשיו כדי להיות האנשים שבונים את Debate Drive! 
            </p>
            <p className="text-muted">
             אם אתם אנשים שאוהבים לדבר על הנושאים שמפחדים לדבר עליהם בין חברים בואו לנצל את זה ולהציל חיים .
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-white/5 bg-background">
        <div className="max-w-sm mx-auto space-y-10">
          
          {/* Socials */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">עקבו אחרינו לעדכונים</h4>
            <div className="flex justify-center gap-6">
               <SocialLink href="https://chat.whatsapp.com/EKoagLXksrSHWa90UtM6e8" icon={<MessageCircle size={24} />} label="WhatsApp" color="hover:text-green-500" />
               <SocialLink href="https://t.me/+GQU-YtQPL0tlNjhk" icon={<Send size={24} />} label="Telegram" color="hover:text-blue-400" />
               <SocialLink href="#" icon={<Facebook size={24} />} label="Facebook" color="hover:text-blue-600" />
               <SocialLink href="https://www.instagram.com/debatesdrive/" icon={<Instagram size={24} />} label="Instagram" color="hover:text-pink-500" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-3 pt-6 border-t border-white/5">
             <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">צרו קשר ישיר</h4>
             
             <a href="mailto:debatesdrive@gmail.com" className="flex items-center justify-center gap-2 text-lg font-medium hover:text-primary transition">
               <Mail size={18} />
               debatesdrive@gmail.com
             </a>
             
             <a href="tel:+972505854505" className="flex items-center justify-center gap-2 text-lg font-medium hover:text-primary transition">
               <Phone size={18} />
               050-585-4505
             </a>
          </div>

          {/* Legal */}
          <div className="text-center text-xs text-gray-600 pt-6">
            <p className="mb-2">© 2024 Debate Drive Alpha.</p>
            <div className="flex justify-center gap-4">
              {/* <a href="#" className="hover:text-gray-400">תנאי שימוש</a> */}
              <span className="text-gray-800">|</span>
              {/* <a href="#" className="hover:text-gray-400">פרטיות</a> */}
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

// --- Sub-Components ---

function SocialLink({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) {
  return (
    <a href={href} className={`bg-surface p-3 rounded-xl border border-white/5 text-gray-400 transition-all hover:scale-110 hover:border-white/20 ${color}`} aria-label={label}>
      {icon}
    </a>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted leading-relaxed">{desc}</p>
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
      alert("שגיאה. נסה שוב.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-surface/50 border border-green-500/20 rounded-2xl p-8 text-center animate-fade-in shadow-2xl">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">תודה, {name}!</h3>
        <p className="text-gray-300 mb-6">
          פרטיך נשמרו. ניצור קשר כשהגרסה המלאה תהיה מוכנה.
        </p>
        
        <div className="w-full h-px bg-white/10 my-6" />

        <p className="text-sm text-gray-400 mb-4 font-bold">בינתיים, בואו לראות איך זה עובד:</p>
        
        <Link 
            href="/topics" 
            className="w-full block bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-bold shadow-glow transition active:scale-95"
        >
            כניסה לאתר (גרסת דמו)
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-6 rounded-2xl border border-white/5 shadow-2xl">
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">שם מלא</label>
        <div className="relative">
            <input 
            type="text" 
            required 
            placeholder="ישראל ישראלי"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition outline-none"
            />
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">מספר טלפון</label>
        <input 
          type="tel" 
          required 
          placeholder="050-0000000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">אימייל</label>
        <input 
          type="email" 
          required 
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition outline-none"
        />
      </div>

      <button 
        disabled={loading}
        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition active:scale-95 disabled:opacity-50 mt-4 shadow-lg"
      >
        {loading ? "שולח..." : "צרפו אותי!"}
      </button>
    </form>
  );
}