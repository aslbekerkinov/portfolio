import React, { useState } from "react";
import axios from "axios";

function CarSearch() {
    const [make, setMake] = useState(""); 
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchCars = async () => {
        if (!make.trim()) return;
        setLoading(true);
        setError(null);
        try {
            // NHTSA ochiq API manzili
            const response = await axios.get(
                `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make.toLowerCase()}?format=json`
            );
            
            // Agar ma'lumot topilsa shtatga yozamiz
            if (response.data.Results && response.data.Results.length > 0) {
                setModels(response.data.Results);
            } else {
                setModels([]);
                setError("Bunday marka topilmadi yoki model mavjud emas.");
            }
        } catch (err) {
            console.log(err);
            setError("Ma'lumot olishda xatolik yuz berdi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '25px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '20px' }}>🚗 Moshina Modellari Qidiruvi</h2>
            
            {/* Qidiruv qismi */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") searchCars(); }}
                    placeholder="Markani kiriting (Masalan: bmw, tesla, ford)..."
                    style={{ flex: '1', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '15px', outline: 'none' }}
                />
                <button 
                    onClick={searchCars}
                    style={{ padding: '12px 20px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Qidirish
                </button>
            </div>

            {/* Holatlar xabari */}
            {loading && <p style={{ textAlign: 'center', color: '#3182ce', fontWeight: 'bold' }}>🔄 Yuklanmoqda...</p>}
            {error && <p style={{ textAlign: 'center', color: '#e53e3e', fontWeight: 'bold' }}>{error}</p>}

            {/* Modellari ro'yxati */}
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: models.length > 0 ? '1px solid #edf2f7' : 'none', borderRadius: '8px' }}>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {models.map((car, index) => (
                        <li 
                            key={index} 
                            style={{ 
                                padding: '12px 15px', 
                                borderBottom: index !== models.length - 1 ? '1px solid #edf2f7' : 'none',
                                color: '#4a5568',
                                fontSize: '16px',
                                background: index % 2 === 0 ? '#f7fafc' : '#ffffff'
                            }}
                        >
                            🚘 <strong>{car.Make_Name}</strong> - {car.Model_Name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CarSearch;