
interface SubmitProps{
    handleSubmit: (e:any) => void;
}

export const SubmitButton = ({handleSubmit}:SubmitProps) => {
  return (
    <button className='submit-button' onClick={handleSubmit} type='submit'>Submit</button>
  )
}
