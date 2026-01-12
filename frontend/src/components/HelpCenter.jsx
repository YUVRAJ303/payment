import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function HelpCenter() {
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
            Help <span className="text-black">Center</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base max-w-3xl mx-auto opacity-90"
          >
            Get answers to common questions and find the support you need.
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
                Account & Enrollment
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Learn how to create an account, enroll in courses, and manage
                your profile settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#012A7C]">
                Courses & Payments
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Information about course access, payments, refunds, and billing
                support.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#012A7C]">
                Technical Support
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Facing technical issues? Get help with login problems, videos,
                and platform errors.
              </p>
            </div>

            <div className="pt-6 border-t text-sm text-gray-500">
              Need more help? Contact our support team anytime.
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
