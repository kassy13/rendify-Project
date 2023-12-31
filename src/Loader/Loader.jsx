// import { Circles } from "react-loader-spinner";

// const Loader = () => {
//   return (
//     <div
//       className="w-full h-screen flex flex-col justify-center items-center z-[9999] fixed top-0 left-0"
//       style={{ background: "white" }}
//     >
//       <Circles
//         height="70%"
//         width="100%"
//         color="#1c0d4fc1"
//         ariaLabel="circles-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//         visible={true}
//       />
//     </div>
//   );
// };

// export default Loader;

import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="w-70 h-70vh flex flex-col justify-center items-center z-[9999] fixed top-0 left-0 right-0 bottom-0 mx-auto"
      // style={{ background: "white" }}
    >
      <Triangle
        height="70%"
        width="100%"
        color="#1c0d4fc1"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
