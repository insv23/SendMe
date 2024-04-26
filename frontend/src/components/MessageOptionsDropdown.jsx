import React, { useRef } from "react";
import { Menu } from "primereact/menu";

const MessageOptionsDropdown = ({ onDelete }) => {
  const menu = useRef(null);
  const items = [
    {
      label: "删除",
      icon: "pi pi-trash",
      command: () => {
        onDelete();
      },
    },
  ];

  return (
    <div>
      <i
        className="pi pi-ellipsis-h"
        onClick={(event) => menu.current.toggle(event)}
        style={{ cursor: "pointer", color: "#ccc" }}
      ></i>
      <Menu model={items} popup ref={menu} id="popup_menu" />
    </div>
  );
};

export default MessageOptionsDropdown;
