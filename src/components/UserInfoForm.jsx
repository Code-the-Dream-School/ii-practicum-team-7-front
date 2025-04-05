import { useState } from 'react';

function UserInfoForm() {

    // Next to-do: Make form editable

    // Set state and auto-format for phone number
    const [phone, setPhone] = useState('');

    // Possible issue: if user tries to edit in between characters, the cursor jumps to the end
    const formatPhoneNumber = (value) => {
        const cleanedNum = value.replace(/\D/g, '');
        let formattedNum = '';

        if (cleanedNum.length === 0) return '';

        if (cleanedNum.length <= 3) {
            formattedNum = `(${cleanedNum}`;
        } else if (cleanedNum.length <= 6) {
            formattedNum = `(${cleanedNum.slice(0, 3)})${cleanedNum.slice(3)}`;
        } else if (cleanedNum.length <= 10) {
            formattedNum = `(${cleanedNum.slice(0, 3)})${cleanedNum.slice(3, 6)}-${cleanedNum.slice(6,10)}`;
        } else {
            formattedNum = cleanedNum.slice(0, 10);
        }

        return formattedNum;
    };

    const handlePhoneChange = (event) => {
        const input = event.target.value;
        const formattedNum = formatPhoneNumber(input);
        setPhone(formattedNum);
    };
       
    // Set max length and state management for user description
    // Shows remaining character limit
    const maxLength = 250;
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const remainingCharacters = maxLength - description.length;

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
                <label htmlFor='firstName'>
                    First Name:
                    <span style={{color: 'red' }}>*</span>
                    </label>
                <input
                    id='firstName'
                    type='text'
                    name='firstName'
                    required
                />
                <label htmlFor='lastName'>
                    Last Name:
                    <span style={{color: 'red' }}>*</span>
                    </label>
                <input
                    id='lastName'
                    type='text'
                    name='lastName'
                    required
                />
                {/* Adjustments for individual sections + API call? */}
                <label htmlFor='address'>Address:</label>
                <input
                    id='address'
                    type='text'
                    name='address'
                    autoComplete='yes'
                />
                <label htmlFor='phone'>Phone Number:</label>
                <input
                    id='phone'
                    type='text'
                    name='phone'
                    value={phone}
                    placeholder='(xxx)xxx-xxxx'
                    minLength={13}
                    maxLength={13}
                    onChange={handlePhoneChange}
                    autoComplete='yes'
                />
                <label htmlFor='description'>About You:</label>
                <textarea
                    id='description'
                    name='description'
                    placeholder='Tell the world about yourself!'
                    maxLength={maxLength}
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <p style={{color: 'grey'}}>Remaining characters: {remainingCharacters}</p>

                <button type='submit'>Save</button>
            </form>
        </>
    );
}

export default UserInfoForm;