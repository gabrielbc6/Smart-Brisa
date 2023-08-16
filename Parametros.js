import React from "react";
import { useFormik } from "formik";

const Parametros = (props) => {
  const formik = useFormik({
    initialValues: {
      distancia: null,
      tempLimite: null,
    },
    onSubmit: (values) => {
      props.setdist(values.distancia);
      props.settemp(values.tempLimite);
    },
  });

  return (
    <div className="card col text-light bg-dark border-light" style={{ width: "20rem" }}>
      <div className="card-body">
        <h2>Parâmetros</h2>
        <p>Entre com a distância e temperatura limite desejadas:</p>
        <form onSubmit={formik.handleSubmit}>
          <span htmlFor="distancia">Distancia(cm):</span>
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-sm example"
            name="distancia"
            onChange={formik.handleChange}
            value={formik.values.distancia}
          >
            <option value="">Selecione a distância</option>
            <option value="000">10</option>
            <option value="001">20</option>
            <option value="010">30</option>
            <option value="011">50</option>
            <option value="100">100</option>
            <option value="101">200</option>
            <option value="110">500</option>
            <option value="111">900</option>
          </select>
          <span htmlFor="tempLimite">Temperatura Limite(ºC):</span>
          <input
            type="text"
            className="form-control"
            name="tempLimite"
            placeholder="Temperatura"
            style={{marginBottom:"5px"}}
            onChange={formik.handleChange}
            value={formik.values.tempLimite}
          />
          <p><button type="submit" className="btn btn-primary">Submit</button></p>
        </form>
      </div>
    </div>
  );
};

export { Parametros };
