export default function Fields({ 
    formData,
    handleInputChange,
    maxLength,
    remainingBioCharacters,
    remainingSkillsCharacters
}) {
    const fields = [
        { name: "name", label: "Your Name:", type: "text", required: true, autocomplete: "name" },
        { name: "email", label: "Email:", type: "email", required: true, autocomplete: "email", placeholder: "you@example.com" },
        { name: "phone", label: "Phone Number:", type: "tel", autocomplete: "tel", placeholder: "xxx-xxx-xxxx" },
        { name: "address", label: "Address:", type: "text" },
    ];

    return (
        <>
            {fields.map(({ name, label, type = "text", required, autocomplete, placeholder }) => (
                <>
                    <div key={name} className="text-left">
                        <label htmlFor={name}>
                            {required && <span className="text-red-500">*</span>} {label}
                        </label>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            autoComplete={autocomplete}
                            maxLength={maxLength}
                            required={required}
                            className="w-full border rounded p-2"
                        />

                        {/* Helper text for phone */}
                        {name === "phone" && (
                            <small className="text-gray-700">Ex: 123-456-7890</small>
                        )}
                    </div>

                    {name === "email" && (
                        <fieldset className="bg-white p-6 rounded-md shadow-md max-w-72 mx-auto text-center md:mx-0 md:text-left">
                            <legend className="font-semibold float-left">                
                                <span className="text-red-500">*</span>Choose Your Role:                
                            </legend>
                            <div className="pt-10 space-y-2">
                                {["jobSeeker", "hiring", "both"].map((role) => (
                                    <label key={role} className="flex space-x-2">
                                        <input
                                            type="radio"
                                            id={role}
                                            name="role"
                                            value={role}
                                            checked={formData.role === role}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span>
                                            {role === "jobSeeker"
                                            ? "Job Seeker"
                                            : role === "hiring"
                                            ? "Hiring"
                                            : "Both: Job Seeker and Hiring"}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>  
                    )}
                </>
            ))}

            {/* Bio */}

            <div className="text-left">
                <label htmlFor="bio">About You:</label>
                <textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell the world about yourself"
                    maxLength={maxLength}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                />
                <p className="text-gray-600">Remaining characters: {remainingBioCharacters}</p>
            </div>

            {/* Skills */}
            <div className="text-left">
                <label htmlFor="skills">Skills:</label>
                <textarea
                    id="skills"
                    name="skills"
                    placeholder="Tell the world what you can do"
                    maxLength={maxLength}
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                />
                <p className="text-gray-600">Remaining characters: {remainingSkillsCharacters}</p>
            </div>
        </>
    );
}