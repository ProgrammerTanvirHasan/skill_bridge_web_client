import { Navbar1 } from "./navbar1";
import { getSession } from "@/lib/service/user.service";

export default async function Navbar() {
  const userResponse = await getSession();
  const user = userResponse?.data?.data ?? null;

  return <Navbar1 user={user} />;
}
