import { getSequelize } from "@/sequelize";

export const maxDuration = 300;

export async function GET() {
  try {
    const sequelize = await getSequelize();
    const [results] = await sequelize.query("SELECT * FROM test.test");
    return Response.json(results, {
      headers: {
        Allow: "*",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "An error occurred" },
      {
        status: 500,
      }
    );
  }
}
