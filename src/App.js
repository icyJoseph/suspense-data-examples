import React from "react";
import logo from "./logo.svg";
import "./App.css";

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

const coinFlip = () => Math.random() >= 0.5;

// Define an error boundary
class Catch extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>An error occurs</p>;
    }

    return this.props.children;
  }
}

// define a global cache
let globalCache;
let errorCache;

function useData(getData) {
  if (errorCache) throw errorCache;
  if (globalCache) return globalCache;

  // Suspense will catch this!
  throw getData()
    .then(data => {
      if (coinFlip()) {
        globalCache = data;
        return;
      }
      return undefined.reduce();
    })
    // if we don't catch this error something funny happens :)
    .catch(error => {
      errorCache = error;
    });
}

const getData = async () => {
  await delay(1000);
  // console.log("greeting");
  return "Hello World";
};

function Data({ children }) {
  const data = useData(getData);

  return children(data);
}

// While our catch, error boundary, catches errors
// Suspense will kick in when the children return a Promise!
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Catch>
          <React.Suspense fallback={<p>Loading</p>}>
            <Data>
              {data => (
                <p>
                  <code>{data}</code>
                </p>
              )}
            </Data>
          </React.Suspense>
        </Catch>
      </header>
    </div>
  );
}

export default App;
