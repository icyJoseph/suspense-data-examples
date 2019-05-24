import React from "react";
import logo from "./logo.svg";
import "./App.css";

const delay = duration => new Promise(accept => setTimeout(accept, duration));

const coinFlip = () => Math.random() >= 0.5;

function useData() {
  const [state, setState] = React.useState({
    error: null,
    data: null,
    loading: false
  });

  React.useEffect(() => {
    setState({ error: null, loading: true, data: null });
    delay(1000)
      .then(() => {
        if (coinFlip()) {
          return setState({ error: null, loading: false, data: "Hello World" });
        }
        return undefined.reduce();
      })
      .catch(() => setState({ error: "Failure", loading: false, data: null }));
  }, []);

  return state;
}

function App() {
  const { data, error, loading } = useData();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {error && <code>Error</code>}
          {loading && <code>Loading...</code>}
          {data && <code>{data}</code>}
        </p>
      </header>
    </div>
  );
}

export default App;
