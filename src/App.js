import './App.css';
import { QuestionProvider } from './Context/QuestionContext';
import { AgoraProvider } from "./Context/AgoraContext";
import Routes from './routes';
function App() {
  return (
    <QuestionProvider>
      <AgoraProvider>
      <Routes/>
      </AgoraProvider>
    </QuestionProvider>
  );
}

export default App;
