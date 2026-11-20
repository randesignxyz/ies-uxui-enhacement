import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Input, Select, Space } from 'antd';
import type { InputProps } from 'antd';
const prefixes=['+855','+66','+84','+86','+65','+60','+62','+63','+81','+82','+1','+44','+61'];
export function formatPhone(value:string):string{
 return (value.replace(/\D/g,'').match(/.{1,3}/g)||[]).join(' ');
}
export default function PhoneInput({value,onChange,onBlur,placeholder,...props}:InputProps){
 const text=String(value||'');
 const matched=[...prefixes].sort((a,b)=>b.length-a.length).find(prefix=>text.startsWith(prefix));
 const [selected,setSelected]=useState('+855');
 const prefix=matched||selected;
 const number=matched?text.slice(matched.length).trim():text;
 const emit=(national:string,code=prefix)=>onChange?.({target:{value:national?`${code} ${national}`:''},currentTarget:{value:national?`${code} ${national}`:''}} as ChangeEvent<HTMLInputElement>);
 return <Space.Compact style={{width:'100%'}}><Select aria-label="Country calling code" showSearch value={prefix} style={{width:106,flexShrink:0}} options={prefixes.map(code=>({value:code,label:code}))} onChange={code=>{setSelected(code);emit(number,code)}}/><Input {...props} style={{...props.style,minWidth:0}} type="tel" inputMode="tel" autoComplete="tel-national" placeholder={placeholder||'012 345 678'} value={number} onChange={event=>emit(event.target.value.replace(/[^\d\s]/g,''))} onBlur={event=>{emit(formatPhone(event.target.value));onBlur?.(event)}}/></Space.Compact>;
}
