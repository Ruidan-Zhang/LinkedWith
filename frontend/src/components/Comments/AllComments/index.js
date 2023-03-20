import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCommentsThunk } from "../../../store/comments";
import SingleCommentCard from "../SingleComment";
// import { cleanUpCommentsAction } from "../../store/comments";
// import './AllComments.css';

const AllCommentsComponent = ({ id }) => {
    const dispatch = useDispatch();
    const allCommentsObj = useSelector(state => state.comments);
    const allComments = Object.values(allCommentsObj).filter(el => el.postId === id);

    useEffect(() => {
        dispatch(loadAllCommentsThunk(id));
    }, [dispatch, id]);

    if (!allComments || !allCommentsObj) return null;

    return (
        <div className="all-comments-container">
            {allComments.reverse().map((singleComment) => (
                <SingleCommentCard key={singleComment.id}
                firstName={singleComment.User.firstName}
                lastName={singleComment.User.lastName}
                commentOwnerId={singleComment.User.id}
                commentId={singleComment.id}
                postId={id}
                time={singleComment.createdAt}
                />
            ))}
        </div>
    )
};

export default AllCommentsComponent;
