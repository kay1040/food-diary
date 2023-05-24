export const useApiErrorHandler = (error) => {
    if (error.response) {
        ElMessage({
            showClose: true,
            message: error.response.data.message,
            type: 'error'
        });
    } else if (error.request) {
        ElMessage({
            showClose: true,
            message: 'No response received.',
            type: 'error'
        });
    } else {
        ElMessage({
            showClose: true,
            message: error.message,
            type: 'error'
        });
    }
};