import './App.css'
import "quill/dist/quill.bubble.css";
import MessagePage from "./components/MessagePage";


const App = () => {
  return (
    <div className="flex justify-center min-h-screen bg-[#121212]">
      <MessagePage />
    </div>
  );
};

export default App;
