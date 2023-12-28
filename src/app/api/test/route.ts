import { getSequelize } from "@/sequelize";

export async function GET(request: Request, response: Response) {
  response.headers.set("Cache-Control", "no-store");
  const sequelize = await getSequelize();
  const [results] = await sequelize.query("SELECT * FROM test.test");
  return Response.json(results);
}
