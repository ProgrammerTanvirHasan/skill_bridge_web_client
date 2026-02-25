import { CommonLayoutClient } from "@/components/common-layout-client";
import { Navbar1 } from "@/components/navbar1";
import { getSession } from "@/lib/service/user.service";
import Display from "@/components/ui/display";
import HomePage from "@/components/ui/featured";
import Test from "@/components/ui/test";
import Testimonials from "@/components/ui/testimonial";
import SkillBridgeFooter from "@/components/ui/footer";
import { SessionUser } from "@/types";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  const initialUser: SessionUser | null = session.data?.data ?? null;

  return (
    <CommonLayoutClient initialUser={initialUser}>
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
