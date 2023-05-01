import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import { getAllPostsThunk } from "../../../store/posts";
import CreatePostForm from "../CreatePosts";
import SinglePostCard from "../SinglePost";
import './AllPosts.css';
import { useHistory } from "react-router-dom";

const AllPostsComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allPostsObj = useSelector(state => state.posts);
    const allPosts = Object.values(allPostsObj);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    const goToUserProfileHandler = () => {
        history.push(`/profile/${currentUser.id}`);
    };

    if (!allPostsObj || !allPosts) return null;

    return (
        <div className="feed-page-main-container">
            <div className="feed-page-left-card">
                <img className="left-card-image" src={currentUser?.image} onClick={goToUserProfileHandler}/>
                <div className="left-card-user-name" onClick={goToUserProfileHandler}>{currentUser?.firstName} {currentUser?.lastName}</div>
                <div className="left-card-user-occupation">{currentUser?.occupation}</div>
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
                        occupation={post.User.occupation}
                        time={post.createdAt}
                        numComments={post.numComments}
                        likes={post.Likes}
                        />
                    ))}
                </div>
            </div>
            <div className="feed-page-right-column">
                <div className="feed-page-right-first-card">
                    <h3 className="right-card-title">About LinkedWith</h3>
                    <h5 className="right-card-description">
                        LinkedWith, a LinkedIn clone website, is a professional social networking platform that allows users to create profiles, connect with other professionals, and showcase their skills and experience.
                    </h5>
                </div>
                <div className="feed-page-right-second-card">
                    <div className="developer-info">
                        Ruidan Zhang © 2023 <a href = "https://github.com/Ruidan-Zhang" className="developer-icon" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i> </a>
                        <a href = "https://www.linkedin.com/in/ruidan-meredith-zhang/" className="developer-icon" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                    <div>
                        Javascript | Express | React | Redux | SqlAlchemy | PostgresSQL | HTML | CSS | AWS | Hosted on Render
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllPostsComponent;
