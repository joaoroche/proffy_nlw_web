import React, { useState, FormEvent } from 'react';
import './styles.css'
import PageReader from '../../component/PageHeader';
import TeacherItem, {Teacher} from '../../component/TeacherItem';
import Input from '../../component/Input';
import Select from '../../component/Select';
import api from '../../service/api';


function TeacherList(){

    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container" > 
            <PageReader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select 
                name="subject" 
                label="Matéria"
                value = {subject}
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
            <Select 
                name="week_day" 
                label="Dia da semana"
                value = {week_day}
                onChange={(e) => {setWeek_day(e.target.value)}}
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

            <Input type="time"  
            value = {time} 
            onChange={(e) => {setTime(e.target.value)}} name="time" label="Hora" />
            <button type="submit"> Buscar </button>
            </form>
            </PageReader> 

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id}  teacher = {teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;