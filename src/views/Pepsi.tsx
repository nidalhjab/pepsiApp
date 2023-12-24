import React, { useEffect, useRef, useState } from "react";
import { ControlSari } from "../common/components/ControlSari";
import { SARI_API } from "../common/components/Constants";

export default function Pepsi() {
  const [transactionsData, setTransactionsData] = useState<any>([]);
  const sariFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if(sariFrameRef.current?.contentWindow){
      //I used the setTimeOut here to be sure that the ifram mount and the ref is not null
      setTimeout(()=>{
        sariFrameRef.current?.contentWindow?.postMessage(
          { type: "TOKEN", token:246 },
          SARI_API
        );
      },1000)
    }

    const handleTransactionsData = (event: any) => {
      if (event.data.type === "TRANSACTIONS_DATA") {
        const deliveredData = event.data.data;
        setTransactionsData(deliveredData);
      }
    };

    window.addEventListener("message", handleTransactionsData);

    return () => {
      window.removeEventListener("message", handleTransactionsData);
    };
  }, []);

  return (
    <div className="main-container">
      <ControlSari framRef={sariFrameRef} data={transactionsData} />
      <iframe
        ref={sariFrameRef}
        className="iframe"
        title="Sari Map"
        src={SARI_API}
      />
    </div>
  );
}
