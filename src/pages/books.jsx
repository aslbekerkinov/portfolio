import React, { useState } from "react";
import axios from "axios";
import './book.css';

function Books() {
    const [book, setBook] = useState('');
    const [baza, setBaza] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchBooks = async () => {
        if (!book.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                'https://openlibrary.org/search.json',
                {
                    params: {
                        q: book
                    }
                }
            );
            setBaza(response.data.docs);
        } catch (err) {
            console.log(err);
            setError("Kitobni qidirishda xatolik yuz berdi.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div id="book" style={{ padding: '20px' }}>
            <input
                id="input"
                type="text"
                value={book}
                onChange={(e) => setBook(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        searchBooks();
                    }
                }}
                placeholder="Kitob nomini kiriting..."
            />
            <button id="button" onClick={searchBooks}>
                Qidirish
            </button>
            {loading && <p>Qidirilmoqda...</p>}
            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}
            <ul id="ul">
                {baza.map((item) => (
                    <li id="li" key={item.key}>
                        <div id="img">
                            {item.cover_i ? (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
                                    alt={item.title}
                                />
                            ) : (
                                <p>Rasm yo'q</p>
                            )}
                        </div>
                        <strong id="strong">
                            {item.title}
                        </strong>
                        {" - "}
                        {item.author_name
                            ? item.author_name.join(', ')
                            : "Muallif noma'lum"}
                    </li>
                ))}
            </ul>
        </div>
    );  
}
export default Books;