import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../../context/Modal";
import { createExperienceThunk } from "../../../../store/profile";
import { getUserProfileThunk } from "../../../../store/users";
import './CreateExperienceForm.css';

function CreateExperienceForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState('');
    const [startedAt, setStartedAt] = useState("");
    const [endedAt, setEndedAt] = useState('');
    const [errors, setErrors] = useState([]);

    const currentUser = useSelector(state => state.session.user);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const newErrors = [];

        if (companyName.length > 50) newErrors.push('Company name is too long (50)');
        if (jobTitle.length > 50) newErrors.push('Job title is too long (50)');

        setErrors(newErrors);

    }, [companyName, jobTitle]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newExperience = {
            companyName,
            jobTitle,
            startedAt,
            endedAt
        };

        await dispatch(createExperienceThunk(currentUser.id, newExperience));

        closeModal()
        history.push(`/profile/${currentUser.id}`);

        await dispatch(getUserProfileThunk(currentUser.id));
    };

    return (
        <form onSubmit={handleSubmit} className='create-experience-form-main-container'>
            <h2 className="create-experience-form-title">Add experience</h2>
            <div className="create-experience-form-body-container">
                <div className="create-experience-form-inputs-container">
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">Title</div>
                        <input
                            type="text"
                            className="create-experience-form-input"
                            placeholder="Ex: Retail Sales Manager"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">Company name</div>
                        <input
                            type="text"
                            className="create-experience-form-input"
                            placeholder="Ex: Microsoft"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">Start date</div>
                        <input
                            type="date"
                            className="create-experience-form-input"
                            value={startedAt}
                            onChange={(e) => setStartedAt(e.target.value)}
                            min="1923-01-01"
                            max={endedAt}
                            required
                        />
                    </div>
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">End date</div>
                        <input
                            type="date"
                            className="create-experience-form-input"
                            value={endedAt}
                            onChange={(e) => setEndedAt(e.target.value)}
                            min={startedAt}
                            max={today}
                            required
                        />
                    </div>
                </div>
                <div className="create-experience-form-errors">
                    {errors.map((error) => (
                    <div>
                        <i class="fa-solid fa-ban"></i>{' '}
                        {error}
                    </div>
                    ))}
                </div>
                <button type="submit" className="create-experience-submit-button">Save</button>
            </div>
        </form>
    );
}

export default CreateExperienceForm;
