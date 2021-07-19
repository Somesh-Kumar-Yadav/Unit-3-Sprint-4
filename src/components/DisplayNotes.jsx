import React from "react"
import axios from "axios"
import styled from "styled-components"

const Card = styled.div`
width :100%;
display:flex;
justify-content: space-between;
align-items: center;
div{
margin:10px
}
.Title{
    display: flex;
flex-direction: column;
width:300px;
}
.Date{
    width:200px;
    display: flex;
flex-direction: column;
}
.Button{
    width:200px;
    display: flex;
flex-direction: column;
}
button{
    margin: 10px;
}
`
const EditTab = styled.div`
width:100%;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
    margin: 10px auto;
textarea{
    width:400px;
    height:300px;
    outline: none;
    padding: 10px;
}
.edit{
   font-size: 32px;

}
button{
    display: block;
    width:100px;
    height:40px;
    margin-top: 30px;
    border-radius: 15px;
    border:none;
    color:#fcfcfc;
    background: black;
    transition:0.5s
}
button:hover{
    transform: scale(0.9);
}
`
export function DisplayNotes({ notesArray, setNotesArray,getNotes,id,SetId }) {
    const [editData, setEditData] = React.useState("");
    const [showEdit, SetShowEdit] = React.useState(false);
    
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
        return <EditTab>
            <div className="edit">
            Edit Tab
            </div>
    <textarea placeholder="Edit your description ..." onChange={(e) => {
                setEditData(e.target.value);
                console.log(e.target.value);
    }}></textarea>
    <button onClick={
        ()=>{
            SetShowEdit(false);
            Edit();
        }
    }>Done</button>
    </EditTab>
    }


    return <div>
        {
            notesArray.map(i => {
                return <Card key={i.id}>
                    <div className="Title">
                        <h4>Title : {i.title}</h4>
                        <p>Description : { i.description}</p>
                    </div>
                    <div className="Date">
                    <p>Date : {i.date}</p>
                    <p>Time : {i.time}</p>
                    </div>
                    <div className="Button">
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