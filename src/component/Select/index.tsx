import React, { SelectHTMLAttributes} from 'react';
import './styles.css'
// extends utilizado para pegar todas as propriedades do input, assim voce nao precisa colocar na mão uma por uma.
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{ 
    label: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>
}

const Select: React.FC<SelectProps> = ({label, name, options, ...rest}) =>{
    return ( 
    <div className="select-block">
    <label htmlFor={name}>{label}</label>
    <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opcão</option>

        {options.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
        })}
    </select>

    </div>
    )
}

export default Select;