import React, { FormEvent, useEffect, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { RadioButton } from "./RadioButton";
import ExcelDownloadButton from "./ ExcelDownloadButton";
import { SubmitButton } from "./SubmitButton";
import { TextField } from "./TextField";
import { SARI_API } from "./Constants";

export const ControlSari = ({ data, framRef }: any) => {
  const [piosName, setPiosName] = useState("");
  const [piosLat, setPiosLat] = useState("");
  const [piosLng, setPiosLng] = useState("");
  const [centerX, setCenterX] = useState("");
  const [centerY, setCenterY] = useState("");
  const [updatedZoom, setUpdatedZoom] = useState(0);
  const [selectedAddressDetails, setSelectedAddressDetails] = useState<string[]>([]);

  const handlePios = (e: FormEvent) => {
    e.preventDefault();
    framRef.current.contentWindow.postMessage(
      { type: "NEW_PIOS", name: piosName, lat: piosLat, lng: piosLng },
      SARI_API
    );
  };

  const handleCentroid = (e: FormEvent) => {
    e.preventDefault();
    framRef.current.contentWindow.postMessage(
      { type: "CENTER", centerX, centerY },
      SARI_API
    );
  };

  const handleZoom = (e: FormEvent) => {
    e.preventDefault();
    framRef.current.contentWindow.postMessage(
      { type: "Updated_ZOOM", updatedZoom },
      SARI_API
    );
  };

  useEffect(() => {
    const handleAddressDetails = (event: any) => {
      if (event.data.type === 'SELECTED_ADDRESS') {
        const addressDetails = event.data.details;
        setSelectedAddressDetails((prev: any) => [...prev, addressDetails])
      }
    };

    window.addEventListener('message', handleAddressDetails);

    return () => {
      window.removeEventListener('message', handleAddressDetails);
    };
  }, []);

  return (
    <div className="control-container">
      <h2>Sari Control Panel</h2>
      <div className="pios">
        <p>Add Point of intrests details</p>
        <form onSubmit={handlePios}>
          <TextField placeholder="Name" changeHandler={(e) => setPiosName(e.target.value)} />
          <TextField placeholder="Lat" changeHandler={(e) => setPiosLat(e.target.value)} />
          <TextField placeholder="Lng" changeHandler={(e) => setPiosLng(e.target.value)} />
          <SubmitButton handleSubmit={handlePios} />
        </form>
      </div>
      <hr />
      <div className="toggle">
        <p>Enable/disable Transaction Fetching</p>
        <ToggleButton id="fetch" />
        <p>Show data on map</p>
        <ToggleButton id="show" />
      </div>
      <hr />
      <div className="coordinates">
        <p>Set Map Centroid X,Y</p>
        <form>
          <TextField placeholder="Center - x" changeHandler={(e) => setCenterX(e.target.value)} />
          <TextField placeholder="center - y" changeHandler={(e) => setCenterY(e.target.value)} />
          <SubmitButton handleSubmit={handleCentroid} />
        </form>
      </div>
      <hr />
      <div className="zoom">
        <p>Set Zoom Level</p>
        <form>
          <TextField placeholder="Zoom Level" changeHandler={(e) => setUpdatedZoom(+e.target.value)} />
          <SubmitButton handleSubmit={handleZoom} />
        </form>
      </div>
      <hr />
      <div className="map-type">
        <p>Sari Map type</p>
        <RadioButton framRef={framRef} />
      </div>
      <div className="data-board">
        <div className="fetched">
          {data?.length > 0 && (
            <React.Fragment>
              <h5>Fetched Data</h5>
              {data.map((transactionData: any) => (
                <div className="fetched-data" key={transactionData.transactionNumber}>
                  <p>Transaction Number: {transactionData.transactionNumber}</p>
                  <p>Transaction Price: {transactionData.transactionPrice}</p>
                </div>
              ))}
              <ExcelDownloadButton transactionsData={data} />
            </React.Fragment>
          )}
        </div>
        <div className="details" >
          {selectedAddressDetails?.length > 0 && (
            <React.Fragment>
              <h4>Addresses that user selected</h4>
              {selectedAddressDetails.map((details: any, index: number) => (
                <p className="details-data" key={index}>{details}</p>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
