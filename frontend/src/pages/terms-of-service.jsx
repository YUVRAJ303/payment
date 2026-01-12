import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function TermsOfService() {
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
            Terms <span className="text-black">of Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base max-w-3xl mx-auto opacity-90"
          >
            Please read these terms carefully before using our platform.
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
                Use of Platform
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Users must use the platform responsibly and comply with all
                applicable laws and guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#012A7C]">
                Account Responsibility
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                You are responsible for maintaining the confidentiality of your
                account and login credentials.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#012A7C]">
                Termination
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                We reserve the right to suspend or terminate accounts that
                violate our terms.
              </p>
            </div>

            <div className="pt-6 border-t text-sm text-gray-500">
              Last updated: January 2026
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
