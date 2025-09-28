import { useState } from 'react';
import './App.css';

const signos = [
  { signo: 'Capricornio', img: 'capricornio.png', fechas: 'Dic 22 - Ene 19', from: [12, 22], to: [1, 19] },
  { signo: 'Acuario', img: 'acuario.png', fechas: 'Ene 20 - Feb 18', from: [1, 20], to: [2, 18] },
  { signo: 'Piscis', img: 'piscis.png', fechas: 'Feb 19 - Mar 20', from: [2, 19], to: [3, 20] },
  { signo: 'Aries', img: 'aries.png', fechas: 'Mar 21 - Abr 19', from: [3, 21], to: [4, 19] },
  { signo: 'Tauro', img: 'tauro.png', fechas: 'Abr 20 - May 20', from: [4, 20], to: [5, 20] },
  { signo: 'Géminis', img: 'geminis.png', fechas: 'May 21 - Jun 20', from: [5, 21], to: [6, 20] },
  { signo: 'Cáncer', img: 'cancer.png', fechas: 'Jun 21 - Jul 22', from: [6, 21], to: [7, 22] },
  { signo: 'Leo', img: 'leo.png', fechas: 'Jul 23 - Ago 22', from: [7, 23], to: [8, 22] },
  { signo: 'Virgo', img: 'virgo.png', fechas: 'Ago 23 - Sep 22', from: [8, 23], to: [9, 22] },
  { signo: 'Libra', img: 'libra.png', fechas: 'Sep 23 - Oct 22', from: [9, 23], to: [10, 22] },
  { signo: 'Escorpio', img: 'escorpio.png', fechas: 'Oct 23 - Nov 21', from: [10, 23], to: [11, 21] },
  { signo: 'Sagitario', img: 'sagitario.png', fechas: 'Nov 22 - Dic 21', from: [11, 22], to: [12, 21] }
];

const descripciones = {
  Aries: "Eres valiente y energético. ¡Tu entusiasmo motiva a todos!",
  Tauro: "Destacas por tu paciencia y determinación.",
  Géminis: "Tu curiosidad y adaptabilidad te hacen único.",
  Cáncer: "Eres protector y de gran corazón. Siempre cuidas a los demás.",
  Leo: "Tienes un espíritu líder y muy creativo.",
  Virgo: "El orden y la observación te definen.",
  Libra: "Tu búsqueda de armonía te vuelve el mejor mediador.",
  Escorpio: "Intenso y apasionado, logras lo que te propones.",
  Sagitario: "Optimista y aventurero: amas la libertad.",
  Capricornio: "Trabajador y responsable, llegas lejos.",
  Acuario: "Innovador y original: vives según tus reglas.",
  Piscis: "Tu empatía y sensibilidad te hacen especial."
};

function getZodiacSign(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return signos.find(s => s.signo === 'Capricornio');
  }

  for (let s of signos) {
    const [fromMonth, fromDay] = s.from;
    const [toMonth, toDay] = s.to;
    if (month === fromMonth && day >= fromDay) {
      if ((s.to[0] === fromMonth && day <= toDay) || s.to[0] !== fromMonth) {
          return s;
      }
    } else if (month === toMonth && day <= toDay) {
        return s;
    }
  }
  return null;
}

function App() {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [signoObj, setSignoObj] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const signo = getZodiacSign(fecha);
    setSignoObj(signo);
  };

  return (
    <div className="app-wrapper">
      <div className="guia-container">
        <h2>Guía de Signos Zodiacales</h2>
        <div className="guia-grid">
          {signos.map(s => (
            <div key={s.signo} className="guia-card">
              <img src={`/src/assets/${s.img}`} alt={s.signo} className="guia-imagen" />
              <h3>{s.signo}</h3>
              <p>{s.fechas}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h2>Calcula tu Horóscopo</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
          <label>Fecha de Nacimiento:</label>
          <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
          <button type="submit">Ver mi signo</button>
        </form>

        {signoObj && (
          <div className="resultado">
            <h3>Tu signo es: {signoObj.signo}</h3>
            <img src={`/src/assets/${signoObj.img}`} alt={signoObj.signo} className="imagenSigno" />
            <div className="detalleSigno">
              <h4>Hola, {nombre}</h4>
              <p>{descripciones[signoObj.signo]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
