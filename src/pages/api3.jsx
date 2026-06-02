import React, { useState } from 'react';
import axios from 'axios';

function Translator() {
  const [text, setText] = useState(''); 
  const [translatedText, setTranslatedText] = useState(''); 
  const [sourceLang, setSourceLang] = useState('en'); 
  const [targetLang, setTargetLang] = useState('uz'); 
  const [loading, setLoading] = useState(false);
  const [sinonim, setSinonim] = useState('');
  const [sinonim2, setSinonim2] = useState('');
  const [isSwapHover, setIsSwapHover] = useState(false);
  const [isBtnHover, setIsBtnHover] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;  
    setLoading(true);
    setTranslatedText(''); 
    setSinonim('');
    setSinonim2('');

    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,  
          langpair: `${sourceLang}|${targetLang}`
        }
      });

      if (response.data && response.data.responseData) {
        setTranslatedText(response.data.responseData.translatedText);
        
        if (response.data.matches && response.data.matches.length > 1) {
          setSinonim(response.data.matches[1]?.translation || '');
          setSinonim2(response.data.matches[2]?.translation || '');
        }
      } else {
        alert("Tarjima topilmadi.");
      }
    } catch (err) {
      console.error("Xatolik tafsiloti:", err);
      alert("Xatolik yuz berdi. Internet aloqasini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div style={{
      padding: '35px', 
      maxWidth: '650px', 
      margin: '60px auto', 
      fontFamily: '"Segoe UI", Roboto, sans-serif', 
      backgroundColor: '#ffffff', 
      borderRadius: '16px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
      color: '#2c3e50',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: '700', color: '#1a252f' }}>
        🌐 Kafolatlangan Tarjimon
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', marginBottom: '25px' }}>
        <select 
          value={sourceLang} 
          onChange={(e) => setSourceLang(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '15px', outline: 'none', backgroundColor: '#f8fafc', cursor: 'pointer' }}
        >
          <option value="en">Ingliz tili (EN)</option>
          <option value="ru">Rus tili (RU)</option>
          <option value="uz">O'zbek tili (UZ)</option>
          <option value="it">Italyan tili (IT)</option>
          <option value="tr">Turk tili (TR)</option>
        </select>

        <button 
          onClick={handleSwap}
          type="button"
          onMouseEnter={() => setIsSwapHover(true)}
          onMouseLeave={() => setIsSwapHover(false)}
          style={{ 
            padding: '12px 18px', 
            background: isSwapHover ? '#4f46e5' : '#6366f1', 
            color: '#fff',
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer', 
            fontSize: '18px',
            boxShadow: '0 4px 6px rgba(99, 102, 241, 0.2)',
            transform: isSwapHover ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.2s ease' 
          }}
          title="Tillarni almashtirish"
        >
          🔄
        </button>

        <select 
          value={targetLang} 
          onChange={(e) => setTargetLang(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '15px', outline: 'none', backgroundColor: '#f8fafc', cursor: 'pointer' }}
        >
          <option value="uz">O'zbek tili (UZ)</option>
          <option value="en">Ingliz tili (EN)</option>
          <option value="ru">Rus tili (RU)</option>
          <option value="it">Italyan tili (IT)</option>
          <option value="tr">Turk tili (TR)</option>
        </select>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <textarea
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Matnni kiriting..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ 
            width: '100%', 
            padding: '15px', 
            borderRadius: '12px', 
            border: isFocused ? '2px solid #6366f1' : '2px solid #e2e8f0', 
            boxShadow: isFocused ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : 'none',
            fontSize: '16px', 
            resize: 'none', 
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      <button 
        onClick={handleTranslate}
        disabled={loading}
        onMouseEnter={() => !loading && setIsBtnHover(true)}
        onMouseLeave={() => setIsBtnHover(false)}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: loading ? '#94a3b8' : (isBtnHover ? '#4338ca' : '#4f46e5'),
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: loading ? 'none' : '0 4px 12px rgba(79, 70, 229, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? "Tarjima qilinmoqda..." : "Tarjima qilish"}
      </button>

      {translatedText && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#f1f5f9', 
          borderRadius: '12px', 
          borderLeft: '5px solid #4f46e5'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Tarjimasi:
          </h4>
          <p style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 15px 0', whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#1e293b' }}>
            {translatedText}
          </p>
          
          {(sinonim || sinonim2) && (
            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '10px', marginTop: '10px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>Muqobil variantlar: </span>
              <span style={{ fontSize: '13px', color: '#475569', fontStyle: 'italic' }}>
                {[sinonim, sinonim2].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Translator;