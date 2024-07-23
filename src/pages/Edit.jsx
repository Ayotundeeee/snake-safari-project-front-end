import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/edit.css'

const Edit = () => {

    const [snake, setSnake] = useState({
        name: "",
        scientific_name: "",
        diet: "",
        habitats: [],
        average_length: "",
        venomous: "",
        image_url: ""
    })

    const navigate = useNavigate()
    const { id } = useParams()
    const API = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetch(`${API}/${id}`)
            .then(res => res.json())
            .then(res => {
                setSnake((prevState) => res)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if(name === "habitats"){
            newValue = value.split(",");
        } else if(name ===  "average_length"){
            newValue = parseFloat(value);
        }

        setSnake((prevState) => {
            return {...prevState, [name]: newValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API}/${id}`,{
            method: "PUT",
            body: JSON.stringify(snake),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            navigate(`/snakes/${id}`)
        })
        .catch(err => console.error(err))
        
    }

    if(!snake){
        return <div>Loading...</div>
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Fill out form to edit snake</legend>
                <label htmlFor="name">Name</label><br />
                <input 
                    type="text"
                    placeholder="Snake name"
                    name="name"
                    value={snake.name} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="scientific_name">Scientific Name</label><br />
                <input 
                    type="text"
                    placeholder="Scientific Name"
                    name="scientific_name"
                    value={snake.scientific_name} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="diet">Diet</label><br />
                <input 
                    type="text"
                    placeholder="Diet"
                    name="diet"
                    value={snake.diet} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="habitats">Habitats(separate by commas)</label><br />
                <input 
                    type="text"
                    placeholder="Habitats"
                    name="habitats"
                    value={snake.habitats} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="average-length">Average Length</label><br />
                <input 
                    type="number"
                    placeholder=""
                    name="average_length"
                    value={snake.average_length} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="image">Image Url</label><br />
                <input 
                    type="text"
                    placeholder="image-url"
                    name="image_url"
                    value={snake.image_url} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="venomous">Is this snake venomous?</label><br />
                <select 
                    type="select"
                    placeholder=""
                    name="venomous"
                    value={snake.venomous} 
                    onChange={handleChange}
                >  
                    <option value="">Choose One</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select><br />
                <input id='edit-submit' type="submit" value="submit"/>
            </fieldset>
        </form>
    );
};

export default Edit;