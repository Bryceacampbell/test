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
    console.log("The results are: ");
    console.log(results);
    console.log("The type of results is: ");
    console.log(typeof results);
    console.log("The return statement is now running.")
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
