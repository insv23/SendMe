import InputEditor from "./InputEditor";
import InputFileArea from "./InputFileArea";
import InputToolbar from "./InputToolbar";

const Input = () => {

  return (
    <div className="input-container p-4 m-2 bg-[#202020] rounded-md border border-gray-600 hover:border-blue-500 focus-within:border-blue-500">
      <InputEditor/>
      <InputFileArea />
      <InputToolbar/>
    </div>
  );
};

export default Input;
