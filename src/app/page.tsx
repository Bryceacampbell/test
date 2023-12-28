"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = Array.from({
        length: Number(process.env.NEXT_PUBLIC_REQUEST_COUNT),
      }).map(async (_, i) => {
        const start = performance.now();
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test`, {
          method: "GET",
        });
        const end = performance.now();
        return (end - start) / 1000;
      });

      const times = await Promise.all(promises);
      setMetrics(times);
    };

    fetchData();
  }, []);

  return (
    <div>
      {metrics.length ? (
        <>
          <h1>Performance Metrics</h1>
          {metrics.map((metric, index) => (
            <p key={index}>
              Request {index + 1}: {metric.toFixed(2)} s
            </p>
          ))}
          <p>
            Average Time:{" "}
            {(metrics.reduce((a, b) => a + b, 0) / metrics.length).toFixed(2)} s
          </p>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
