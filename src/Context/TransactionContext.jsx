import { createContext, useState, useContext } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransaction] = useState([
    { id: 1, text: "Cash", amount: 500 },
    { id: 2, text: "Book", amount: -20 },
    { id: 3, text: "Camera", amount: -100 },
  ]);

  const addTransaction = (text, amount) => {
    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    };
    setTransaction([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransaction(transactions.filter((t) => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  return useContext(TransactionContext);
};
