import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

/* remove iframes

[...document.getElementsByTagName('iframe')].forEach(iframe => document.body.removeChild(iframe));

*/

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

const coinFlip = () => Math.random() >= 0.5;

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

const globalCache = {};

function createResource(name, getData) {
  globalCache[name] = globalCache[name] || {};
  const cache = globalCache[name];
  return {
    cache,
    read(value) {
      if (cache[value]) {
        if (cache[value] instanceof Error) {
          throw cache[value];
        }
        return cache[value];
      }
      throw getData()
        .then(result => {
          if (coinFlip()) {
            cache[value] = result;
            return;
          }
          return undefined.reduce();
        })
        .catch(err => {
          cache[value] = err;
        });
    }
  };
}

const getData = async () => {
  await delay(1000);
  return "hello world";
};

function Data({ children }) {
  const greeting = createResource("greeting", getData);
  return children(greeting.read());
}

// While our catch, error boundary, catches errors
// Suspense will kick in when the children return a Promise!
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Catch>
          <Suspense fallback={<p>Loading</p>}>
            <Data>
              {data => (
                <p>
                  <code>{data}</code>
                </p>
              )}
            </Data>
          </Suspense>
        </Catch>
      </header>
    </div>
  );
}

export default App;
