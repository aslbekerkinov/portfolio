// import React, {useState , useEffect}from "react";
// import axios from 'axios';

// function CurrencyConverter(){
//     const [retes ,setRetes]=useState([]);
//     const [amout, setAmout]=useState(1);
//     const [fromCurrency,setFromCurrency]=useState('USD');
//     const [toCurrency,setToCurrency]=useState('UZD');
//     const [result,setResult]=useState(0);
//     useEffect(()=>{
//         const fetchRetes = async()=>{
//             try{
//                 const response=await axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')
//                 const uzs ={Ccy:'UZS',Rate:'1', CcyNm_UZ:"Ozbek so'mi" };
//                 const bit ={Ccy:'BTC',Rate:'86547', CcyNm_UZ:"bitcon"}

//                 setRetes([uzs,bit, ...response.data]);
//             }catch(error){
//                 console.log("Xatolik:",error);
//             }
//         };
//         fetchRetes();

//     }
//     ,[]
//     )
//     useEffect(()=> {
//         if(retes.length >0){
//             const fromRate=retes.find(r=> r.Ccy=== fromCurrency)?.Rate;
//             const toRate = retes.find(r=> r.Ccy=== toCurrency)?.Rate;
 
//             const calc =(amout*fromRate)/toRate;
//             setResult(calc.toFixed(2));
//         }
//     },[amout,fromCurrency,toCurrency,retes]);

//     return(
//         <div style={{padding:'30px',maxWidth:'500px',margin:'0 auto',background:'#f4f7f6',
//          borderRadius:'15px',boxShadow:'0 4px 8px rgba(0,0,0,0.1)'}}>
//          <h2 style={{textAlign:'center'}}> Valyuta Konverteri</h2>
//            <div style={{marginBottom:'20px'}}>
//             <label>Miqdorni Kiriting</label>
//             <input 
//             type="number"
//             value={amout}
//             onChange={(e)=> setAmout(e.target.value)}
//             style={{width:'100%',padding:'10px',marginTop:'5px',borderRadius:'5px',border:'1px solid #ccc'}}
//             />
//            </div>
//            <div style={{display:'flex',justifyContent:'space-between',gap:'10px'}}>
//             <div style={{flex:'1'}}>
//                 <label>Dan:</label>
//                 <select value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}
//                     style={{width:'100%',padding:'10px',borderRadius:'5px'}}>
//                   {retes.map(r=> <option key={r.Ccy} value={r.Ccy}> - {r.CcyNm_UZ}</option>)}
//                </select>
//             </div>
//           </div>
//              <div style={{display:'flex',justifyContent:'space-between',gap:'10px'}}>
//               <div style={{flex:'1'}}>
//                 <label>Ga:</label>
//                 <select value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}
//                     style={{width:'100%',padding:'10px',borderRadius:'5px'}}>
//                   {retes.map(r=> <option key={r.Ccy} value={r.Ccy}> - {r.CcyNm_UZ}</option>)}
//                </select>
//             </div>
//            </div>
//            <div style={{marginTop:'30px',textAlign:'center',padding:'20px',background:'#fff',
//             borderRadius:'10px'
//            }}>
//             <h3 style={{margin:'0'}}>Natija:</h3>
//             <p style={{fontSize:'24px',fontWeight:'bold',color:'#2ecc71'}}>
//                 {amout}{fromCurrency}={result}{toCurrency}
//             </p>
//            </div>
//         </div>
//     );
// }
// export default CurrencyConverter;
import React, { useState, useEffect } from "react";
import axios from 'axios';

function CurrencyConverter() {
    // Imlo xatolari va boshlang'ich qiymat (UZS) to'g'rilandi
    const [rates, setRates] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('UZS'); 
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/');
                const uzs = { Ccy: 'UZS', Rate: '1', CcyNm_UZ: "O'zbek so'mi" };
                const bit = { Ccy: 'BTC', Rate: '1100000000', CcyNm_UZ: "Bitcoin" };

                setRates([uzs, bit, ...response.data]);
            } catch (error) {
                console.log("Xatolik:", error);
            }
        };
        fetchRates();
    }, []);

    useEffect(() => {
        if (rates.length > 0) {
            const fromRate = parseFloat(rates.find(r => r.Ccy === fromCurrency)?.Rate || 1);
            const toRate = parseFloat(rates.find(r => r.Ccy === toCurrency)?.Rate || 1);

            const calc = (amount * fromRate) / toRate;
            setResult(calc.toFixed(2));
        }
    }, [amount, fromCurrency, toCurrency, rates]);

    return (
        <div style={{
            padding: '30px',
            maxWidth: '450px',
            margin: '50px auto',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', color: '#1a202c', margin: '0 0 25px 0', fontSize: '24px' }}>
                💱 Valyuta Konverteri
            </h2>
            
            {/* Miqdor kiritish maydoni */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '8px', fontSize: '14px' }}>
                    Miqdorni kiriting:
                </label>
                <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        fontSize: '16px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontWeight: '500'
                    }}
                />
            </div>

            {/* Valyuta selectlarini yonma-yon chiqarish */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginBottom: '25px', alignItems: 'center' }}>
                <div style={{ flex: '1' }}>
                    <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '8px', fontSize: '14px' }}>
                        Dan:
                    </label>
                    <select 
                        value={fromCurrency} 
                        onChange={(e) => setFromCurrency(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '2px solid #e2e8f0',
                            backgroundColor: '#fff',
                            fontSize: '15px',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {rates.map(r => <option key={r.Ccy} value={r.Ccy}>{r.Ccy} - {r.CcyNm_UZ}</option>)}
                    </select>
                </div>

                <div style={{ marginTop: '25px', color: '#a0aec0', fontSize: '18px' }}>➡️</div>

                <div style={{ flex: '1' }}>
                    <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '8px', fontSize: '14px' }}>
                        Ga:
                    </label>
                    <select 
                        value={toCurrency} 
                        onChange={(e) => setToCurrency(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '2px solid #e2e8f0',
                            backgroundColor: '#fff',
                            fontSize: '15px',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {rates.map(r => <option key={r.Ccy} value={r.Ccy}>{r.Ccy} - {r.CcyNm_UZ}</option>)}
                    </select>
                </div>
            </div>

            {/* Natija bloki */}
            <div style={{
                marginTop: '25px',
                textAlign: 'center',
                padding: '20px',
                background: '#f7fafc',
                borderRadius: '12px',
                border: '1px solid #edf2f7'
            }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#a0aec0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Hisoblangan Natija
                </h3>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#3182ce', margin: '0' }}>
                    {amount} {fromCurrency} = {result} {toCurrency}
                </p>
            </div>
        </div>
    );
}

export default CurrencyConverter;