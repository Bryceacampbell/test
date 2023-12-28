import { getSequelize } from "@/sequelize";

export async function GET() {
  const sequelize = await getSequelize();
  const [results] = await sequelize.query("SELECT * FROM test.test");
  return Response.json(results, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
}
