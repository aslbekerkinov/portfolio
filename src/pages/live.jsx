// LiveInput.jsx
import { useState } from 'react';

function LiveInput() {
  const [matn, setMatn] = useState('');

  return (
    <div style={{ padding: '20px', marginTop: '20px' }}>
      <h3>Jonli Matn yozish:</h3>
     
      <input 
        type="text" 
        placeholder="Ismingizni yozing..."
        value={matn}
        onChange={(e) => setMatn(e.target.value)} 
        style={{ padding: '10px', fontSize: '16px', width: '250px' }}
      />

      <h4 style={{ color: 'green' }}>Siz yozayotgan matn: {matn}</h4>
    </div>
  );
}

export default LiveInput;