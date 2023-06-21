import React from "react";

const BgLayout = (props) => {
  return (
    <>
      <div className="BgLayoutMain">{props.children}</div>
         {/* <video controls>
                        <source src={value?.videoUrl} type="video/mp4" />
                      </video> */}
    </>
  );
};

export default BgLayout;
