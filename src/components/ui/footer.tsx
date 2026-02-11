import Link from "next/link";

export default function SkillBridgeFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
              <span className="text-xl">🎓</span>
              SkillBridge
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Connect with expert tutors and learn anything. Book sessions instantly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Explore</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/tutors" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Browse Tutors</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Login</Link></li>
              <li><Link href="/register" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">For Students</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link></li>
              <li><Link href="/dashboard/bookings" className="text-sm text-muted-foreground transition-colors hover:text-foreground">My Bookings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">For Tutors</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/tutor" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Tutor Dashboard</Link></li>
              <li><Link href="/tutor/availability" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Availability</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SkillBridge. Connect with Expert Tutors, Learn Anything.
        </div>
      </div>
    </footer>
  );
}
