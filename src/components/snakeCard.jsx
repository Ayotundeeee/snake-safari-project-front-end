import React from 'react';
import "../styles/snakeCard.css"

const snakeCard = (props) => {

    const { name, snakes, id } = props;
    const snake = snakes.find(snake => snake.id === id)

    return (
        <div className='snake-card'>
            <img src={snake.image_url} alt="" />
            <p className='snake-name'>{name}</p>
        </div>
    );
};

export default snakeCard;