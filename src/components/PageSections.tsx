// src/components/PageSections.tsx

import HowItWorks from "./sections/HowItWorks";
import FeaturesSection from "./sections/FeaturesSection";
import PricingSection from "./sections/PricingSection";
import PaymentOptionsSection from "./sections/PaymentOptionsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FaqSection from "./sections/FaqSection";
import CTABanner from "./sections/CTABanner";

interface PageSectionsProps {
  tiers?: any[];
  tiersLoading?: boolean;
  tiersError?: string | null;
  navigate: (path: string) => void;
}

export const PageSections = ({ 
  tiers, 
  tiersLoading, 
  tiersError, 
  navigate 
}: PageSectionsProps) => {
  return (
    <div className="flex flex-col gap-0">
      
      {/* 1. HOW IT WORKS (Fixed) */}
      <div id="how-it-works" className="scroll-mt-32">
        <HowItWorks />
      </div>

      {/* 2. FEATURES (Fixed) */}
      <div id="features" className="scroll-mt-32">
        <FeaturesSection />
      </div>

      {/* 3. PRICING (Already Working) */}
      <div id="pricing" className="scroll-mt-32">
        <PricingSection
          tiers={tiers}
          tiersLoading={tiersLoading}
          tiersError={tiersError}
          navigate={navigate}
        />
      </div>

      {/* 4. PAYMENT OPTIONS (Already Working) */}
      <div id="payment-options" className="scroll-mt-32">
        <PaymentOptionsSection />
      </div>

      {/* 5. REVIEWS (Already Working) */}
      <div id="testimonials" className="scroll-mt-32">
        <TestimonialsSection />
      </div>

      {/* 6. FAQ (Fixed) */}
      <div id="faq" className="scroll-mt-32">
        <FaqSection />
      </div>

      <CTABanner navigate={navigate} />
    </div>
  );
};