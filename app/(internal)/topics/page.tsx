'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const TOPICS = [
  { id: 't1', label: 'רפורמה משפטית' },
  { id: 't2', label: 'תחבורה ציבורית בשבת' },
  { id: 't3', label: 'בינה מלאכותית' },
  { id: 't4', label: 'יוקר המחיה' },
];

const STANCES = ['בעד', 'נגד', 'נייטרלי', 'לא מעוניין'];

export default function TopicsPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = (topicId: string, stance: string) => {
    setPreferences(prev => ({ ...prev, [topicId]: stance }));
  };

  const checkCompletion = () => {
    if (Object.keys(preferences).length === TOPICS.length) {
      setShowSaveModal(true);
    } else {
        alert("נא לבחור עמדה לכל הנושאים");
    }
  };

  const handleSave = async (permanent: boolean) => {
    setLoading(true);
    
    // If user is logged in AND requested permanent save
    if (permanent && auth.currentUser) {
      try {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          stances: preferences
        });
      } catch (e) {
        console.error("Save error", e);
      }
    } else {
      // Save to Session Storage (Works for guests/demo users)
      sessionStorage.setItem('temp_stances', JSON.stringify(preferences));
    }
    
    router.push('/match');
    setLoading(false);
  };

  if (showSaveModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
        <div className="bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-white">לשמור את הבחירות?</h3>
          <div className="flex flex-col gap-3">
            {/* Only show 'Save to Profile' if logged in */}
            {auth.currentUser && (
              <button 
                  onClick={() => handleSave(true)}
                  className="bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-bold transition"
              >
                  כן, שמרו בפרופיל שלי
              </button>
            )}
            
            <button 
                onClick={() => handleSave(false)}
                className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold border border-white/5 transition"
            >
                {auth.currentUser ? "לא, רק לפעם הזאת" : "המשך לחיפוש (אורח)"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-32 overflow-y-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-white">על מה מדברים?</h2>
      <p className="text-muted mb-8 text-base">סמן את עמדתך כדי שנמצא לך יריב.</p>

      <div className="space-y-6">
        {TOPICS.map((topic) => (
          <div key={topic.id} className="bg-surface p-5 rounded-2xl border border-white/5 shadow-card">
            <h3 className="font-bold text-lg mb-4 text-white border-b border-white/5 pb-2">{topic.label}</h3>
            <div className="grid grid-cols-2 gap-2">
              {STANCES.map((stance) => (
                <button
                  key={stance}
                  onClick={() => handleSelect(topic.id, stance)}
                  className={`py-3 rounded-lg text-sm font-medium transition-all active:scale-95
                    ${preferences[topic.id] === stance 
                        ? 'bg-primary text-white shadow-glow' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  {stance}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <button 
            onClick={checkCompletion}
            className="w-full max-w-[430px] mx-auto bg-white text-black py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-transform block"
        >
            מצא לי דיון
        </button>
      </div>
    </div>
  );
}