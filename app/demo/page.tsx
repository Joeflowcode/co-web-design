import { redirect } from "next/navigation";

// /demo redirects to the app with demo context
// Authentication middleware handles the demo session
export default function DemoPage() {
  redirect("/login?demo=true");
}
