// import React, { useState, useEffect } from "react";
// import {Component as RD3Component}  from 'react-d3-library';
// import {getNode, getCountry, setBounds} from './D3'

// function Globe ({onClick}) {
//   const [count, setCount] = useState(0);
//   const node = getNode();
//   const click = () => {
//     onClick(getCountry);
//     setCount(0);
//   }
//   useEffect(() => {
//     setTimeout(() => setCount(count+1), 1);
//   })
//   return (
//           <div className='globe' onClick={() => click()}>
//             <RD3Component data={node} />
//           </div>
//      )
// };
// export default Globe;