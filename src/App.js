import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

// https://codesandbox.io/s/suspense-data-fetching-297gn
// https://codesandbox.io/s/suspense-data-fetching-end-i2ey2

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

const globalCache = {};

function createResource(name, getData) {
  globalCache[name] = globalCache[name] || {};
  const cache = globalCache[name];
  return {
    cache,
    read(value) {
      if (cache[value]) return cache[value];
      throw getData().then(result => {
        cache[value] = result;
      });
    }
  };
}

function Data({ children }) {
  const resource = createResource("hello world", async () => {
    await delay(1000);
    return "hello world";
  });
  return children(resource.read());
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
