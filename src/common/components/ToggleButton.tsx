import { useState } from 'react'
import ReactSwitch from 'react-switch';

interface ToggleButtonProps{
  id:string
}

export const ToggleButton =({id}:ToggleButtonProps) => {
    const [checked, setChecked] = useState(true);

    const handleChange = (val:boolean) => {
      setChecked(val)
      const sariFrame: any = document.querySelector('iframe');
      if(id === "fetch"){
        sariFrame.contentWindow.postMessage({ type: 'ENABLE_FETCH', enableFetch:val }, 'http://localhost:3000');
      } else{
        sariFrame.contentWindow.postMessage({ type: 'ENABLE_SHOW', enableShow:val }, 'http://localhost:3000');
      }
      
    }
  
    return (
      <div className="toggle-container" style={{textAlign: "center"}}>
        <ReactSwitch
          checked={checked}
          onChange={handleChange}
        />
      </div>
    );
}
