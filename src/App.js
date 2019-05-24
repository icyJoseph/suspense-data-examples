import React from "react";
import logo from "./logo.svg";
import "./App.css";

const delay = duration => new Promise(accept => setTimeout(accept, duration));

const coinFlip = () => Math.random() >= 0.5;

const [SUCCESS, LOADING, ERROR] = ["s", "l", "e"];

const initialState = { error: null, data: null, loading: false };

function reducer(state, { type, ...action }) {
  switch (type) {
    case SUCCESS:
      return { ...state, error: null, loading: false, ...action };
    case LOADING:
      return { ...state, error: null, loading: true };
    case ERROR:
      return { ...state, error: "Failure", loading: false };
    default:
      throw new Error("Unknown Action");
  }
}

function useData() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: LOADING });

    delay(1000)
      .then(() => {
        if (coinFlip()) {
          return dispatch({ type: SUCCESS, data: "Hello World" });
        }
        return undefined.reduce();
      })
      .catch(() => dispatch({ type: ERROR }));
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
