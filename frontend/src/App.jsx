import React, { useState } from 'react';
import MessagePage from "./components/MessagePage";
import VerificationOverlay from "./components/VerificationOverlay";
import "./App.css";

const App = () => {
  const [verified, setVerified] = useState(false);
  
  return (
    <div className="flex justify-center min-h-screen bg-[#121212]">
      {!verified && <VerificationOverlay onVerified={() => setVerified(true)} />}
      {verified && <MessagePage/>}
    </div>
  );
};

export default App;
