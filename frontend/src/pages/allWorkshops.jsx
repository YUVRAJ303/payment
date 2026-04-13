// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar"; // ✅ Navbar import
// import Footer from "../components/footer"; // ✅ Footer import
// import S1 from "../assets/s1.png";
// import S2 from "../assets/s2.png";
// import S3 from "../assets/s3.png";

// const workshops = [
//   {
//     id: 1,
//     bg: S1,
//     title: "Advanced Google Ads Mastery",
//     date: "March 15, 2026",
//     duration: "3 Hours",
//     instructor: "Ankit Pandey",
//     price: "₹10,000",
//     level: "Advanced",
//     learnings: ["Campaign Optimization", "Bidding Strategies", "Performance Analysis"],
//   },
//   {
//     id: 2,
//     bg: S2,
//     title: "Meta Ads Scaling Workshop",
//     date: "March 22, 2026",
//     duration: "3 Hours",
//     instructor: "Rohit Sharma",
//     price: "₹9,000",
//     level: "Intermediate",
//     learnings: ["Audience Targeting", "Creative Testing", "Scaling Campaigns"],
//   },
//   {
//     id: 3,
//     bg: S3,
//     title: "SEO Growth Bootcamp",
//     date: "March 28, 2026",
//     duration: "4 Hours",
//     instructor: "Neha Verma",
//     price: "₹8,000",
//     level: "Beginner",
//     learnings: ["Keyword Research", "On-Page SEO", "Ranking Strategy"],
//   },
//   {
//     id: 4,
//     bg: S1,
//     title: "YouTube Ads Masterclass",
//     date: "April 5, 2026",
//     duration: "3 Hours",
//     instructor: "Aman Gupta",
//     price: "₹9,500",
//     level: "Intermediate",
//     learnings: ["Video Ad Formats", "Audience Intent", "YouTube Scaling"],
//   },
//   {
//     id: 5,
//     bg: S2,
//     title: "Email Marketing Automation",
//     date: "April 12, 2026",
//     duration: "2.5 Hours",
//     instructor: "Priya Mehta",
//     price: "₹7,500",
//     level: "Beginner",
//     learnings: ["Email Flows", "Segmentation", "Automation Tools"],
//   },
//   {
//     id: 6,
//     bg: S3,
//     title: "Conversion Rate Optimization (CRO)",
//     date: "April 18, 2026",
//     duration: "3 Hours",
//     instructor: "Kunal Shah",
//     price: "₹11,000",
//     level: "Advanced",
//     learnings: ["A/B Testing", "Landing Pages", "User Behavior"],
//   },
//   {
//     id: 7,
//     bg: S1,
//     title: "Google Analytics 4 Deep Dive",
//     date: "April 25, 2026",
//     duration: "3 Hours",
//     instructor: "Siddharth Jain",
//     price: "₹8,500",
//     level: "Intermediate",
//     learnings: ["GA4 Setup", "Event Tracking", "Custom Reports"],
//   },
//   {
//     id: 8,
//     bg: S2,
//     title: "Content Marketing Strategy",
//     date: "May 2, 2026",
//     duration: "2 Hours",
//     instructor: "Ananya Singh",
//     price: "₹6,000",
//     level: "Beginner",
//     learnings: ["Content Planning", "SEO Content", "Distribution Strategy"],
//   },
//   {
//     id: 9,
//     bg: S3,
//     title: "E-commerce Growth Workshop",
//     date: "May 9, 2026",
//     duration: "4 Hours",
//     instructor: "Vikas Malhotra",
//     price: "₹12,000",
//     level: "Advanced",
//     learnings: ["Paid Ads", "Retention", "LTV Optimization"],
//   },
// ];

// const cardIdle = {
//   animate: {
//     y: [0, -6, 0],
//     transition: {
//       duration: 5,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// export default function UpcomingWorkshops() {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* ✅ Navbar */}
//       <Navbar />

//       {/* ✅ Workshops Section */}
//       <section className="min-h-screen bg-[linear-gradient(135deg,#1D3FFF_0%,#040C82_100%)] text-white flex flex-col items-center py-16 px-6 mt-24">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Workshops</h1>
//         <p className="text-center max-w-2xl text-blue-100 mb-12">
//           Join our intensive workshops led by industry experts. Get hands-on experience with the latest tools and strategies in digital marketing.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
//           {workshops.map((workshop) => (
//             <motion.div
//               key={workshop.id}
//               variants={cardIdle}
//               animate="animate"
//               whileHover={{ y: -14, scale: 1.03, boxShadow: "0px 25px 50px rgba(0,0,0,0.25)" }}
//               className="bg-white text-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden cursor-pointer"
//             >
//               <div
//                 className="relative h-40 flex items-center justify-center bg-cover bg-center"
//                 style={{ backgroundImage: `url(${workshop.bg})` }}
//               >
//                 <div className="absolute inset-0 bg-black/25" />
//                 <motion.div
//                   whileHover={{ scale: 1.2, rotate: 10 }}
//                   className="relative z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
//                 >
//                   ▶
//                 </motion.div>
//               </div>

//               <div className="p-6 flex flex-col flex-1">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{workshop.level}</span>
//                   <span className="font-semibold text-blue-600">{workshop.price}</span>
//                 </div>

//                 <h3 className="font-bold text-lg mb-3">{workshop.title}</h3>

//                 <ul className="text-sm text-gray-600 space-y-1 mb-4">
//                   <li>📅 {workshop.date}</li>
//                   <li>⏱ {workshop.duration}</li>
//                   <li>👤 {workshop.instructor}</li>
//                 </ul>

//                 <div className="mb-6">
//                   <p className="text-sm font-semibold mb-2">What You'll Learn:</p>
//                   <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                     {workshop.learnings.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <button
//                   onClick={() => navigate("/enroll")}
//                   className="mt-auto bg-gradient-to-r from-[#1D3FFF] to-[#040C82] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
//                 >
//                   Enroll Now
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ✅ Footer */}
//       <Footer />
//     </>
//   );
// }
