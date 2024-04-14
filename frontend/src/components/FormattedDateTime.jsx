import React from "react";

const FormattedDateTime = ({ dateTime }) => {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 使用24小时制
  });

  const formattedDateTime = formatter.format(new Date(dateTime));

  return <div className="text-sm text-[#909193]">{formattedDateTime}</div>;
};

export default FormattedDateTime;
