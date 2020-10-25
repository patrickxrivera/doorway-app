export const isProdEnv = () => true;

export const getErrorMessageFromResponse = (e) => e.response ? e.response.data.message : e.message;