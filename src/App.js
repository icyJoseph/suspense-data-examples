import React from "react";
import logo from "./logo.svg";
import "./App.css";

/* remove iframes

[...document.getElementsByTagName('iframe')].forEach(iframe => document.body.removeChild(iframe));

*/

const delay = duration => new Promise(accept => setTimeout(accept, duration));

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

  if (state.error) {
    throw state.error;
  }

  return state;
}

const getData = async () => {
  await delay(1000);
  return "Hello World";
};

function Data({ children }) {
  const { data, loading } = useData(getData);

  return children({ data, loading });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Catch>
          <Data>
            {({ data, loading }) => (
              <p>
                {loading && <code>Loading...</code>}
                {data && <code>{data}</code>}
              </p>
            )}
          </Data>
        </Catch>
      </header>
    </div>
  );
}

export default App;
