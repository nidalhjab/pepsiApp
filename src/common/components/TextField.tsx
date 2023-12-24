
interface TextFieldProps{
    placeholder:string,
    changeHandler: (e:any) => void
}

export const  TextField = ({placeholder,changeHandler}:TextFieldProps) => {
  return (
    <input className='input' type='text' placeholder={placeholder} onChange={changeHandler}/>
  )
}
