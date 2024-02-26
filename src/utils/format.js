
export const createStringDataField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => {
            if (typeof value === 'string') {
                if (value) {
                    return value;
                }
                return '';
            }

            if (typeof value === 'object') {
                const { secondLevel } = options;
                if (value && value[secondLevel]) {
                    return value[secondLevel];
                }
                return '';
            }
        },
        options
    };
}