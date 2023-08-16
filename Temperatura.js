import React from "react";

function Temperatura(temp) {
  return (
    <div className="card col text-light bg-dark border-light" style={{ width: "20rem" }}>
      <div className="card-body">
        <h2>Monitoramento</h2>
        {temp.temp ? (
          <p>Temperatura do Ambiente: {parseFloat(temp.temp) / 100}ºC</p>
        ) : (
          <p>Sem dados de temperatura</p>
        )}
        {temp.dist ? (
          <p>
            Distância para o sensor:{parseFloat(temp.dist.split(",")[1]) / 100}m
          </p>
        ) : (
          <p>Sem dados de distância</p>
        )}
        {parseInt(temp.ligado) ? <p>Ventilador: ON</p> : <p>Ventilador: OFF</p>}
        {parseInt(temp.tempMaior) ? (
          <p>Temperatura Limite ultrapassada</p>
        ) : (
          <p>Temperatura normal</p>
        )}
      </div>
    </div>
  );
}

export { Temperatura };
