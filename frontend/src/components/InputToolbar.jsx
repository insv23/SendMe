import { useRef } from "react";
import { Button } from "primereact/button";

const InputToolbar = ({ onFilesSelected }) => {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex gap-2 m-2 card">
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onFilesSelected}
      />
      <Button label="Upload" icon="pi pi-plus" onClick={handleButtonClick} />
    </div>
  );
};

export default InputToolbar;
