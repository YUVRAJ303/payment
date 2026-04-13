// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar"; // ✅ Navbar import
// import Footer from "../components/footer"; // ✅ Footer import
// import S1 from "../assets/s1.png";
// import S2 from "../assets/s2.png";
// import S3 from "../assets/s3.png";
// import S4 from "../assets/s4.png";

// const thumbnails = [S1, S2, S3, S4];

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

// export default function PremiumCourses() {
//   const navigate = useNavigate();

//   const courses = [
//     {
//       level: "Beginner",
//       title: "Google Ads Fundamentals",
//       duration: "6 weeks",
//       rating: "4.6",
//       students: "5,200 students",
//       price: "₹6,000",
//       modules: ["Account Setup", "Ad Types", "Keywords", "Basics"],
//     },
//     {
//       level: "Intermediate",
//       title: "Advanced Google Ads Certification",
//       duration: "8 weeks",
//       rating: "4.8",
//       students: "8,750 students",
//       price: "₹10,000",
//       modules: ["Campaign Setup", "Ad Creation", "Keyword Research", "Bidding"],
//     },
//     {
//       level: "Advanced",
//       title: "Performance Marketing Mastery",
//       duration: "10 weeks",
//       rating: "4.9",
//       students: "3,400 students",
//       price: "₹14,000",
//       modules: ["Scaling", "Analytics", "Automation", "ROAS"],
//     },
//     {
//       level: "Beginner",
//       title: "Social Media Ads Bootcamp",
//       duration: "5 weeks",
//       rating: "4.7",
//       students: "6,100 students",
//       price: "₹5,500",
//       modules: ["Facebook Ads", "Instagram Ads", "Creatives", "Targeting"],
//     },
//     {
//       level: "Intermediate",
//       title: "SEO Growth Program",
//       duration: "8 weeks",
//       rating: "4.8",
//       students: "7,800 students",
//       price: "₹9,000",
//       modules: ["On-Page SEO", "Technical SEO", "Content", "Link Building"],
//     },
//     {
//       level: "Advanced",
//       title: "Conversion Rate Optimization (CRO)",
//       duration: "6 weeks",
//       rating: "4.9",
//       students: "2,900 students",
//       price: "₹11,000",
//       modules: ["Funnels", "A/B Testing", "Heatmaps", "UX"],
//     },
//     {
//       level: "Beginner",
//       title: "Digital Marketing Starter Pack",
//       duration: "4 weeks",
//       rating: "4.5",
//       students: "9,200 students",
//       price: "₹4,000",
//       modules: ["SEO", "Ads", "Email", "Analytics"],
//     },
//     {
//       level: "Intermediate",
//       title: "Email Marketing Automation",
//       duration: "6 weeks",
//       rating: "4.7",
//       students: "4,600 students",
//       price: "₹7,500",
//       modules: ["Flows", "Segmentation", "Copywriting", "Tools"],
//     },
//     {
//       level: "Advanced",
//       title: "Marketing Analytics & GA4",
//       duration: "7 weeks",
//       rating: "4.8",
//       students: "3,100 students",
//       price: "₹12,000",
//       modules: ["GA4", "Dashboards", "Events", "Insights"],
//     },
//     {
//       level: "Beginner",
//       title: "Content Marketing Blueprint",
//       duration: "5 weeks",
//       rating: "4.6",
//       students: "6,700 students",
//       price: "₹5,000",
//       modules: ["Blogs", "Video", "SEO Content", "Distribution"],
//     },
//     {
//       level: "Intermediate",
//       title: "YouTube Ads Mastery",
//       duration: "6 weeks",
//       rating: "4.7",
//       students: "4,200 students",
//       price: "₹8,500",
//       modules: ["Video Ads", "Targeting", "Creatives", "Scaling"],
//     },
//     {
//       level: "Advanced",
//       title: "E-commerce Growth Marketing",
//       duration: "9 weeks",
//       rating: "4.9",
//       students: "2,300 students",
//       price: "₹15,000",
//       modules: ["Shopify", "Paid Ads", "Retention", "LTV"],
//     },
//   ];

//   return (
//     <>
//       {/* ✅ Navbar */}
//       <Navbar />

//       {/* ✅ Premium Courses Section */}
//       <section
//         className="w-full px-4 sm:px-6 lg:px-8 py-16 mt-24" // mt-24 for navbar spacing
//         style={{
//           background: "linear-gradient(180deg, #1D3FFF 0%, #040C82 100%)",
//         }}
//       >
//         <div className="max-w-7xl mx-auto text-center text-white">
//           <h2 className="text-3xl font-bold mb-4">Our Premium Courses</h2>
//           <p className="text-sm max-w-3xl mx-auto mb-12 opacity-90">
//             Industry-designed programs with hands-on projects and career support.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {courses.map((course, index) => (
//               <motion.div
//                 key={index}
//                 variants={cardIdle}
//                 animate="animate"
//                 whileHover={{
//                   y: -14,
//                   scale: 1.03,
//                   boxShadow: "0px 25px 50px rgba(0,0,0,0.25)",
//                 }}
//                 className="bg-white text-gray-800 rounded-2xl overflow-hidden cursor-pointer"
//               >
//                 {/* Thumbnail */}
//                 <div
//                   className="relative h-44 bg-cover bg-center flex items-center justify-center"
//                   style={{
//                     backgroundImage: `url(${thumbnails[index % thumbnails.length]})`,
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-black/35" />
//                   <motion.div
//                     whileHover={{ scale: 1.2, rotate: 10 }}
//                     className="relative z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
//                   >
//                     ▶
//                   </motion.div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 text-left">
//                   <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-3">
//                     {course.level}
//                   </span>

//                   <h3 className="font-bold text-lg mb-3 leading-snug">{course.title}</h3>

//                   <div className="flex items-center text-xs text-gray-500 mb-4 gap-3">
//                     <span>⏱ {course.duration}</span>
//                     <span>⭐ {course.rating}</span>
//                     <span>{course.students}</span>
//                   </div>

//                   <p className="text-sm font-semibold mb-2">Course Modules:</p>

//                   <ul className="text-xs text-gray-500 mb-5 space-y-1">
//                     {course.modules.map((m, i) => (
//                       <li key={i}>• {m}</li>
//                     ))}
//                   </ul>

//                   <span className="block text-xl font-extrabold text-[#1D3FFF] mb-3">
//                     {course.price}
//                   </span>

//                   {/* Enroll Now */}
//                   <button
//                     onClick={() => {
//                       navigate("/enroll");
//                       window.scrollTo(0, 0);
//                     }}
//                     className="w-full bg-gradient-to-r from-[#1D3FFF] to-[#040C82] text-white text-sm py-3 rounded-lg hover:opacity-90 transition"
//                   >
//                     Enroll Now
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ✅ Footer */}
//       <Footer />
//     </>
//   );
// }
