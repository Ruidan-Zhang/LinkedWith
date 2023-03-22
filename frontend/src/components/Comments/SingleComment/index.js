import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk } from "../../../store/comments";
import { editCommentThunk } from "../../../store/comments";
import './SingleComment.css';

const SingleCommentCard = ({ firstName, lastName, userImage, commentOwnerId, commentId, postId, time }) => {
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
            {/* <ul className="edit-comment-form-errors">
                {errors.map((error, index) => <li key={index}>{error}</li>)}
            </ul> */}
            <textarea
                className="edit-comment-content"
                type="text"
                placeholder="Add a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <div className="edit-comment-submit-button-container">
                <button className="edit-comment-submit-button" type="submit">Save Changes</button>
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
            <img className="single-comment-user-image" src={userImage}/>
            <div className="single-comment-body">
                <div className='single-comment-header-container'>
                    <div className="single-comment-header">
                        <div className="single-comment-commentOwner">{firstName} {lastName}</div>
                        <div className="single-comment-createdTime">{timeFormat(time)}</div>
                    </div>
                    {(currentUser.id === commentOwnerId) && (
                        <div className="single-comment-buttons-container">
                            <div className='single-comment-edit-button'>
                                <i className="fa-solid fa-pen-to-square" onClick={editCommentButtonHandler}></i>
                            </div>
                            <div className='single-post-delete-button'>
                                <i className="fa-regular fa-trash-can" onClick={deleteCommentHandler}></i>
                            </div>
                        </div>
                    )}
                </div>
                {showEditForm ? (
                    editCommentForm
                ) : (
                    <div className="single-comment-content">{foundComment.content}</div>
                )}
            </div>
        </div>
    )
};

export default SingleCommentCard;
