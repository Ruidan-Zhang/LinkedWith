import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import { getAllPostsThunk } from "../../../store/posts";
import CreatePostForm from "../CreatePosts";
import SinglePostCard from "../SinglePost";

const AllPostsComponent = () => {
    const dispatch = useDispatch();
    const allPostsObj = useSelector(state => state.posts);
    const allPosts = Object.values(allPostsObj);

    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    if (!allPostsObj || !allPosts) return null;

    return (
        <div className="all-posts-main-container">
            <div>
                <OpenModalButton
                    buttonText='Start a post'
                    modalComponent={<CreatePostForm />}
                />
            </div>
            <div className="all-posts-container">
                {allPosts.reverse().map((post) => (
                    <SinglePostCard key={post.id}
                    id={post.id}
                    content={post.content}
                    image={post.image}
                    firstName={post.User.firstName}
                    lastName={post.User.lastName}
                    />
                ))}
            </div>
        </div>
    )
}

export default AllPostsComponent;
