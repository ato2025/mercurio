import React from "react";

function ServiceTitleAndDesk({title,desc}) {
  return (
    <div className="servicesTitleAndDesc">
      <div className="text-white text-2xl font-semibold mb-3">
        {title}
      </div>
      <p className="text-blue-300">{desc}</p>
    </div>
  );
}

export default ServiceTitleAndDesk;
