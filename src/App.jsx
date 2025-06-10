import Index from "./Components/Index";
import { TransactionProvider } from "./Context/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <Index></Index>
    </TransactionProvider>
  );
}

export default App;
