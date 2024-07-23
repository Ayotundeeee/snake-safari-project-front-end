import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/new.css'

const New = () => {

    const navigate = useNavigate();
    const [newSnake, setNewSnake] = useState({
        name: "",
        scientific_name: "",
        diet: "",
        habitats: [],
        average_length: "",
        venomous: "",
        image_url: ""
    })

    const API = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if(name === "habitats"){
            newValue = value.split(",");
        } else if(name ===  "average_length"){
            newValue = parseFloat(value);
        }

        setNewSnake((prevState) => {
            return {...prevState, [name]: newValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API, {
            method: "POST",
            body: JSON.stringify(newSnake),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            alert("Snake successfully added!")
            navigate("/snakes");
        })
        .catch(err => console.error(err))
    }

    const goBack = (e) => {
        e.preventDefault()
        navigate('/snakes')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Fill out form to add new snake</legend>
                <label htmlFor="name">Name</label><br />
                <input 
                    type="text"
                    placeholder="Snake name"
                    name="name"
                    value={newSnake.name} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="scientific_name">Scientific Name</label><br />
                <input 
                    type="text"
                    placeholder="Scientific Name"
                    name="scientific_name"
                    value={newSnake.scientific_name} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="diet">Diet</label><br />
                <input 
                    type="text"
                    placeholder="Diet"
                    name="diet"
                    value={newSnake.diet} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="habitats">Habitats(separate by commas)</label><br />
                <input 
                    type="text"
                    placeholder="Habitats"
                    name="habitats"
                    value={newSnake.habitats} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="average-length">Average Length</label><br />
                <input 
                    type="number"
                    placeholder=""
                    name="average_length"
                    value={newSnake.average_length} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="image">Image Url</label><br />
                <input 
                    type="text"
                    placeholder="image-url"
                    name="image_url"
                    value={newSnake.image_url} 
                    onChange={handleChange}
                /><br />
                <label htmlFor="venomous">Is this snake venomous?</label><br />
                <select 
                    type="select"
                    placeholder=""
                    name="venomous"
                    value={newSnake.venomous} 
                    onChange={handleChange}
                >  
                    <option value="">Choose One</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select><br />
                <input id='submit-new' type="submit" value="submit"/>
            </fieldset>
                <button className="back-btn" onClick={goBack}>Back</button>
        </form>
    );
};

export default New;