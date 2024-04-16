import { Send, Settings } from "lucide-react";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Send />
        <span>SendMe</span>
      </div>
      <Settings />
    </div>
  );
};

export default TopBar;
