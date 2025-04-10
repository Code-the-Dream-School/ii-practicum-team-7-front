import { useState } from 'react';


function UserInfoForm() {

    //TODO: Connect form to backend routes via POST, GET, PATCH, and DELETE API calls

    // State management
    // Using 'profileName' instead of 'name' to avoid conflict with form.name
    const [formData, setFormData] = useState({
        profileName: '',
        email: '',
        role: '',
        phone: '',
        address: '',
        bio: '',
        skills: '',
        image: ''
    });

    // Set + show character limit/remaining characters for bio and skills
    const maxLength = 250;
    const remainingBioCharacters = maxLength - formData.bio.length;
    const remainingSkillsCharacters = maxLength - formData.skills.length;

    // Auto-format phone number
    // TODO: Fix possible issue: if user tries to input between characters, caret jumps to the end
    const formatPhoneNumber = (value) => {
        const cleanedNum = value.replace(/\D/g, '');
        let length = cleanedNum.length;

        if (length === 0) return '';

        if (length <= 3) return `${cleanedNum}`;
        if (length <= 6) return `${cleanedNum.slice(0, 3)}-${cleanedNum.slice(3)}`;
        return `${cleanedNum.slice(0, 3)}-${cleanedNum.slice(3, 6)}-${cleanedNum.slice(6,10)}`;
    };

    // Handle form changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let newPhoneValue = value;
        if (name === 'phone') {
            newPhoneValue = formatPhoneNumber(value);
        }
        setFormData(prev => ({
            ...prev,
            [name]: name === 'phone' ? newPhoneValue : value
        }));
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} id='userInfoForm'>
                <label htmlFor='profileName'>
                    Your Name:
                    <span style={{color: 'red' }}>*</span>
                </label>
                <input
                    type='text'
                    id='profileName'
                    name='profileName'
                    value={formData.profileName}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor='email'>
                    Email:
                    <span style={{color: 'red' }}>*</span>
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='you@example.com'
                    autoComplete='yes'
                    required
                />
                
                <fieldset>
                    <legend>
                        Choose Your Role:                        
                        <span style={{color: 'red' }}>*</span>
                    </legend>

                    <label htmlFor='jobSeeker'>Job Seeker</label>
                    <input
                        type='radio'
                        id='jobSeeker'
                        name='role'
                        value='jobSeeker'
                        checked={formData.role === 'jobSeeker'}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor='hiring'>Hiring</label>
                    <input
                        type='radio'
                        id='hiring'
                        name='role'
                        value='hiring'
                        checked={formData.role === 'hiring'}
                        onChange={handleInputChange}
                    />

                    <label htmlFor='both'>Both: Job Seeker and Hiring</label>
                    <input
                        type='radio'
                        id='both'
                        name='role'
                        value='both'
                        checked={formData.role === 'both'}
                        onChange={handleInputChange}
                    />
                </fieldset>

                <label htmlFor='phone'>Phone Number:</label>
                <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder='xxx-xxx-xxxx'
                    minLength={12}
                    maxLength={12}
                    pattern='^\d{3}-\d{3}-\d{4}$'
                    autoComplete='yes'
                />

                <label htmlFor='address'>Address:</label>
                <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    autoComplete='yes'
                />

                <label htmlFor='bio'>About You:</label>
                <textarea
                    id='bio'
                    name='bio'
                    placeholder='Tell the world about yourself'
                    maxLength={maxLength}
                    value={formData.bio}
                    onChange={handleInputChange}
                />
                <p style={{color: 'grey'}}>Remaining characters: {remainingBioCharacters}</p>

                <label htmlFor='skills'>Skills:</label>
                <textarea
                    id='skills'
                    name='skills'
                    placeholder='Tell the world what you can do'
                    maxLength={maxLength}
                    value={formData.skills}
                    onChange={handleInputChange}
                />
                <p style={{color: 'grey'}}>Remaining characters: {remainingSkillsCharacters}</p>

                <label htmlFor='image'>Profile Image URL:</label>
                <input
                    type='url'
                    id='image'
                    name='image'
                    value={formData.image}
                    onChange={handleInputChange}
                    // TODO: Adjust field width so placeholder is fully visible?
                    placeholder='https://example.com/image.png'
                    pattern='https?:\/\/.*\.(?:png|jpg|jpeg)'
                    title='Please enter a URL that ends in .png, .jpg, or .jpeg'
                />
                <small style={{color: 'grey'}}>Paste a direct image URL (ending in .png, .jpg, or .jpeg). 
                    You can use a site like
                    <a href='https://postimages.org'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ marginLeft: '4px', color: 'blue' }}>
                        postimages.org
                    </a>
                </small>

                <p>Image Preview:</p>
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='Image preview'
                        style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px'}}
                    />
                )}

                <button type='submit'>Save</button>
            </form>
        </>
    );
}

export default UserInfoForm;