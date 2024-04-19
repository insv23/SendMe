import React, { useState } from "react";
import VerificationInput from "react-verification-input";

const VerificationOverlay = ({ onVerified }) => {
  // 这里的 verifyInputWithBackend 是一个示例函数，你需要替换为实际的API调用
  async function verifyInput(input) {
    // 实现API调用
    if (input === "qwer") {
      onVerified(); // 通知父组件验证成功
      return true;
    }
    alert("Incorrect, please try again.");
    return false;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <VerificationInput autoFocus={true} passwordMode={true} length={4} onComplete={verifyInput} />
    </div>
  );
};

export default VerificationOverlay;
