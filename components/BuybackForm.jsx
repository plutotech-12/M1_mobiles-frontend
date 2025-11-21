"use client";

import { useState } from "react";
import { DollarSign, CheckCircle, Smartphone } from "lucide-react";

// ❗ Optional: If you want Supabase integration later, tell me.
// import { supabase } from "../lib/supabase";

export default function BuybackForm() {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    device_brand: "",
    device_model: "",
    device_condition: "",
    expected_price: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ❗ Placeholder until you say if you want to use Supabase or our backend API
      console.log("FORM SUBMITTED:", formData);

      // Reset form
      setSubmitted(true);
      setFormData({
        customer_name: "",
        email: "",
        phone: "",
        device_brand: "",
        device_model: "",
        device_condition: "",
        expected_price: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting buyback request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "expected_price"
          ? value === "" ? "" : Number(value)
          : value,
    }));
  };

  return (
    <section
      id="buyback"
      className="py-16 bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full mb-4">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sell Your Device
          </h2>
          <p className="text-xl text-gray-600">
            Get the best value for your old smartphone. Quick, easy, and
            hassle-free!
          </p>
        </div>

        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">
              Your buyback request has been submitted successfully! We'll
              contact you soon.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* NAME */}
              <div>
                <label
                  htmlFor="customer_name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* BRAND */}
              <div>
                <label
                  htmlFor="device_brand"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Device Brand *
                </label>
                <select
                  id="device_brand"
                  name="device_brand"
                  value={formData.device_brand}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Realme">Realme</option>
                  <option value="Vivo">VVivo</option>
                  <option value="Oppo">Oppo</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* MODEL */}
              <div>
                <label
                  htmlFor="device_model"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Device Model *
                </label>
                <input
                  type="text"
                  id="device_model"
                  name="device_model"
                  value={formData.device_model}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="iPhone 13 Pro"
                />
              </div>

              {/* EXPECTED PRICE */}
              <div>
                <label
                  htmlFor="expected_price"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Expected Price (Optional)
                </label>
                <input
                  type="number"
                  id="expected_price"
                  name="expected_price"
                  value={formData.expected_price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="₹35000"
                />
              </div>
            </div>

            {/* DEVICE CONDITION */}
            <div>
              <label
                htmlFor="device_condition"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Device Condition *
              </label>
              <textarea
                id="device_condition"
                name="device_condition"
                value={formData.device_condition}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe the condition"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Smartphone className="h-5 w-5" />
              <span>{loading ? "Submitting..." : "Submit Request"}</span>
            </button>
          </form>
        </div>

        {/* STEPS */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-orange-600 font-bold text-3xl mb-2">1</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Submit Details
            </h3>
            <p className="text-sm text-gray-600">
              Fill out the form with your device information
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-orange-600 font-bold text-3xl mb-2">2</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Get Evaluation
            </h3>
            <p className="text-sm text-gray-600">
              We'll assess your device and provide a quote
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-orange-600 font-bold text-3xl mb-2">3</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Receive Payment
            </h3>
            <p className="text-sm text-gray-600">
              Get paid quickly once we receive your device
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
