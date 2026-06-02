import React, { useState } from "react";
import axios from "axios";

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = "25453f18";

  const searchMovie = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
      } else {
        setMovies([]);
        setError("Kino topilmadi. Boshqa nom yozib ko'ring.");
      }
    } catch (error) {
      console.log(error);
      setError("Tarmoqda xatolik yuz berdi.");
    }
    setLoading(false);
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '30px',
        fontWeight: '700',
        letterSpacing: '1px',
        color: '#e50914'
      }}>Kino Portali</h2>

      {/* Qidiruv bo'limi */}
      <form onSubmit={searchMovie} style={{ display: 'flex', gap: '12px', marginBottom: '40px', justifyContent: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kino nomini yozing..."
          style={{
            padding: '14px 20px',
            width: '400px',
            borderRadius: '30px',
            border: 'none',
            backgroundColor: '#333',
            color: '#fff',
            fontSize: '16px',
            outline: 'none',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}
        />
        <button type="submit" style={{
          padding: '14px 28px',
          background: '#e50914',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '16px',
          transition: 'background 0.2s',
          boxShadow: '0 4px 10px rgba(229,9,20,0.3)'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#ff1923'}
        onMouseOut={(e) => e.currentTarget.style.background = '#e50914'}
        >
          {loading ? 'Qidirilmoqda...' : 'Qidirish'}
        </button>
      </form>

      {/* Xatolik xabari */}
      {error && <p style={{ textAlign: 'center', color: '#ff4d4d', fontSize: '18px' }}>{error}</p>}

      {/* Kinolar Grid qismi */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => getMovieDetails(movie.imdbID)}
            style={{
              backgroundColor: '#1f1f1f',
              borderRadius: '12px',
              cursor: 'pointer',
              overflow: 'hidden',
              textAlign: 'left',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 6px 15px rgba(0,0,0,0.5)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 20px rgba(229,9,20,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.5)';
            }}
          >
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=Rasm+Mavjud+Emas"} 
              alt={movie.Title} 
              style={{ width: '100%', height: '320px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '15px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.Title}</h4>
              <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Oyna (Kino haqida batafsil) */}
      {selectedMovie && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}
        onClick={() => setSelectedMovie(null)}
        >
          <div style={{
            backgroundColor: '#181818', color: '#fff', padding: '30px', borderRadius: '15px', maxWidth: '700px', width: '90%',
            position: 'relative', display: 'flex', gap: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                position: 'absolute', top: '15px', right: '20px', fontSize: '24px', cursor: 'pointer', border: 'none',
                background: 'none', color: '#aaa', transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}
            >
              &times;
            </button>
            <img 
              src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "https://via.placeholder.com/300x450?text=Rasm+Mavjud+Emas"} 
              alt={selectedMovie.Title} 
              style={{ width: '220px', height: '330px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '330px', paddingRight: '10px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '22px', color: '#e50914' }}>{selectedMovie.Title}</h3>
              <p style={{ margin: 0, fontSize: '14px' }}><strong>Yil:</strong> {selectedMovie.Year}</p>
              <p style={{ margin: 0, fontSize: '14px' }}><strong style={{ color: '#f39c12' }}>⭐ Reyting:</strong> {selectedMovie.imdbRating}</p>
              <p style={{ margin: 0, fontSize: '14px' }}><strong>Janr:</strong> {selectedMovie.Genre}</p>
              <p style={{ margin: 0, fontSize: '14px' }}><strong>Aktyorlar:</strong> {selectedMovie.Actors}</p>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#ddd' }}><strong>Haqida:</strong> {selectedMovie.Plot}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSearch; 