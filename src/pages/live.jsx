// import { useState } from 'react';

// function LiveInput() {
//   const [matn, setMatn] = useState('');

//   return (
//     <div style={{ padding: '20px', marginTop: '20px' }}>
//       <h3>Jonli Matn yozish:</h3>
     
//       <input 
//         type="text" 
//         placeholder="Ismingizni yozing..."
//         value={matn}
//         onChange={(e) => setMatn(e.target.value)} 
//         style={{ padding: '10px', fontSize: '16px', width: '250px' }}
//       />

//       <h4 style={{ color: 'green' }}>Siz yozayotgan matn: {matn}</h4>
//     </div>
//   );
// }

// export default LiveInput;
import { useState } from 'react';

function LiveInput() {
  const [matn, setMatn] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ 
      padding: '30px', 
      marginTop: '40px',
      maxWidth: '400px',
      margin: '40px auto', 
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      textAlign: 'center',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ 
        color: '#2c3e50', 
        marginBottom: '20px', 
        fontSize: '20px',
        fontWeight: '600'
      }}>
        Jonli Matn yozish:
      </h3>
      
      <input 
        type="text" 
        placeholder="Ismingizni yozing..."
        value={matn}
        onChange={(e) => setMatn(e.target.value)} 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ 
          padding: '12px 16px', 
          fontSize: '16px', 
          width: '100%', 
          boxSizing: 'border-box',
          borderRadius: '10px',
          border: isFocused ? '2px solid #6366f1' : '2px solid #e2e8f0',
          boxShadow: isFocused ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : 'none',
          outline: 'none',
          transition: 'all 0.3s ease',
          marginBottom: '20px',
          color: '#334155'
        }}
      />

      {matn && (
        <h4 style={{ 
          color: '#475569', 
          fontSize: '16px',
          fontWeight: '500',
          backgroundColor: '#f8fafc',
          padding: '12px',
          borderRadius: '10px',
          borderLeft: '4px solid #6366f1',
          wordBreak: 'break-word',
          margin: 0,
          textAlign: 'left'
        }}>
          Siz yozayotgan matn: <span style={{ color: '#6366f1', fontWeight: 'bold' }}>{matn}</span>
        </h4>
      )}
    </div>
  );
}

export default LiveInput;