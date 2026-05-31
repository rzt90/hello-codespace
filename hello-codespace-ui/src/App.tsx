import { useState } from "react";

type ApiData = {
  msg: string,
  now: Date,
};

export default function App() {
  const [data, setData] = useState<ApiData>();
  const apiHandler = async () => {
    const resp = await fetch("/api/hello", {
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await resp.json();
    if (data) {
      const now = new Date(data.now);
      setData({ ...data, now });
    }
  }
  return <div>
    {data && <div>{data.msg} @ {data.now.toString()}</div>}
    <div><button onClick={apiHandler}>Get API data</button></div>
  </div>
}