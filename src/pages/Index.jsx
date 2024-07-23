import React, { useEffect, useState } from 'react';
import SnakeCard from '../components/snakeCard';
import { Link } from 'react-router-dom';

const Index = () => {

    const [snakes, setSnakes] = useState([])

    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API}`)
        .then(res => res.json())
        .then(res => {
            setSnakes(res)
        })
        .catch(err => {
            console.error(err);
        })
    }, [])

    return (
        <div className='snake-list'>
            {snakes.map(snake => {
                const { id, name } = snake;
                return (
                    <Link to={`/snakes/${id}`} key={id}>
                        <SnakeCard
                            snakes={snakes}
                            name={name}
                            id={id}
                        />
                    </Link>
                )
            })}
        </div>
    );
};

export default Index;