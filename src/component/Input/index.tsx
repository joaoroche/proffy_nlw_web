import React, { InputHTMLAttributes} from 'react';
import './styles.css'
// extends utilizado para pegar todas as propriedades do input, assim voce nao precisa colocar na mão uma por uma.
interface inputProps extends InputHTMLAttributes<HTMLInputElement>{ 
    label: string;
    name: string;

}

const Input: React.FC<inputProps> = ({label, name, ...rest}) =>{
    return ( 
    <div className="input-block">
    <label htmlFor={name}>{label}</label>
    <input type="text" id={name} {...rest}/>
    </div>
    )
}

export default Input;