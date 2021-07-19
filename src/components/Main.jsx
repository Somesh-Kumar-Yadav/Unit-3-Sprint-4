import React from "react"
import axios from "axios"
import styled from "styled-components"
import { AppForm } from "./AppForm"
import { DisplayNotes } from "./DisplayNotes"
const Title = styled.h1`
width :100%;
display:flex;
justify-content: center;
align-items: center;
`
export function Main() {
    const [notesTitle, setNotesTitle] = React.useState("");
    const [notesDescription, setNotesDescription] = React.useState("");
    const [notesArray, setNotesArray] = React.useState([]);
    const [id, SetId] = React.useState(null);
    const getNotes = () => {
        try {
            axios.get("http://localhost:3004/notes").then(res => {
                console.log(res.data);
                setNotesArray([...res.data]);
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    return <div>
        <Title>My Notes App</Title>
            <AppForm getNotes={getNotes} notesTitle={notesTitle} notesDescription={notesDescription} setNotesTitle={setNotesTitle} setNotesDescription={ setNotesDescription}/>
        <DisplayNotes id={id} SetId={SetId} getNotes={getNotes} notesArray={notesArray} setNotesArray={setNotesArray} notesTitle={notesTitle} notesDescription={notesDescription} setNotesTitle={setNotesTitle} setNotesDescription={ setNotesDescription}/>
    </div>
}