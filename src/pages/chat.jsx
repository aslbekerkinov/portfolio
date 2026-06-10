import React, { useState, useEffect, useRef } from "react";
import { db } from './firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot
} from 'firebase/firestore';

function Chat() {
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessege] = useState('');
    const [user, setUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!isLoggedIn) return;
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesArray = [];
            snapshot.forEach((doc) => {
                messagesArray.push({ id: doc.id, ...doc.data() });
            });
            setMessages(messagesArray);
        });

        return () => unsubscribe();
    }, [isLoggedIn]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            await addDoc(collection(db, 'messages'), {
                text: newMessage,
                user: user, 
                createdAt: new Date()
            });
            setNewMessege('');
        } catch (error) {
            console.error("Xabar yuborishda xatolik:", error);
        }
    };

    if (!isLoggedIn) {
        return (
            <div style={{ padding: '40px', maxWidth: '400px', margin: '100px auto', fontFamily: 'Arial', backgroundColor: '#f1f5f9', borderRadius: '12px', textAlign: 'center' }}>
                <h2 style={{ color: '#1e3a8a' }}> Mini Jonli Chat</h2>
                <p style={{ color: '#64748b' }}>Chatga kirish uchun ismingizni kiriting:</p>
                <form onSubmit={(e) => { e.preventDefault(); if (user.trim()) setIsLoggedIn(true); }}>
                    <input
                        type="text"
                        placeholder="Ismingiz .."
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        style={{
                            width: '90%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '15px', fontSize: '16px'
                        }}
                    />
                    <button type="submit" style={{
                        width: '96%', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
                        fontSize: '16px', fontWeight: 'bold' 
                    }}>Chatga kirish</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', height: '85vh', maxWidth: '600px', margin: '30px auto', fontFamily: 'Arial',
            border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
        }}>
            <div style={{ padding: '15px 20px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}> Umumiy guruh</span>
                <span style={{ backgroundColor: '#2563eb', padding: '5px 12px', borderRadius: '20px', fontSize: '14px', color: 'white' }}>{user}</span>
            </div>

            <div style={{
                flex: 1, padding: '20px', backgroundColor: '#f8fafc', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px'
            }}>
                {messages.map((msg) => {
                    const isMe = msg.user === user;
                    return (
                        <div key={msg.id} style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start'
                        }}>
                            <span style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px', marginLeft: '5px', marginRight: '5px' }}>{msg.user}</span>
                            <div style={{
                                maxWidth: '75%', padding: '10px 15px', borderRadius: '14px',
                                backgroundColor: isMe ? '#2563eb' : '#e2e8f0',
                                color: isMe ? 'white' : '#1e293b',
                                borderBottomRightRadius: isMe ? '0px' : '14px',
                                borderBottomLeftRadius: isMe ? '14px' : '0px',
                                wordBreak: 'break-word'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} style={{
                padding: '15px', backgroundColor: 'white', display: 'flex', gap: '10px',
                borderTop: '1px solid #e2e8f0' 
            }}>
                <input
                    type="text"
                    placeholder="Xabar yubor .."
                    value={newMessage}
                    onChange={(e) => setNewMessege(e.target.value)}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', outline: 'none' }}
                />
                <button type="submit" style={{
                    padding: '12px 25px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px',
                    cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'
                }}>Yuborish</button>
            </form>
        </div>
    );
}

export default Chat;