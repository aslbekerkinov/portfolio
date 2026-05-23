import React, { useState } from "react";
import axios from "axios";
import './book.css'
function Books() {
    const [book, setBook] = useState('');
    const [baza, setBaza] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    const searchBooks = async () => {
        if (!book) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://openlibrary.org/search.json', {
                params: {
                    q: book
                }
            });
            if (response.data && response.data.docs) {
                setBaza(response.data.docs);
            }
        } catch (error) {
            console.log(error);
            setError("Kitobni qidirishda muammo yuz berdi. Qayta urinib ko'ring.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="book" style={{ padding: '20px' }}>
            <input id="input"
                type="text"
                value={book}
                onChange={(e) => setBook(e.target.value)}
                placeholder="kitob nomini kiriting...."
            />
            <button id="button" onClick={searchBooks}>Qidirish</button>
            
            {loading && <p>Qidirilmoqda....</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul id="ul">
                {baza.map((item) => (
                    <li id="li" key={item.key}> 
                        <strong id="strong">{item.title}</strong> - {item.author_name?.join(', ') || `Muallif noma'lum`}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Books;