import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Fields from "./FormFields";

const BASE_URL = "http://localhost:8000/api/v1/profile";
// const token = localStorage.getItem('authToken');

// Reusable fetch options helper
const fetchOptions = (method, data) => {
  const options = {
    method,
    credentials: "include", // send cookies
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
  };

  if (data) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  return options;
};

function UserInfoForm() {
  const navigate = useNavigate();

  // Track if user is editing an existing profile
  const { id: profileIdFromParams } = useParams();
  const [profileId, setProfileId] = useState(() => profileIdFromParams || "");
  const isEditMode = !!profileIdFromParams;

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    bio: "",
    skills: "",
    image: "",
  });

  // Set + show character limit/remaining characters for bio and skills
  const maxLength = 250;
  const remainingBioCharacters = maxLength - formData.bio.length;
  const remainingSkillsCharacters = maxLength - formData.skills.length;

  // URL builder
  const url = profileId ? `${BASE_URL}/${profileId}` : BASE_URL;

  // API calls

  // POST
  const createProfile = async () => {
    setIsSaving(true);
    try {
      const options = fetchOptions("POST", formData);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log("Created new profile:", data);

      // Set profileId and formData with the new profile
      setProfileId(data.profile._id);
      setFormData({
        ...data.profile,
        phone: data.profile.phone || "",
      });

      navigate(`/profile/${data.profile._id}`); // Redirect to profile page
    } catch (error) {
      console.error("Error creating profile:", error.message);
    } finally {
      setIsSaving(false);
      setHasChanged(false);
    }
  };

  // GET
  const getProfile = async () => {
    if (!profileId) return;
    try {
      setIsLoading(true);
      const options = fetchOptions("GET");
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();

      setFormData({
        ...data.profile,
        phone: data.profile.phone || "",
      });

      setProfileId(data.profile._id);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // PATCH
  const updateProfile = async () => {
    setIsSaving(true);
    try {
      const options = fetchOptions("PATCH", formData);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log("Updated profile:", data);
      navigate(`/profile/${data.updatedProfile._id}`); // Redirect to the updated profile page
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setIsSaving(false);
      setHasChanged(false);
    }
  };

  // Handle form changes
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanged(true);
  };

  // 'Cancel' button logic for edit mode
  // TODO: handle actual redirects/routing
  const handleCancel = () => {
    if (hasChanged) {
      const userConfirm = window.confirm(
        "Are you sure you want to cancel? Any unsaved changed will be lost."
      );
      if (!userConfirm) return;
    }
    console.log("Redirect to user profile");
    navigate(`/profile/${profileId}`);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (profileId) {
      updateProfile();
    } else {
      createProfile();
    }
  };

  // Fetch profile if editing
  useEffect(() => {
    if (isEditMode) {
      getProfile();
    }
  }, [isEditMode, profileId]);

  return (
    <div className="bg-monte-carlo pt-36 pb-12 px-4 sm:px-8 pg:px-16">
      <h2 className="pb-8">
        {isEditMode ? "Edit Profile" : "Create Your Profile"}
      </h2>

      {isLoading ? (
        <div role="status">
          <p>{isEditMode ? "Gathering your profile..." : "Working on it..."}</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          id="userInfoForm"
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {/* Image and URL Input */}
          <div className="md:col-span-1 space-y-4">
            {formData.image && (
              <div className="flex flex-col items-center">
                <img
                  src={formData.image}
                  alt="Image preview"
                  className="w-52 h-52 rounded-full object-cover mb-2 border-4 border-white"
                />
                <p className="text-sm text-gray-700">Image Preview</p>
              </div>
            )}

            <div className="text-left space-y-2">
              <label htmlFor="image">Profile Image URL:</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.png"
                pattern="https?:\/\/.*\.(?:png|jpg|jpeg)"
                title="Please enter a URL that ends in .png, .jpg, or .jpeg"
                className="w-full border rounded p-2"
              />
              <small className="text-sm text-gray-700">
                Paste a direct image URL (ending in .png, .jpg, or .jpeg). Use{" "}
                <a
                  href="https://postimages.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  postimages.org
                </a>
              </small>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <Fields formData={formData}
            handleInputChange={handleInputChange}
            maxLength={maxLength}
            remainingBioCharacters={remainingBioCharacters}
            remainingSkillsCharacters={remainingSkillsCharacters}
            />
          </div>

          <div className="md:col-span-3 flex justify-center gap-2">
            {isEditMode && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="btn-wht"
              >
                Cancel
              </button>
            )}
            <button type="submit"
              disabled={isLoading || isSaving || !hasChanged}
              className="btn-grn">
              {isSaving ? "Saving..." : isEditMode ? "Save" : "Create"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserInfoForm;
