
import Weather from "./components/Weather";

const App = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;


  return (
    <div className="app">
      <Weather />
    </div>
  );
};

export default App;
