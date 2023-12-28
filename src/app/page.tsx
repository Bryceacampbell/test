"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return data ? JSON.stringify(data) : "Loading...";
}
