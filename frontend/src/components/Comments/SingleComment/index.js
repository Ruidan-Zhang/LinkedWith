import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk } from "../../../store/comments";
import { editCommentThunk } from "../../../store/comments";
// import './SingleCommentCard.css';

const SingleCommentCard = ({ firstName, lastName, commentOwnerId, commentId, postId, time }) => {
    const dispatch = useDispatch();

    const foundComment = useSelector(state => state.comments[commentId]);
    const currentUser = useSelector(state => state.session.user);

    const [content, setContent] = useState(foundComment.content);
    const [errors, setErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const updatedComment = {
            ...foundComment,
            content
        };

        const data = await dispatch(editCommentThunk(updatedComment));
        if (data && data.errors) {
            setErrors(data.errors)
        }
        setShowEditForm(!showEditForm);
    };

    const editCommentButtonHandler = () => {
        setShowEditForm(!showEditForm);
    };

    const editCommentForm = (
        <form onSubmit={handleSubmit} className='edit-comment-form'>
        <ul className="edit-comment-form-errors">
            {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
        <input
            className="edit-comment-content"
            type="text"
            placeholder="Edit comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
        />
        <div className="edit-comment-submit-button-container">
            <button className="edit-comment-submit-button" type="submit">Post</button>
        </div>
        </form>
    );

    const timeFormat = (time) => {
        if (time) {
            time = time.slice(0, 10);
            return time
        }
    };

    const deleteCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommentThunk(commentId));
    };

    if (!content) return null;

    return (
        <div className="single-comment-card-container">
            <div className='single-comment-header'>
                <div className="single-comment-commentOwner">{firstName} {lastName}</div>
                <div className="delete-comment-button-container">
                    {(currentUser.id === commentOwnerId) && (
                        <div>
                            <button onClick={editCommentButtonHandler}>edit</button>
                            <button className="delete-comment-button" onClick={deleteCommentHandler}>Delete this comment</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="single-comment-createdTime">{timeFormat(time)}</div>
            {showEditForm ? (
                editCommentForm
            ) : (
                <div className="single-comment-content">{foundComment.content}</div>
            )}
        </div>
    )
};

export default SingleCommentCard;
