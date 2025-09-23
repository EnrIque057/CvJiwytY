// 代码生成时间: 2025-09-24 00:57:44
 * This module is used to format API responses into a structured format.
 */

class ApiResponseFormatter {

    /**
     * Formats the API response data
     * @param {Object} rawData - The raw API response data.
     * @param {Object} formatOptions - The options for formatting.
     * @returns {Object} - The formatted API response.
     */
    static format(rawData, formatOptions) {
        try {
            if (!(rawData instanceof Object) || rawData === null) {
                throw new Error('Invalid rawData: Expecting a non-null object.');
            }

            // Apply format options if present
            if (formatOptions && formatOptions instanceof Object) {
                // Example of applying options (this can be extended)
                if (formatOptions.camelCase) {
                    rawData = this.toCamelCase(rawData);
                }
            }

            return rawData;
        } catch (error) {
            console.error('Error in ApiResponseFormatter.format:', error);
            throw error; // Rethrow the error after logging it
        }
    }

    /**
     * Converts object keys to camelCase
     * @param {Object} obj - The object to convert.
     * @returns {Object} - The object with camelCase keys.
     */
    static toCamelCase(obj) {
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            const camelKey = key.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
            newObj[camelKey] = value;
        }
        return newObj;
    }
}

// Example usage:
// const rawData = { "first_name": "John", "last_name": "Doe" };
// const formattedData = ApiResponseFormatter.format(rawData, { camelCase: true });
// console.log(formattedData); // { firstName: 'John', lastName: 'Doe' }
