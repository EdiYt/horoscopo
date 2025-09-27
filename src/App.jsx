import { useState } from 'react';
import './App.css';

function getZodiacSign(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);

  const signos = [
    { signo: 'Capricornio', img: 'capricornio.png', from: [12, 22], to: [1, 19] },
    { signo: 'Acuario', img: 'acuario.png', from: [1, 20], to: [2, 18] },
    { signo: 'Piscis', img: 'piscis.png', from: [2, 19], to: [3, 20] },
    { signo: 'Aries', img: 'aries.png', from: [3, 21], to: [4, 19] },
    { signo: 'Tauro', img: 'tauro.png', from: [4, 20], to: [5, 20] },
    { signo: 'Géminis', img: 'geminis.png', from: [5, 21], to: [6, 20] },
    { signo: 'Cáncer', img: 'cancer.png', from: [6, 21], to: [7, 22] },
    { signo: 'Leo', img: 'leo.png', from: [7, 23], to: [8, 22] },
    { signo: 'Virgo', img: 'virgo.png', from: [8, 23], to: [9, 22] },
    { signo: 'Libra', img: 'libra.png', from: [9, 23], to: [10, 22] },
    { signo: 'Escorpio', img: 'escorpio.png', from: [10, 23], to: [11, 21] },
    { signo: 'Sagitario', img: 'sagitario.png', from: [11, 22], to: [12, 21] }
  ];

  for (let s of signos) {
    const [fromMonth, fromDay] = s.from;
    const [toMonth, toDay] = s.to;

    if (
      (month === fromMonth && day >= fromDay) ||
      (month === toMonth && day <= toDay)
    ) {
      return s;
    }
  }

  return signos[0];
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
    <div className="container">
      <h2>Horóscopo</h2>
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
      <h4>{nombre}</h4>
      <p>{descripciones[signoObj.signo]}</p>
    </div>
  </div>
)}

    </div>
  );
}

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


export default App;
