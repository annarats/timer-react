import Timer from "./components/timer/Timer";

function App() {
  
  const eventDate = 'December 31, 2026 23:59:59';

  return (
    <div className="App">
      <Timer targetDate={eventDate}/>
    </div>
  );
}

export default App;
