import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div>
        Welcome to Buzzpoints! Use the headers above to <Link href="/set" className="underline">view stats by question set</Link> or <Link href="/tournament" className="underline">view stats by tournament</Link>.
      </div>
      <br></br>
      <div>
        This website was created as a Vercel app from open-source code written by members of the quizbowl community.<br></br>The code processes QBJ data assembled using <Link href="https://github.com/alopezlago/MODAQ/" className="underline">MODAQ</Link> to read quizbowl packets.
      </div>
      <br></br>
      <div>
        To create your own buzzpoints site from QBJ data, read the directions in the <Link href="https://github.com/JemCasey/buzzpoint-migrator" className="underline">buzzpoint-migrator</Link> and <Link href="https://github.com/ani-per/buzzpoints" className="underline">buzzpoints</Link> GitHub repositories.
      </div>
    </Layout>
  );
}
