import './App.css';
import Course from './Course'
import logo from './logo192.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="EasyGrade"/>

        <p className="Description">
          Have you asked yourself, "What grade do I need on my final exam to pass this class?" EasyGrade is a tool to help students understand the grades they need to achieve their goals.
        </p>

        <p className="Description">
          You can start by hitting the "Add Item" button to begin replicating the assignments/tests from your class syllabus. Or, hit the "Show Example" button to see EasyGrade in action.
        </p>
      </header>
      <main>
        <Course items={[
          {name: "Name", maxValue: "Points", value: "Earned", needed: "Needed", header: true}
          ]}/>
      </main>
    </div>
  );
}

export default App;
