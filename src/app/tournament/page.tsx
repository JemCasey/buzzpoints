import { getTournamentsQuery } from "@/utils/queries";
import Layout from "@/components/Layout";
import Table from "@/components/Table";

export default function Home() {
  const tournaments = getTournamentsQuery.all();
  const columns = [
    {
      key: "name",
      label: "Tournament",
      linkTemplate: "/tournament/{{slug}}"
    },
    {
      key: "location",
      label: "Location"
    },
    {
      key: "level",
      label: "Level"
    },
    {
      key: "start_date",
      label: "Date",
      defaultSort: "desc" as const
    }
  ];

  return (
    <Layout>
      <h3 className="text-2xl font-bold my-5">Recent Tournaments</h3>
      <Table
        columns={columns}
        data={tournaments}
         />
    </Layout>
  );
}