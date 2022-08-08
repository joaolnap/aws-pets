const formatResponse = (statusCode, body) => {
    const response = {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body
    };
    return response;
};

const formatError = (statusCode, error) => {
    const response = {
        statusCode,
        headers: { 'Content-Type': 'text/plain'},
        body: 'There\'s an exception: ' + error
    };
    return response;
};

const serialize = (object) => {
    return JSON.stringify(object, null, 2);
};

module.exports = {
    formatResponse,
    formatError,
    serialize
};