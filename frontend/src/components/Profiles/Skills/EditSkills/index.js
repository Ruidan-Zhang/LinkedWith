import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../../context/Modal";
import { getUserProfileThunk } from "../../../../store/users";
import { editSkillThunk } from "../../../../store/profile";

function EditSkillForm({ skill }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const currentUser = useSelector(state => state.session.user);

    const [content, setContent] = useState(skill.content);
    const [errors, setErrors] = useState([]);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const newErrors = [];

        if (content.length > 100) newErrors.push('Content is too long (100)');

        setErrors(newErrors);

    }, [content]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedSkill = {
            ...skill,
            content
        };

        await dispatch(editSkillThunk(currentUser.id, updatedSkill));

        closeModal()
        history.push(`/profile/${currentUser.id}`);

        await dispatch(getUserProfileThunk(currentUser.id));
    };

    return (
        <form onSubmit={handleSubmit} className='create-experience-form-main-container'>
            <h2 className="create-experience-form-title">Edit skill</h2>
            <div className="create-experience-form-body-container">
                <div className="create-experience-form-inputs-container">
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">Skill</div>
                        <input
                            type="text"
                            className="create-experience-form-input"
                            placeholder="Ex: Graphic Design"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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

export default EditSkillForm;
