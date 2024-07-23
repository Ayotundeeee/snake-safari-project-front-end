import React,{ useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/show.css'

const Show = () => {

    const { id } = useParams();
    const [snake, setSnake] = useState({});
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(res => {
            setSnake(res);
            setLoading(false);
        })
        .catch(err => console.error(err))
        setLoading(false);
    }, [API, id])

    const handleDelete = () => {
        fetch(`${API}/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            alert("snake deleted")
            navigate('/snakes')
        })
        .catch(err => console.error(err))
    }

    if(loading){
        return <p>Loading...</p>
    }

    return (
        <div className='show-page'>
            {snake && 
            <div className='snake-container'>
                <img src={snake.image_url} alt={`picture of ${snake.name}`} />
                <div className="info">
                    <div className="name">The {snake.name}</div>
                    <div className="science-name">Scientific Name: {snake.scientific_name}</div>
                    <div className="diet">Diet: {snake.diet}</div>
                    <div className="habitats">Habitats: {snake.habitats && snake.habitats.map((habitat,index) => {
                        return(
                            <span key={index} className='habitat'>{habitat}</span>
                        )
                    })}
                    </div>
                    <div className="length">Average Length: {snake.average_length}</div>
                    <div className="venomous"><span>Venomous </span>: {snake.venomous === true ? "Yes" : "No"}</div>
                </div>

                <div className="edit-delete">
                    <Link to={`/snakes/${id}/edit`} ><button id='edit-btn'>Edit Snake</button></Link>
                    <button id='delete-btn' onClick={handleDelete}>Kill Snake</button>
                </div>

            </div>
            }
            <Link to="/snakes"><button id='back-btn'>Back to Snakes</button></Link>
        </div>
    );
};

export default Show;