import { ChangeEvent, useState } from 'react'

export const RadioButton = ({ framRef }: any) => {
  const [topping, setTopping] = useState("Medium")

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTopping(e.target.value)
    framRef.current.contentWindow.postMessage({ type: 'MAP_TYPE', mapType: e.target.value }, 'http://localhost:3000');
  }

  return (
    <div className='radio-container'>
      <div className='satellite'>
        <input
          type="radio"
          name="mapType"
          value="Satellite"
          id="satellite"
          checked={topping === "Satellite"}
          onChange={onOptionChange}
        />
        <label htmlFor="satellite">Satellite</label>
      </div>
      <div className='roadmap'>
        <input
          type="radio"
          name="mapType"
          value="Roadmap"
          id="roadmap"
          checked={topping === "Roadmap"}
          onChange={onOptionChange}
        />
        <label htmlFor="roadmap">Roadmap</label>
      </div>
    </div>
  )
}
