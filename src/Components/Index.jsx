import { useState } from "react";
import { useTransactions } from "../Context/TransactionContext";

const Index = () => {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const balance = income - expense;

  const handleAdd = () => {
    if (!text || !amount) return alert("Por favor, rellena los campos");
    addTransaction(text, amount);
    setText("");
    setAmount("");
  };

  return (
    <div className="container py-5 my-0">
      <div className="head-title">
        <h1 className="text-center">Control de gastos</h1>
      </div>

      <div className="mt-4 d-flex flex-column justify-content-center align-items-center w-100">
        <div className="wrapper-box">
          <div className="border-light px-5 py-4 rounded">
            <div className="mb-4">
              <small className="text-uppercase fw-bold">Saldo</small>
              <h2>{balance.toFixed(2)}€</h2>
            </div>

            <div className="d-flex justify-content-between text-center border-light rounded shadow-sm mb-2">
              <div className="flex-fill p-3 border-light-end">
                <small className="text-uppercase fw-bold d-block mb-1">
                  Ingreso
                </small>
                <span style={{ color: "#4bc903", fontWeight: "600" }}>
                  {income.toFixed(2)}€
                </span>
              </div>

              <div className="flex-fill p-3">
                <small className="text-uppercase fw-bold d-block mb-1">
                  Gasto
                </small>
                <span style={{ color: "#ff0000", fontWeight: "600" }}>
                  {expense.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          <div className="border-light px-5 py-4 rounded my-3">
            <div>
              <h5>Historial</h5>
              <hr />
              <div className="trans-card-wrap">
                {transactions.length === 0 ? (
                  <div className="alert alert-danger text-center">
                    Sin transacciones
                  </div>
                ) : (
                  transactions.map((item) => (
                    <div
                      key={item.id}
                      className="trans-card d-flex justify-content-between align-items-center border-light rounded p-2 mb-2 position-relative"
                    >
                      <span>{item.text}</span>
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className={
                            item.amount > 0
                              ? "text-success fw-bold"
                              : "text-danger fw-bold"
                          }
                        >
                          {item.amount > 0 ? `+${item.amount}` : item.amount}
                        </span>
                        <div
                          style={{
                            width: "5px",
                            height: "30px",
                            backgroundColor:
                              item.amount > 0 ? "#4bc903" : "#ff0000",
                          }}
                        ></div>
                      </div>
                      <button
                        onClick={() => deleteTransaction(item.id)}
                        className="btn btn-sm btn-danger delete-card position-absolute ms-2"
                      >
                        X
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="border-light px-5 py-4 rounded">
            <div className="input-box">
              <h6>Añadir nueva transacción</h6>
              <hr />
              <label className="form-label fw-bold">Texto</label>
              <input
                type="text"
                className="form-control border-light mb-3"
                placeholder="Introduce el texto"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <label className="form-label fw-bold">
                Cantidad (Negativo - Gasto, Positivo - Ingreso)
              </label>
              <input
                type="number"
                className="form-control border-light mb-3"
                placeholder="Introduce la cantidad"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={handleAdd} className="btn btn-primary w-100">
                Añadir transacción
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
