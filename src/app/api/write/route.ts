import { getSequelize } from "@/sequelize";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_APP_INSTANCE === "China") {
    return NextResponse.json(
      { error: "Writing to the DB is not allowed via the China instance" },
      {
        status: 403,
      }
    );
  }
  try {
    const { data } = await req.json();
    const sequelize = await getSequelize();
    const [results] = await sequelize.query(
      `UPDATE test.test 
       SET study = ARRAY['{"data": "${data}"}']::json[]
       WHERE study_id = '1'
       RETURNING *;`
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
