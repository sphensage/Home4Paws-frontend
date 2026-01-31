import React from "react";

const ForumContents = () => {
  return (
    // <div
    //   className="w-100 mt-3 d-flex flex-column flex-md-row gap-2"
    //   style={{
    //     backgroundColor: "rgba(0,0,0,0)",
    //     height: "calc(100% - 80px)",
    //     borderRadius: "7px",
    //   }}
    // >
    //   <div className="row gap-2">
    //     <div
    //       className="h-100 w-100 col-12 col-md-3"
    //       style={{ backgroundColor: "white" }}
    //     >
    //       POP
    //     </div>
    //     <div
    //       className="h-100 w-100 col-12 col-md-9"
    //       style={{ backgroundColor: "white" }}
    //     >
    //       POP
    //     </div>
    //   </div>
    // </div>
    <div
      className="mt-3 d-flex flex-column flex-md-row w-100 justify-content-between align-items-center"
      style={{ height: "calc(100% - 80px)", gap: "1rem" }}
    >
      <div
        className="col-12 col-md-3 h-100"
        style={{ backgroundColor: "white", borderRadius: "7px" }}
      >
        ee
      </div>
      <div
        className="col-12 col-md-9 h-100"
        style={{ backgroundColor: "white", borderRadius: "7px" }}
      >
        ee
      </div>
    </div>
  );
};

export default ForumContents;
