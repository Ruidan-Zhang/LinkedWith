import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import OpenModalButton from "../../OpenModalButton";
import EditPostForm from '../EditPosts';
import DeletePostConfirmation from '../DeletePosts';
import AllCommentsComponent from '../../Comments/AllComments';
import CreateCommentForm from '../../Comments/CreateComments';
import { useHistory } from 'react-router-dom';
import './SinglePost.css';

const SinglePostCard = ({ id, userId, content, image, firstName, lastName, userImage, time, numComments }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const [showComments, setShowComments] = useState(false);

    const timeFormat = (time) => {
        time = time.slice(0, 10)
        return time
    };

    const showCommentsHandler = () => {
        setShowComments(!showComments);
    };

    if (!currentUser) return null;

    return (
        <div className="single-post-card-container">
            <div className='single-post-header-container'>
                <img className='single-post-user-image' src={userImage}/>
                <div className='single-post-header'>
                    <div className='single-post-user-name'>{firstName} {lastName}</div>
                    <div className='single-post-time'>{timeFormat(time)}</div>
                </div>
                {userId === currentUser.id && (
                    <div className='single-post-card-buttons'>
                        <OpenModalButton
                            buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                            modalComponent={<EditPostForm id={id}/>}
                            className='single-post-edit-button'
                        />
                        <OpenModalButton
                            buttonText={<i className="fa-regular fa-trash-can"></i>}
                            modalComponent={<DeletePostConfirmation id={id}/>}
                            className='single-post-delete-button'
                        />
                    </div>
                )}
            </div>
            <div className='single-post-content'>{content}</div>
            <img src={image} className='single-post-image'></img>
            <div className='single-post-counts'>
                <div className='single-post-likes-count'></div>
                {numComments > 0 && (
                    <div className='single-post-comments-count' onClick={showCommentsHandler}>{numComments} comments</div>
                )}
            </div>
            <div className='single-post-footer'>
                <div className='single-post-footer-buttons-container'>
                    <button className='single-post-footer-buttons'>
                        <i className="fa-regular fa-thumbs-up"></i>{' '}
                        Like
                    </button>
                </div>
                <div className='single-post-footer-buttons-container'>
                    <button onClick={showCommentsHandler} className='single-post-footer-buttons'>
                        <i className="fa-regular fa-comment-dots"></i>{' '}
                        Comment
                    </button>
                </div>
            </div>
            {showComments === true && (
                <div className='single-post-comments-container'>
                    <CreateCommentForm id={id} />
                    <AllCommentsComponent id={id}/>
                </div>
            )}
        </div>
    )
};

export default SinglePostCard;
