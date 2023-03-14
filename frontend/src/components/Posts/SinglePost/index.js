import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../../OpenModalButton";
import EditPostForm from '../EditPosts';
import { deletePostThunk } from '../../../store/posts';
import { useHistory } from 'react-router-dom';
import './SinglePost.css';

const SinglePostCard = ({ id, userId, content, image, firstName, lastName, userImage, time }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    const deletePostHandler = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(id));
        history.push('/feed');
    }

    const timeFormat = (time) => {
        time = time.slice(0, 10)
        return time
    }

    return (
        <div className="single-post-card-container">
            {userId === currentUser.id && (
                <div>
                    <OpenModalButton
                        buttonText='Edit post'
                        modalComponent={<EditPostForm id={id}/>}
                    />
                    <button onClick={deletePostHandler}>Delete</button>
                </div>
            )}
            <div className='single-post-header-container'>
                <img className='single-post-user-image' src={userImage}/>
                <div className='single-post-header'>
                    <div className='single-post-user-name'>{firstName} {lastName}</div>
                    <div className='single-post-time'>{timeFormat(time)}</div>
                </div>
            </div>
            <div className='single-post-content'>{content}</div>
            <img src={image} className='single-post-image'></img>
        </div>
    )
};

export default SinglePostCard;
