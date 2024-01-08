import { getSequelize } from "@/sequelize";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const { studyId } = await req.json();
    const sequelize = await getSequelize();
    const [results] = await sequelize.query(
      `SELECT * FROM public.test WHERE study_id='${studyId}'`
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
