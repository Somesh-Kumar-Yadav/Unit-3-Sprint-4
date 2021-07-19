import React from "react"
import axios from "axios"
import styled from "styled-components"
import { AppForm } from "./AppForm"
const Card = styled.div`
width :100%;
display:flex;
justify-content: space-between;
align-items: center;
div{
margin:10px
}
button{
    margin: 10px;
}

`
export function DisplayNotes({ notesArray, setNotesArray,getNotes }) {
    const [editData, setEditData] = React.useState("");
    const [showEdit, SetShowEdit] = React.useState(false);
    const [id, SetId] = React.useState(null);
    const Edit = () => {
         const data = editData
        try {
            axios.patch("http://localhost:3004/notes/" + id, {
                ...notesArray
                , description: data
            })
        } catch (e) {
            console.log(e);
        }
        getNotes();
        getNotes();
    }
    const HandleEdit = (id) => {
        SetShowEdit(true);
        SetId(id)
    }
    const HandleDelete = (id) => {
        try {
            axios.delete(" http://localhost:3004/notes/"+id)
        }
        catch (e) {
            console.log(e);
        }
        getNotes();
        getNotes();
        
    }
    React.useEffect(()=>{
        getNotes()
    }, [])
    

    if (showEdit) {
        return <>
            <div>
            Edit Tab
            </div>
    <textarea onChange={(e) => {
                setEditData(e.target.value);
                console.log(e.target.value);
    }}></textarea>
    <button onClick={
        ()=>{
            SetShowEdit(false);
            Edit();
        }
    }>Done</button>
    </>
    }


    return <div>
        {
            notesArray.map(i => {
                return <Card key={i.id}>
                    <div>
                        <h4>Title : {i.title}</h4>
                        <p>Description : { i.description}</p>
                    </div>
                    <div>
                    <p>Date : {i.date}</p>
                    <p>Time : {i.time}</p>
                    </div>
                    <div>
                    <button onClick={() => {
                        HandleEdit(i.id);
                    }}>Edit Notes</button>
                    <button onClick={() => {
                        HandleDelete(i.id);
                    }}>Delete</button>
                    </div>
                </Card>
            })
       }
    </div>
}