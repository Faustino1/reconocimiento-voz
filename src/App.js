import { useState, useEffect } from "react";
import microfonoOn from "./images/micofonoOn.png";
import mute from "./images/micofonoOff.png";
//al envolver la imagen con iconButon, nos nara la funcionalidad de un botton
import { IconButton, Typography } from "@material-ui/core";
import { MyButton, NewButton } from "./component/StyledComponent";

import './App.css';
import DisplayNotas from "./component/DisplayNotas";

//inicialización del reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition

//Configuración
mic.continuous = true;
mic.interimResults = true;
mic.lang = "es-CO";

function App() {
  // La variable que nos indica que si esta escuchando o no
  const [isListening, SetListening] = useState(false);
  const [nota, setNota] = useState(null);


  //Clasificación de las notas
  const [savedNotashacer, SetsavedNotashacer] = useState([]);
  const [savedNotasenproceso, SetsavedNotasenproceso] = useState([]);
  const [savedNotashecho, SetsavedNotashecho] = useState([]);

  //Capturo las notas para despues pasarlas al componente 
  const savedNotas = [
    {
      group: "hacer",
      name: savedNotashacer,
    }, {
      group: "enproceso",
      name: savedNotasenproceso,
    }, {
      group: "hecho",
      name: savedNotashecho,
    }
  ]

  //Cada vez que cambia de estado el componente se va a aejecutar la función isListening
  // handleListen se va a ajecutar cada vez que le demos click al boton  
  useEffect(() => {
    handleListen();
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start()
      }
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Click al microfono");
      }
    }
    mic.onstart = () => {
      console.log("El microfono está encendido");
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript).join("");
      setNota(transcript);
      mic.onerror = (event) => console.log(event.err);
    }
  }
  return (
    <>
      <div className="nota">
        <h1>Nota de voz</h1>
        <div className="microfono">
          <IconButton onClick={() => SetListening((preveState => !preveState))}>
            <img className="mi-icon" src={isListening ? microfonoOn : mute} atl="microfono" />
          </IconButton>
        </div>
        <div className="botones">
        <NewButton status="hacer" disabled={!nota} onClick={() => {
          //Si savedNotashacer, era vacio o tenía algo, el valor se cambia por el nuevo que se dicta
          SetsavedNotashacer([...savedNotashacer, nota])
          //Despues de agregar las notas se dejn vacias
          setNota("");
        }}>
          Hacer
        </NewButton>
        <NewButton status="enproceso" disabled={!nota} onClick={() => {
          //Si savedNotashacer, era vacio o tenía algo, el valor se cambia por el nuevo que se dicta
          SetsavedNotasenproceso([...savedNotasenproceso, nota])
          setNota("");
        }}>
          En Proceso
        </NewButton>
        <NewButton status="hecho" disabled={!nota} onClick={() => {
          //Si savedNotashacer, era vacio o tenía algo, el valor se cambia por el nuevo que se dicta
          SetsavedNotashecho([...savedNotashecho, nota])
          setNota("");
        }}>
          Hecho
        </NewButton>   
        </div>
        
        <Typography variant="h4" component="h2" gutterBottom>
          {
            nota
          }
        </Typography>
        <DisplayNotas data={savedNotas} />  
      </div>
    </>
  );
}

export default App;
