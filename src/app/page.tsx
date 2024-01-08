"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Home() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<string>("");
  const isChinaInstance = process.env.NEXT_PUBLIC_APP_INSTANCE === "China";

  useEffect(() => {
    const fetchData = async () => {
      const promises = Array.from({
        length: Number(process.env.NEXT_PUBLIC_REQUEST_COUNT),
      }).map(async (_, i) => {
        const start = performance.now();
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studyId: "9" }),
        });
        const end = performance.now();
        return (end - start) / 1000;
      });

      const times = await Promise.all(promises);
      setMetrics(times);
    };

    fetchData();
  }, []);

  const onInputChange = (e: any) => setInput(e.target.value);

  const onWrite = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/write`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: input }),
    });
    setInput("");
  };

  const onRead = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studyId: "1" }),
    });
    const result = await res.json();
    setData(result[0].study.data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        US &#61;&gt; China Replication Proof of Concept
      </h1>
      <h2 className={styles.subTitle}>
        Instance: {process.env.NEXT_PUBLIC_APP_INSTANCE}
      </h2>
      <div className={styles.horizontal}>
        <div className={styles.vertical}>
          <h2 className={styles.subTitle}>Performance Metrics:</h2>
          {metrics.length ? (
            <>
              {metrics.map((metric, index) => (
                <p className={styles.body} key={index}>
                  Request {index + 1}: {metric.toFixed(2)} s
                </p>
              ))}
              <p className={styles.body}>
                Average Time:{" "}
                {(metrics.reduce((a, b) => a + b, 0) / metrics.length).toFixed(
                  2
                )}{" "}
                s
              </p>
            </>
          ) : (
            "Loading..."
          )}
        </div>
        <div className={styles.vertical}>
          <h2 className={styles.subTitle}>Read/Write to DB:</h2>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Write to the DB"
              value={input}
              onChange={onInputChange}
              disabled={isChinaInstance}
            />
            <button
              disabled={isChinaInstance || !Boolean(input.length)}
              onClick={onWrite}
            >
              Write
            </button>
          </div>
          <div className={styles.inputContainer}>
            <button onClick={onRead}>Read</button>
            {data && <p className={styles.body}>{data}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
