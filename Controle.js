import React from "react";
import { useFormik } from "formik";

const Controle = (props) => {
  const formik = useFormik({
    initialValues: {
      modo: null,
    },
    onSubmit: (values) => {
      props.setmodo(values.modo);
    },
  });

  const ligaDesliga = () => {
    if (props.ligar === "1") {
      props.setLigar("0");
    } else {
      props.setLigar("1");
    }
  };

  const reseting = () => {
    if (props.reset === "1") {
      props.setReset("0");
    } else {
      props.setReset("1");
    }
  };

  const modoManual = () => {
    if (props.manual === "1") {
      props.setManual("0");
    } else {
      props.setManual("1");
    }
  };

  return (
    <div className="card col text-light bg-dark border-light" style={{ width: "20rem" }}>
      <div className="card-body">
        <h2>Controle</h2>
        <form style={{ marginBottom: "20px" }} onSubmit={formik.handleSubmit}>
          <p htmlFor="distancia">Modo:</p>
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="modo"
            onChange={formik.handleChange}
            value={formik.values.modo}
          >
            <option value="">Selecione o modo</option>
            <option value="10">Manual</option>
            <option value="00">Temperatura</option>
            <option value="01">Presença</option>
          </select>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <button
          type="button"
          className="btn btn-success"
          onClick={ligaDesliga}
          style={{ marginRight: "20px" }}
        >
          Ativar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={reseting}
          style={{ marginRight: "20px" }}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={modoManual}
          disabled={formik.values.modo !== "10"}
        >
          Ligar(manual)
        </button>
      </div>
    </div>
  );
};

export { Controle };
