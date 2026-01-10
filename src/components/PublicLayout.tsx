// src/components/PublicLayout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// ✅ Correct Frontend Navbar Import
import NavbarSection from "@/pages/NavbarSection"; 

// ✅ Footer Import
import Footer from "@/components/PageFooter";

// ✅ Leasing Module Import (The Modal)
import PolishedLeasingModule from "@/components/PolishedLeasingModule"; 

// ✅ 1. ADD THIS IMPORT
import CTABanner from "@/pages/CTABanner";

export default function PublicLayout() {
  // State to manage the visibility of the Leasing Modal
  const [isLeasingOpen, setIsLeasingOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* 1. Frontend Navbar */}
      <NavbarSection onOpenLeasing={() => setIsLeasingOpen(true)} />

      {/* 2. Main Content 
          'pt-24 lg:pt-32' ensures content isn't hidden behind the fixed navbar
      */}
      <main className="flex-grow pt-24 lg:pt-32">
        <Outlet />
      </main>

      {/* ✅ 3. CTA Banner 
          Placed here so it sits right on top of the footer 
      */}
      <CTABanner />

      {/* 4. Footer */}
      <Footer />

      {/* 5. Leasing Module Modal */}
      <PolishedLeasingModule 
        isOpen={isLeasingOpen} 
        onClose={() => setIsLeasingOpen(false)} 
      />
    </div>
  );
}