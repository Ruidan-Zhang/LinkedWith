import { useDispatch } from 'react-redux';

const SinglePostCard = ({ id, content, image, firstName, lastName }) => {
    const dispatch = useDispatch();

    return (
        <div className="single-post-card-container">
            <div className='single-post-user-name'>{firstName} {lastName}</div>
            <div className='single-post-card-title'>{content}</div>
            <img src={image} className='single-post-card-image'></img>
        </div>
    )
};

export default SinglePostCard;
