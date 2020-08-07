import React, { useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import PageReader from '../../component/PageHeader';
import './styles.css'
import Input from '../../component/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../component/Textarea';
import Select from '../../component/Select';
import api from '../../service/api';



function TeacherForm(){
    const history = useHistory();
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleitems, setScheduleItems] = useState([ // Para atualizar esses dados, foi necessario criar um novo array, e uma função (setScheduleItemsValue) para fazer toda alteração 
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleitems, 
            { week_day: 0, from: '', to: '' }
        ]);    
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleitems
        }).then(()=> {
            alert('Cadastro realizado com sucesso !')
            history.push('/')
        }).catch(()=>{
            alert('Erro no cadastro!')
        })
    }

    function setScheduleItemsValue(position: number, fiel: string, value: string){
        const updateScheduleItems = scheduleitems.map((scheduleitem, index) => {
            if (index === position){
                return {...scheduleitem, [fiel]: value}
            }
            return scheduleitem;
        });
        setScheduleItems(updateScheduleItems);
    }
        

    return (
        <div id="page-teacher-form" className="container"> 
        <PageReader title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
        /> 

        <main>
            <form onSubmit={handleCreateClass}>
            <fieldset>
                <legend>Seus dados</legend>
                <Input name="name" label="Nome completo" value={name} onChange={(e) => {setName(e.target.value)}}/> 
                <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/> 
                <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/> 
                <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}}/> 
                </fieldset>

            <fieldset>
                <legend>Sobre a aula</legend>
                <Select 
                name="subject" 
                label="Matéria"
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                options={[
                    {value: 'Artes', label: 'Artes'},
                    {value: 'Biologia', label: 'Biologia'},
                    {value: 'Ciência', label: 'Ciência'},
                    {value: 'Educação Fisica', label: 'Educação Fisica'},
                    {value: 'Geografia', label: 'Geografia'},
                    {value: 'Matemática', label: 'Matemática'},
                    {value: 'História', label: 'Histórica'},
                    {value: 'Qumica', label: 'Qumica'},
                    {value: 'Física', label: 'Física'},
                    {value: 'Linguagem de programacão', label: 'Linguaguem de programacão'},
                    {value: 'Fundamentos da informática', label: 'fundamentos da informática'},
                    {value: 'Lógica de programacão', label: 'Lógica de programacão'},
                    {value: 'Banco de dados', label: 'Banco de dados'},
                    {value: 'Filosofia', label: 'Filosofia'},
                    {value: 'Sociologia', label: 'Sociologia'},
                    {value: 'Interfaces digitais', label: 'Interfaces digitais'},
                    {value: 'Design e animação', label: 'Design e animação'},
                    {value: 'Segurança digtal', label: 'Segurança digtal'},
                    {value: 'Língua Portuguêsa', label: 'Língua Portuguêsa'},
                    {value: 'Produção textual', label: 'Produção textual'},
                    {value: 'Empreendedorismo', label: 'Empreendedorismo'},
                    {value: 'Inglês', label: 'Inglês'}
                ]}
            /> 
            <Input name="cost" value={cost} onChange={(e) => {setCost(e.target.value)}} label="Custo da sua hora por aula"/> 
            </fieldset>

            <fieldset>
                <legend>
                    Horários disponíveis
                    <button type="button" onClick={addNewScheduleItem}> + Novo Horários </button>
                </legend>

                {scheduleitems.map((scheduleitem, index) =>{
                    return (
                        <div key={scheduleitem.week_day} className="schedule-item">
                        <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={scheduleitem.week_day}
                        onChange={(e) => setScheduleItemsValue(index, 'week_day', e.target.value)}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'sexta-feira'},
                            {value: '6', label: 'Sábado'},
                        ]}
                        /> 
                        <Input name="from" label="Das" type="time" value={scheduleitem.from} onChange={(e) => setScheduleItemsValue(index, 'from', e.target.value)}/>
                        <Input name="to" label="Das" type="time" value={scheduleitem.to} onChange={(e) => setScheduleItemsValue(index, 'to', e.target.value)}/>
                    </div>
                    )
                })}
            </fieldset>

            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso importante"></img>
                    Importante ! <br/>
                    Preencha todos os dados
                </p>
                <button type="submit">
                    Salvar cadastro
                </button>
            </footer>
            </form>
        </main>
    </div>
    )
}

export default TeacherForm; 