import React, { useState, useEffect } from "react";
import { Temperatura } from "./Temperatura";
import { Consumo } from "./Consumo";
import { Parametros } from "./Parametros";
import { Controle } from "./Controle";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

var mqtt = require("mqtt");
var options = {
  username: "grupo2-bancadaA2",
  password: "L@Bdygy2A2",
};

var client = mqtt.connect("ws://labdigi.wiseful.com.br:8000/mqtt", options);

// preciouschicken.com is the MQTT topic
client.subscribe("grupo2-bancadaA2/#");
//client.publish('grupo2-bancadaA2/S1','blaballalaba')
function App() {
  var note;
  const [tempAtual, setTempAtual] = useState(String);
  const [tempoConsumo, setTempoConsumo] = useState(String);
  const [distancia, setDistancia] = useState(String);
  const [tempMaiorLim, setTempMaiorLim] = useState(String);
  const [ventLigado, setVentLigado] = useState(String);
  const [distanciaMax, setDistanciaMax] = useState(String);
  const [tempLimite, setTempLimite] = useState(String);
  const [modo, setModo] = useState(String);
  const [ligar, setLigar] = useState(String);
  const [reset, setReset] = useState(String);
  const [manual, setManual] = useState(String);

  useEffect(() => {
    client.publish("grupo2-bancadaA2/temperaturaLimite", tempLimite);
    if (distanciaMax) {
      client.publish("grupo2-bancadaA2/E6", distanciaMax.charAt(0));
      client.publish("grupo2-bancadaA2/E7", distanciaMax.charAt(1));
      client.publish("grupo2-bancadaA2/E8", distanciaMax.charAt(2));
    }
  }, [distanciaMax, tempLimite]);

  useEffect(() => {
    client.publish("grupo2-bancadaA2/E2", modo.charAt(1));
    client.publish("grupo2-bancadaA2/E3", modo.charAt(0));
  }, [modo]);

  useEffect(() => {
    client.publish("grupo2-bancadaA2/E0", ligar);
    client.publish("grupo2-bancadaA2/E1", reset);
  }, [ligar, reset]);

  useEffect(() => {
    client.publish("grupo2-bancadaA2/E5", manual);
  }, [manual]);

  client.on("message", function (topic, message) {
    note = message.toString();
    if (topic === "grupo2-bancadaA2/temperatura") {
      setTempAtual(note);
    } else if (topic === "grupo2-bancadaA2/tempoligado") {
      setTempoConsumo(note);
    } else if (topic === "grupo2-bancadaA2/dadosonar") {
      setDistancia(note);
    } else if (topic === "grupo2-bancadaA2/E4") {
      setTempMaiorLim(note);
    } else if (topic === "grupo2-bancadaA2/S0") {
      setVentLigado(note);
    }
  });

  // Sets default React state

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-light row">
        <span className="navbar-brand mb-0 h1">Smart Brisa</span>
      </nav>
      <div className="row">
        <Temperatura
          temp={tempAtual}
          dist={distancia}
          ligado={ventLigado}
          tempMaior={tempMaiorLim}
        />
        <Consumo tempo={tempoConsumo} />
      </div>
      <div className="row">
        <Parametros setdist={setDistanciaMax} settemp={setTempLimite} />
        <Controle
          setmodo={setModo}
          setLigar={setLigar}
          setReset={setReset}
          ligar={ligar}
          reset={reset}
          setManual={setManual}
          manual={manual}
        />
      </div>
    </div>
  );
}

export default App;
