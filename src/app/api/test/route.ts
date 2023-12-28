import { getSequelize } from "@/sequelize";
import { NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST() {
  try {
    const sequelize = await getSequelize();
    const [results] = await sequelize.query("SELECT * FROM test.test");
    return NextResponse.json(results, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
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
