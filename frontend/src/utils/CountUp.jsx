// import { useEffect, useState } from "react";

// function CountUp({ end, duration = 2000, suffix = "", start = false }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!start) return; // 🔴 yahin control hai

//     const startTime = performance.now();

//     function update(currentTime) {
//       const progress = Math.min((currentTime - startTime) / duration, 1);
//       const value = Math.floor(progress * end);
//       setCount(value);

//       if (progress < 1) {
//         requestAnimationFrame(update);
//       }
//     }

//     requestAnimationFrame(update);
//   }, [end, duration, start]);

//   return (
//     <>
//       {count}
//       {suffix}
//     </>
//   );
// }

// export default CountUp;
