import React from "react"
import axios from "axios"
import styled from "styled-components"
const Form = styled.div`
width :100%;
align-items: center;
display:flex;
flex-direction: column;
input{
    width:400px;
    height: 25px;
    padding: 2px;
    outline: none;
}
textarea{
    outline: none;
    width:400px;
    padding: 5px;
    height:200px
}
button{
    display: block;
    width:100px;
    height:40px;
    border-radius: 15px;
    border:none;
    color:#fcfcfc;
    background: black;
    transition:0.5s;
    margin-top: 10px;
    margin-bottom: 30px;
}
button:hover{
    transform: scale(0.9);
}
`
const Title = styled.p`

`

export function AppForm({setNotesDescription, setNotesTitle,notesDescription,notesTitle,getNotes}) {
    const HandleChange = (e) => {
        if (e.target.type === "text") {
            setNotesTitle(e.target.value);
        } else {
            setNotesDescription(e.target.value);
        }
        console.log(e.target.value);
    }
    const HandleSave = () => {
        const date = new Date();
        const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        const time = `${date.getHours()}:${date.getMinutes()}`
        const payload = {
            title: notesTitle,
            description: notesDescription,
            status: false,
            date: currentDate,
            time:time
        }
        try {
            axios.post("http://localhost:3004/notes",  payload )
        }
        catch (e) {
            console.log(e);
        }
        getNotes();
        getNotes();
    }

    return <Form>
        <label htmlFor="title">
            <Title>Title : </Title>
            <input type="text" name="title" placeholder="Write your title here" value={notesTitle} onChange={(e) => {
                HandleChange(e);
            }}/>
        </label>
        <label htmlFor="description">
            <Title>Description : </Title>
            <textarea value={notesDescription} placeholder="Write your description here..." onChange={(e) => {
                HandleChange(e)
            }}></textarea>
        </label>
        <label htmlFor="save">
            <button onClick={() => {
                HandleSave()
            }
            }>Save</button>
        </label>
</Form>}