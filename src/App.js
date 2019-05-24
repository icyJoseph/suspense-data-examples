import React from "react";
import logo from "./logo.svg";
import "./App.css";

const delay = duration => new Promise(accept => setTimeout(accept, duration));

const coinFlip = () => Math.random() >= 0.5;

function useData(fetcher) {
  const [state, setState] = React.useState({
    error: null,
    data: null,
    loading: false
  });

  React.useEffect(() => {
    setState({ error: null, loading: true, data: null });
    fetcher()
      .then(data => {
        if (coinFlip()) {
          return setState({ error: null, loading: false, data });
        }
        return undefined.reduce();
      })
      .catch(() => setState({ error: "Failure", loading: false, data: null }));
  }, [fetcher]);

  return state;
}

const getData = async () => {
  await delay(1000);
  return "Hello World";
};

function App() {
  // fails into an infinite loop without useCallback
  const sameGetter = React.useCallback(getData);
  const { data, error, loading } = useData(sameGetter);

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
