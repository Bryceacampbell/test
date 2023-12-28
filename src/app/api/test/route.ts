import { getSequelize } from "@/sequelize";
import { NextResponse } from "next/server";

export const maxDuration = 300;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const sequelize = await getSequelize();
    const [results] = await sequelize.query(
      "SELECT * FROM test.test WHERE study_id='9'"
    );
    return NextResponse.json(results, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An error occurred" },
      {
        status: 500,
      }
    );
  }
}
