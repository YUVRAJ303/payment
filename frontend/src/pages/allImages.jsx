// import { useEffect } from "react";
// import { motion } from "framer-motion";

// // import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import G1 from "../assets/g1.jpeg";
// import G2 from "../assets/g2.jpeg";
// import G3 from "../assets/g3.jpeg";
// import G4 from "../assets/g4.jpeg";
// import G5 from "../assets/g5.jpeg";
// import G6 from "../assets/g6.jpeg";
// import G7 from "../assets/g7.jpeg";
// import G8 from "../assets/g8.jpeg";

// const images = [G1, G2, G3, G4, G5, G6, G7, G8];

// export default function GalleryPage() {
//   // ✅ Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   return (
//     <>
//       <Navbar />

//       {/* page top space because navbar fixed */}
//       <section className="w-full min-h-screen pt-32 pb-20 px-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto">

//           {/* Heading */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//               Our <span className="text-blue-600">Gallery</span>
//             </h1>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Explore all the moments from our workshops and learning environment.
//             </p>
//           </motion.div>

//           {/* Images Grid – 3 per row */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//             {images.map((img, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: idx * 0.05 }}
//                 whileHover={{
//                   scale: 1.06,
//                   boxShadow: "0px 22px 36px rgba(0,0,0,0.22)",
//                 }}
//                 className="rounded-2xl overflow-hidden bg-white cursor-pointer"
//               >
//                 <img
//                   src={img}
//                   alt={`Gallery ${idx + 1}`}
//                   className="w-full h-72 object-cover"
//                 />
//               </motion.div>
//             ))}
//           </div>

//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }
