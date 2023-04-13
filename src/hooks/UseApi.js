const { useState } = require("react");

function useApi(apiFunction) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const request = (args, successCallback) => {
        console.log('apiFunction:', apiFunction);
        console.log('args:', args);
        setLoading(true);
        setError(null);

        apiFunction(args)
            .then(response => {
                console.log('Response from API call:', response.data);
                setData(response.data.data);
                successCallback?.();
            }).catch(error => {
                setError(error);
                console.error('Error when calling API:', error);
            }).finally(() => {
                setLoading(false);
            });
    };

    return {data, error, loading, request};
}

export {useApi};