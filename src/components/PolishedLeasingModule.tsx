// src/components/PolishedLeasingModule.tsx
import React, { useEffect, useState } from "react";
import { X, CheckCircle, ArrowRight, FileText, Key, Home } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a UI Button, or standard HTML button works too

interface LeasingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PolishedLeasingModule = ({ isOpen, onClose }: LeasingModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const steps = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "1. Application",
      desc: "Fill out the online application form with your details and references.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "2. Approval",
      desc: "We review your credit and background. Approval typically takes 24-48 hours.",
    },
    {
      icon: <Key className="w-6 h-6 text-purple-600" />,
      title: "3. Lease Signing",
      desc: "Sign the lease digitally and pay the security deposit to secure the unit.",
    },
    {
      icon: <Home className="w-6 h-6 text-orange-600" />,
      title: "4. Move-In",
      desc: "Pick up your keys, complete the inspection, and welcome home!",
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 p-6 md:p-8 m-4 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leasing Process Guide</h2>
            <p className="text-gray-500 mt-1">Your step-by-step journey to your new home.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                {step.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / CTA */}
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900">Ready to get started?</h4>
            <p className="text-sm text-gray-500">View our available listings today.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
                onClick={onClose}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
                Close
            </button>
            <button 
                onClick={() => {
                    onClose();
                    // Navigate to listings or features if needed
                    window.location.href = '/features'; 
                }}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                Start Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolishedLeasingModule;