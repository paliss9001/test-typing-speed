import { useEffect } from "react";

export default function Stats({
  activeMode,
  seconds,
  setSeconds,
  status,
  setStatus,
  accuracyRate,
  targetWpm
}) {
  const statsData = [
    ["WPM", "0"],
    ["Accuracy", "100%"],
    ["Time", `0:${seconds}`],
  ];

  const [wpmData, accuracy, time] = statsData

  if (activeMode === "passage") {
    time[1] = "Passage"
  }

  if (isNaN(accuracyRate)) {
    accuracyRate = 0
  }

  if (status === "running") {
    wpmData[1] = "~"
  }

  accuracy[1] = accuracyRate.toFixed(0) + "%"

  useEffect(() => {
    if (status !== "running") return; 

    if (activeMode !== "timed") return

    if (seconds === 0) {
      setStatus("finished");
      return
    }

    let id = setTimeout(() => setSeconds(seconds - 1), 1000)

    return () => clearTimeout(id)
  }, [seconds, status])

  return (
    <dl className="stats-list">
      {statsData.map((statsItem, index) => {
        const [term, data] = statsItem;

        return <StatsItem key={index} term={term} data={data} />;
      })}
    </dl>
  );
}

function StatsItem({ term, data }) {
  return (
    <div className="stats-list__item">
      <dt className="stats-list__term">{term}:</dt>
      <dd className="stats-list__data">{data}</dd>
    </div>
  );
}
