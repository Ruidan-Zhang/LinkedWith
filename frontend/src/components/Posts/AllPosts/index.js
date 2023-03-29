import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import { getAllPostsThunk } from "../../../store/posts";
import CreatePostForm from "../CreatePosts";
import SinglePostCard from "../SinglePost";
import './AllPosts.css';

const AllPostsComponent = () => {
    const dispatch = useDispatch();
    const allPostsObj = useSelector(state => state.posts);
    const allPosts = Object.values(allPostsObj);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    if (!allPostsObj || !allPosts) return null;

    return (
        <div className="feed-page-main-container">
            <div className="feed-page-left-card">
                <img className="left-card-image" src={currentUser?.image}/>
                <div className="left-card-user-name">{currentUser?.firstName} {currentUser?.lastName}</div>
            </div>
            <div className="all-posts-main-container">
                <div className="create-post-main-container">
                    <img className="create-post-user-image" src={currentUser?.image}/>
                    <OpenModalButton
                        buttonText='Start a post'
                        modalComponent={<CreatePostForm />}
                        className='create-post-button'
                    />
                </div>
                <div className="all-posts-container">
                    {allPosts.reverse().map((post) => (
                        <SinglePostCard key={post.id}
                        id={post.id}
                        userId={post.userId}
                        content={post.content}
                        image={post.image}
                        firstName={post.User.firstName}
                        lastName={post.User.lastName}
                        userImage={post.User.image}
                        time={post.createdAt}
                        numComments={post.numComments}
                        />
                    ))}
                </div>
            </div>
            <div className="feed-page-right-card">
                <h3 className="right-card-title">About LinkedWith</h3>
                <h5 className="right-card-description">
                    LinkedWith, a LinkedIn clone website, is a professional social networking platform that allows users to create profiles, connect with other professionals, and showcase their skills and experience.
                </h5>
            </div>
        </div>
    )
}

export default AllPostsComponent;
