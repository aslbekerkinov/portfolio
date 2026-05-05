import React, { useState, useEffect } from 'react';
const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [select, setSearch]=useState(false);

    const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,continents,borders,flags,languages,population,region';

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
                }
                const data = await response.json();
                
                const sortedData = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                
                setCountries(sortedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getCountries();
    }, []);

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Dunyo xaritasi yuklanmoqda....</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Xato: {error}</h2>;

    return (
        
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px',height:'70px'}}>Davlat Ma'lumotlari</h1>
            {/* <input type="text"onChange={ (e)=> setSearch(e.target.value)} /> */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '25px',
                marginTop: '20px',
                width: '100%' 
            }}>
                {countries.map((country, index) => (
                    <div key={index} style={{
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '15px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#f9f9f9',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <img
                            src={country.flags.svg}
                            alt={country.name.common}
                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                        <h3 style={{ margin:'15px 0 10px' }}>{country.name.common}</h3>
                        <p style={{ margin:'5px 0'}}><strong>Poytaxti:</strong> {country.capital ? country.capital[0] : 'Mavjud emas'}</p>
                        <p style={{ margin:'5px 0'}}><strong>Mintaqa:</strong> {country.region}</p>
                        <p style={{ margin:'5px 0'}}><strong>Aholi:</strong> {country.population.toLocaleString()} kishi</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryList;