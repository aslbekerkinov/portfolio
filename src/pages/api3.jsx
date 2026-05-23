import React, { useState } from 'react';
import axios from 'axios';

function Translator() {
  const [text, setText] = useState(''); // Kiritilgan matn
  const [translatedText, setTranslatedText] = useState(''); // Tarjima natijasi
  const [sourceLang, setSourceLang] = useState('en'); // Qaysi tildan
  const [targetLang, setTargetLang] = useState('ru'); // Qaysi tilga
  const [loading, setLoading] = useState(false);
  const [sinonim, setSinonim]=useState('');
  const [sinonim2, setSinonim2]=useState('');
  const[status ,setStatus]=useState('');
  const handleTranslate = async () => {
    if (!text) return;  
    setLoading(true);
    setTranslatedText(''); 

    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,  
          langpair: `${sourceLang}|${targetLang}`
        }
      });
      //https://api.mymemory.translated.net/get?q=hello&langpair=en|ru
      if (response.data && response.data.responseData) {
        setTranslatedText(response.data.responseData.translatedText);
        setSinonim(response.data.matches[1].translation);
        setSinonim2(response.data.matches[2].translation)
        setStatus(response.data.responseData.responseStatus);
      
      } else {
        alert("Tarjima topilmadi.");
      }
    } catch (err) {
      console.error("Xatolik tafsiloti:", err);
       alert("Xatolik yuz berdi. Internet aloqasini tekshiring.");
    }
    setLoading(false);
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div style={{
      padding: '30px', maxWidth: '600px', margin: '50px auto', 
      fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', 
      borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: '#333'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>🌐 Kafolatlanmagan Tarjimon</h2>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
        <select 
          value={sourceLang} 
          onChange={(e) => setSourceLang(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' }}
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
          style={{ padding: '10px 15px', background: '#f1f1f1', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
          title="Tillarni almashtirish"
        >
          🔄
        </button>

        <select 
          value={targetLang} 
          onChange={(e) => setTargetLang(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' }}
        >
          <option value="uz">O'zbek tili (UZ)</option>
          <option value="en">Ingliz tili (EN)</option>
          <option value="ru">Rus tili (RU)</option>
          <option value="it">Italyan tili (IT)</option>
          <option value="tr">Turk tili (TR)</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <textarea
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Matnni kiriting..."
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', resize: 'none', boxSizing: 'border-box' }}
        />
      </div>
      <button 
        onClick={handleTranslate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
          transition: 'background 0.3s'
        }}
      >
        {loading ? "Tarjima qilinmoqda..." : "Tarjima qilish"}
      </button>

      {/* Natija oynasi */}
      {translatedText && (
        <div style={{ 
          marginTop: '25px', padding: '15px', backgroundColor: '#f8f9fa', 
          borderRadius: '8px', borderLeft: '5px solid #34495e'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#34495e' }}>Tarjimasi:</h4>
          <p style={{ fontSize: '18px', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
          {translatedText}</p>
          <p>
            <small>{sinonim}</small>
            <small>, {sinonim2}</small>
            <small>{status}</small>
          </p> 
        </div>
      )}
    </div>
  );
}

export default Translator;