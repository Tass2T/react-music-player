import './styles/app.scss';
const { default: Player } = require("./components/Player");
const { default: Song } = require("./components/Song");

function App() {
  return (
    <div className="App">
      <Song/>
      <Player/>
    </div>
  );
}

export default App;
