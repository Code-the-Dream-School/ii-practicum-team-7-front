import { useState, useEffect, useRef } from 'react';

const BASE_URL = 'http://localhost:8000/api/v1/profile';
// TODO: move this to state
const profileId = '';
const url = profileId ? `${BASE_URL}/${profileId}` : BASE_URL;
const token = localStorage.getItem('authToken');

// Reusable fetch options helper
const fetchOptions = (method, token, data) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };
    if (data) options.body = JSON.stringify(data);
    return options;
};

function UserInfoForm() {

    // Track if user is editing an existing profile
    const isEditMode = !!profileId;

    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
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

    // Auto-format phone number xxx-xxx-xxxx
    // TODO: Fix: if user tries to input between characters, caret jumps to the end
    const formatPhoneNumber = (value) => {
        const cleanedNum = value.replace(/\D/g, '');
        let length = cleanedNum.length;

        if (length === 0) return '';

        if (length <= 3) return `${cleanedNum}`;
        if (length <= 6) return `${cleanedNum.slice(0, 3)}-${cleanedNum.slice(3)}`;
        return `${cleanedNum.slice(0, 3)}-${cleanedNum.slice(3, 6)}-${cleanedNum.slice(6,10)}`;
    };

    // API calls

    // POST
    const createProfile = async () => {
        setIsSaving(true);
        try {
            const options = fetchOptions('POST', token, formData);
            const response = await fetch(url, options);
            if (!response.ok) {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            console.log('Created new profile:', data);
        } catch (error) {
            console.error('Error creating profile:', error.message);
        } setIsSaving(false);
    };

    // GET
    const getProfile = async () => {
        try {
            setIsLoading(true);
            const options = fetchOptions('GET', token);
            const response = await fetch(url, options)
            if (!response.ok) {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            console.log('Profile data:', data);
            setFormData({
                ...data,
                phone: formatPhoneNumber(data.phone || '')
            });
        } catch (error) {
            console.error('Error fetching profile:', error.message);
        } setIsLoading(false);
    };

    // PATCH
    const updateProfile = async () => {
        setIsSaving(true);
        try {
            const options = fetchOptions('PATCH', token, formData);
            const response = await fetch(url, options);
            if (!response.ok) {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            console.log('Updated profile:', data);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        } finally {
            setIsSaving(false);
            setHasChanged(false);
        }
    };

    // Handle form changes
    const handleInputChange = ({ target: { name, value } }) => {
        setFormData(prev => ({
            ...prev,
            [name]: name === 'phone' ? formatPhoneNumber(value) : value
        }));
        setHasChanged(true);
    };

    // Fetch profile if editing
    useEffect(() => {
        if (isEditMode && profileId) {
            getProfile();
        }
    }, [isEditMode, profileId]);

    // 'Cancel' button logic for edit mode
    // TODO: handle actual redirects/routing
    const handleCancel = () => {
        if (isEditMode) {
            console.log('Redirect to user profile');
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit triggered. profileID:', profileId, '| isEditMode:', isEditMode);
        if (profileId) {
            updateProfile();
        } else {
            createProfile();
        }
    };

    return (
        <>
        <h2>{isEditMode ? 'Edit Profile' : 'Create Your Profile'}</h2>
        {isLoading ? (
            <div role='status'>
                <p>{isEditMode ? 'Gathering your profile...' : 'Working on it...'}</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} id='userInfoForm'>
                <label htmlFor='name'>
                    Your Name:
                    <span style={{color: 'red' }}>*</span>
                </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete='name'
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
                    autoComplete='email'
                    required
                />
                
                <fieldset>
                    <legend>
                        Choose Your Role:                        
                        <span style={{color: 'red' }}>*</span>
                    </legend>

                    <label htmlFor='jobSeeker'>
                    <input
                        type='radio'
                        id='jobSeeker'
                        name='role'
                        value='jobSeeker'
                        checked={formData.role === 'jobSeeker'}
                        onChange={handleInputChange}
                        required
                    />
                    Job Seeker
                    </label>

                    <label htmlFor='hiring'>
                    <input
                        type='radio'
                        id='hiring'
                        name='role'
                        value='hiring'
                        checked={formData.role === 'hiring'}
                        onChange={handleInputChange}
                    />
                    Hiring
                    </label>

                    <label htmlFor='both'>
                    <input
                        type='radio'
                        id='both'
                        name='role'
                        value='both'
                        checked={formData.role === 'both'}
                        onChange={handleInputChange}
                    />
                    Both: Job Seeker and Hiring
                    </label>
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
                    autoComplete='tel'
                />

                <label htmlFor='address'>Address:</label>
                <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    autoComplete='address'
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
                
                {isEditMode && <button type='button' onClick={handleCancel} disabled={isSaving} variant='outline'>Cancel</button>}
                <button type='submit' disabled={isLoading || !hasChanged || isSaving}>{isSaving ? 'Saving...' : isEditMode ? 'Save' : 'Create'}</button>
            </form>
        )}
        </>
    );
}

export default UserInfoForm;