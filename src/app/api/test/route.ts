import { getSequelize } from "@/sequelize";
import { NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST() {
  try {
    const sequelize = await getSequelize();
    const [results] = await sequelize.query(
      "SELECT * FROM test.test WHERE study_id='9'"
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
