import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../../OpenModalButton";
import EditPostForm from '../EditPosts';
import { deletePostThunk } from '../../../store/posts';
import { useHistory } from 'react-router-dom';

const SinglePostCard = ({ id, userId, content, image, firstName, lastName }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    const deletePostHandler = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(id));
        history.push('/feed');
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
            <div className='single-post-user-name'>{firstName} {lastName}</div>
            <div className='single-post-card-title'>{content}</div>
            <img src={image} className='single-post-card-image'></img>
        </div>
    )
};

export default SinglePostCard;
