/* eslint-disable @typescript-eslint/no-explicit-any */
export const getErrorMessage = (error: any): string => {
        if (typeof error === 'string') {
            return error;
        }
        
        if (error && 'status' in error) {
            const status = error.status;
            let message = `Error ${status}`;
            
            if ('data' in error && error.data) {
                if (typeof error.data === 'string') {
                    message += `: ${error.data}`;
                } else if (error.data.message) {
                    message += `: ${error.data.message}`;
                } else {
                    message += `: ${JSON.stringify(error.data)}`;
                }
            } else {
                switch (status) {
                    case 400:
                        message = "Bad request. Please check your input.";
                        break;
                    case 401:
                        message = "Unauthorized. Please log in again.";
                        break;
                    case 403:
                        message = "Access denied. You don't have permission to view this data.";
                        break;
                    case 404:
                        message = "Data not found.";
                        break;
                    case 500:
                        message = "Server error. Please try again later.";
                        break;
                    case 502:
                        message = "Service temporarily unavailable.";
                        break;
                    case 503:
                        message = "Service unavailable. Please try again later.";
                        break;
                    default:
                        message = "An unexpected error occurred.";
                }
            }
            return message;
        }
        
        if (error && error.message) {
            return error.message;
        }
        
        return "An unexpected error occurred";
    };