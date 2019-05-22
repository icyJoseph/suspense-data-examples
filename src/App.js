import React, { useEffect, useState, useCallback, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

//https://codesandbox.io/s/suspense-data-fetching-297gn
//https://codesandbox.io/s/suspense-data-fetching-end-i2ey2

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

class Catch extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error occurs</h1>;
    }

    return this.props.children;
  }
}

let globalCache;

function useData(getData, deps) {
  if (globalCache) return globalCache;

  // Suspense will catch this!
  throw getData().then(data => {
    globalCache = data;
  });

  // const [state, setState] = useState({
  //   loading: true,
  //   data: null,
  //   error: null
  // });

  // useEffect(() => {
  //   setState({ data: null, error: null, loading: true });
  //   getData()
  //     .then(data => {
  //       setState({ data, error: null, loading: false });
  //     })
  //     .catch(error => {
  //       setState({ data: null, error, loading: false });
  //     });
  // }, [getData]);

  // return state;
}

function Data({ children }) {
  const data = useData(async () => {
    await delay(1000);

    return "Hello World";
  }, []);

  return children(data);
}

// While our catch, error boundary, catches errors
// Suspense will kick in when the children return a Promise!
function App() {
  return (
    <div className="App">
      <Catch>
        <Suspense fallback={<div>Loading</div>}>
          <Data>
            {data =>
              data && (
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    <code>{data}</code>
                  </p>
                </header>
              )
            }
          </Data>
        </Suspense>
      </Catch>
    </div>
  );
}

export default App;
