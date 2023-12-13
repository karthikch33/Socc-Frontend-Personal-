import React from 'react'
import '../App.css'
const CustomtInput = (props) => {
    const {type,placeholder,name,value,onChange,onBlur,className,disabled} = props
  return (
    <>
        <div className="form-floating my-4">
            <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} onBlur={onBlur} className={`${className} form-control CustomtInput`} disabled={disabled} />
            <label htmlFor="name" className='form-label'>{placeholder}</label>
        </div>
    </>
  )
}

export default CustomtInput