import { getSequelize } from "@/sequelize";

export const maxDuration = 300;

export async function POST() {
  const sequelize = await getSequelize();
  const [results] = await sequelize.query("SELECT * FROM test.test");
  return Response.json(results, {
    headers: {
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
