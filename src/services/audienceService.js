/**
 * Retrieve all audiences from local storage.
 */
export const fetchAudiences = async () => {
    try {
        // Retrieve audiences from local storage
        let audiences = JSON.parse(localStorage.getItem('audiences')) || [];
       // let audiences;
        return audiences;
    } catch (error) {
        console.error('Error fetching audiences from local storage:', error);
        throw error;
    }
};

/**
 * Delete an audience from local storage.
 * @param {number} id - Audience ID to delete.
 */
export const deleteAudience = async (id) => {
    try {
        // Retrieve audiences from local storage
        let audiences = JSON.parse(localStorage.getItem('audiences')) || [];

        // Filter out the audience with the given ID
        audiences = audiences.filter(audience => audience.id !== id);

        // Update local storage
        localStorage.setItem('audiences', JSON.stringify(audiences));

        return true;
    } catch (error) {
        console.error('Error deleting audience from local storage:', error);
        throw error;
    }
};

/**
 * Add a new audience to local storage.
 * @param {object} userData - Data of the new audience to add.
 */
export const addAudience = async (userData) => {
    try {
        // Retrieve the existing data from local storage
        let audiences = JSON.parse(localStorage.getItem('audiences')) || [];

        // Assign a new unique ID to the user
        userData.id = audiences.length ? Math.max(...audiences.map(a => a.id)) + 1 : 1;

        // Add the new user data to the array
        audiences.push(userData);

        // Save the updated array back to local storage
        localStorage.setItem('audiences', JSON.stringify(audiences));

        return Promise.resolve(userData);
    } catch (error) {
        console.error('Failed to add user to local storage:', error);
        throw { message: "Failed to add user", error };
    }
};

/**
 * Update an audience in local storage.
 * @param {number} id - Audience ID to update.
 * @param {object} data - Updated data.
 */
export const updateUser = async (id, data) => {
    try {
        // Retrieve audiences from local storage
        let audiences = JSON.parse(localStorage.getItem('audiences')) || [];

        // Find the audience with the given ID
        const index = audiences.findIndex(audience => audience.id === id);

        // Update the audience if found
        if (index !== -1) {
            audiences[index] = { ...audiences[index], ...data };
            localStorage.setItem('audiences', JSON.stringify(audiences));

            return Promise.resolve(audiences[index]);
        } else {
            throw new Error(`Audience with ID ${id} not found`);
        }
    } catch (error) {
        console.error('Error updating audience in local storage:', error);
        throw error;
    }
};
