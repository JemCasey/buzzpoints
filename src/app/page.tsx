import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div>
        Welcome to Buzzpoints! Click <Link href="/tournament" className="underline">here to view stats by tournament</Link> or <Link href="/set" className="underline">here to view stats by question set</Link>.
      </div>
    </Layout>
  );
}