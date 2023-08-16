import React, { useState } from "react";
import { useFormik } from "formik";

const Consumo = (tempo) => {
  const [potencia, setPotencia] = useState(null);
  const [kWh, setkWh] = useState(null);
  const formik = useFormik({
    initialValues: {
      potencia: null,
      custokWh: null,
    },
    onSubmit: (values) => {
      setPotencia(values.potencia);
      setkWh(values.custokWh);
    },
  });
  var horas = Math.floor(parseInt(tempo.tempo) / 3600);
  var minutos = Math.floor((parseInt(tempo.tempo) % 3600) / 60);
  var segundos = (parseInt(tempo.tempo) % 3600) % 60;

  return (
    <div className="card col text-light bg-dark border-light" style={{ width: "20rem" }}>
      <div className="card-body">
        <h2>Consumo</h2>
        {segundos ? (
          <p>
            {horas < 10 ? ("0" + horas).toString() : horas}:
            {minutos < 10 ? ("0" + minutos).toString() : minutos}:
            {segundos < 10 ? ("0" + segundos).toString() : segundos}
          </p>
        ) : (
          <p>Sem dados de consumo</p>
        )}
        {potencia ? (
          <p>
            {parseFloat((potencia * parseInt(tempo.tempo)) / 3600000).toFixed(
              3
            )}
            kWh
          </p>
        ) : (
          ""
        )}
        {kWh ? (
          <p>
            R$
            {parseFloat(
              (kWh * potencia * parseInt(tempo.tempo)) / 3600000
            ).toFixed(2)}
          </p>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
          <span htmlFor="potencia">Potência:</span>
          <input
            type="text"
            name="potencia"
            className="form-control"
            style={{marginBottom:"5px"}}
            placeholder="Potência"
            onChange={formik.handleChange}
            value={formik.values.potencia}
          />
          <span htmlFor="potencia">Custo por Kwh:</span>
          <input
            type="text"
            name="custokWh"
            className="form-control"
            placeholder="Custo"
            style={{marginBottom:"5px"}}
            onChange={formik.handleChange}
            value={formik.values.custokWh}
          />
          <p><button type="submit" className="btn btn-primary">Submit</button></p>
        </form>
      </div>
    </div>
  );
};

export { Consumo };
