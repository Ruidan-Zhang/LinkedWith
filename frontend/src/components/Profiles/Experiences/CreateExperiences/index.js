import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../../context/Modal";
import { createExperienceThunk } from "../../../../store/profile";

import { getUserExperienceThunk } from "../../../../store/profile";

import { getUserProfileThunk } from "../../../../store/users";


function CreateExperienceForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState('');
    const [errors, setErrors] = useState([]);

    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        const newErrors = [];

        if (companyName.length > 50) newErrors.push('You have exceeded the maximum character limit (50)');
        if (jobTitle.length > 50) newErrors.push('You have exceeded the maximum character limit (50)');

        setErrors(newErrors);

    }, [companyName, jobTitle]);

    // useEffect(() => {
    //     dispatch(getUserProfileThunk(currentUser.id));
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(getUserExperienceThunk(currentUser.id));
    // }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newExperience = {
            companyName,
            jobTitle,
            startedAt: new Date(),
            endedAt: new Date()
        };

        await dispatch(createExperienceThunk(currentUser.id, newExperience));

        closeModal()
        history.push(`/profile/${currentUser.id}`);

        await dispatch(getUserProfileThunk(currentUser.id));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="create-post-form-title">Add experience</h2>
            <input
                type="text"
                placeholder="Company name?"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Company name?"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
            />
            <button type="submit">Post</button>
        </form>
    );
}

export default CreateExperienceForm;
