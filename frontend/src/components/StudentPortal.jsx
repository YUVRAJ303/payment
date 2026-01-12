import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function StudentPortal() {
  return (
    <>
      <Navbar />

      <section className="w-full font-inter bg-[#F6F9FF] overflow-hidden pt-24">
        {/* HERO */}
        <div className="bg-gradient-to-r from-[#0A77FF] to-[#012A7C] py-24 px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-[48px] font-bold"
          >
            Student <span className="text-black">Portal</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base max-w-3xl mx-auto opacity-90"
          >
            Access your courses, progress, and learning resources in one place.
          </motion.p>
        </div>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-10 space-y-8"
          >
            <div>
              <h2 className="text-xl font-semibold text-[#012A7C]">
                My Courses
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                View enrolled courses, continue learning, and track progress.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#012A7C]">
                Assignments & Results
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Submit assignments, check grades, and review feedback from
                instructors.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#012A7C]">
                Learning Resources
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Access notes, recordings, downloads, and additional materials.
              </p>
            </div>

            <div className="pt-6 border-t text-sm text-gray-500">
              Portal access is available 24/7 for enrolled students.
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
