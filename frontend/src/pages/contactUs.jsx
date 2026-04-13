// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";

// export default function ContactUs() {
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "/contactus") {
//       const scrollToTop = () => {
//         const duration = 700; // scroll duration in ms
//         const start = window.pageYOffset;
//         const startTime = performance.now();

//         const easeInOutQuad = (t) =>
//           t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easing function

//         const animate = (currentTime) => {
//           const timeElapsed = currentTime - startTime;
//           const progress = Math.min(timeElapsed / duration, 1);
//           const ease = easeInOutQuad(progress);
//           window.scrollTo(0, start * (1 - ease));

//           if (progress < 1) {
//             requestAnimationFrame(animate);
//           }
//         };

//         requestAnimationFrame(animate);
//       };

//       scrollToTop();
//     }
//   }, [location]);

//   return (
//     <>
//       <Navbar />

//       <section className="w-full font-inter bg-[#F6F9FF] overflow-hidden pt-24">
//         {/* HERO */}
//         <div className="bg-gradient-to-r from-[#0A77FF] to-[#012A7C] py-24 px-6 text-center text-white">
//           <motion.h1
//             initial={{ opacity: 0, y: 18 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight"
//           >
//             Let’s <span className="text-black">Talk</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 18 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="mt-4 text-sm sm:text-base max-w-2xl mx-auto opacity-90"
//           >
//             Questions, doubts, or just exploring your next move?
//             We’re here to help you figure it out.
//           </motion.p>
//         </div>

//         {/* CONTENT */}
//         <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* LEFT INFO */}
//           <motion.div
//             initial={{ opacity: 0, y: 26 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-2xl shadow-lg p-10"
//           >
//             <h2 className="text-xl sm:text-2xl font-semibold text-[#012A7C]">
//               Get in Touch
//             </h2>
//             <p className="mt-4 text-sm text-gray-600 leading-relaxed">
//               Whether you’re planning a career switch, upskilling for growth,
//               or just need clarity — reach out. A real human will respond.
//             </p>
//             <div className="mt-8 space-y-6 text-sm">
//               <div>
//                 <p className="font-semibold text-gray-800">📍 Address</p>
//                 <p className="text-gray-600">
//                   SkyTouch Academy, Tech Park, Bangalore, India
//                 </p>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800">📞 Phone</p>
//                 <p className="text-gray-600">+91 98765 43210</p>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800">✉️ Email</p>
//                 <p className="text-gray-600">support@skytouchacademy.com</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* RIGHT FORM */}
//           <motion.form
//             initial={{ opacity: 0, y: 26 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="bg-white rounded-2xl shadow-lg p-10 space-y-6"
//           >
//             <h2 className="text-xl sm:text-2xl font-semibold text-[#012A7C]">
//               Send a Message
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <input
//               type="text"
//               placeholder="Subject"
//               className="border rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <textarea
//               rows="5"
//               placeholder="Your Message"
//               className="border rounded-lg px-4 py-3 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <button
//               type="submit"
//               className="
//                 w-full py-3 rounded-lg
//                 bg-gradient-to-r from-[#0A77FF] to-[#012A7C]
//                 text-white font-semibold text-sm
//                 hover:opacity-90 transition
//               "
//             >
//               Send Message
//             </button>
//           </motion.form>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }
