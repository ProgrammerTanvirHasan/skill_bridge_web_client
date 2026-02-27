import { CommonLayoutClient } from "@/components/common-layout-client";
import { Navbar1 } from "@/components/navbar1";
import Display from "@/components/ui/display";
import HomePage from "@/components/ui/featured";
import Test from "@/components/ui/test";
import Testimonials from "@/components/ui/testimonial";
import SkillBridgeFooter from "@/components/ui/footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommonLayoutClient>
      <div>
        <Navbar1 />
        <Display />
        <HomePage />
        <Test />
        <Testimonials />
        {children}
        <SkillBridgeFooter />
      </div>
    </CommonLayoutClient>
  );
}
