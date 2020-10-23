export const isProdEnv = () => false;

export const getErrorMessageFromResponse = (e) => e.response ? e.response.data.message : e.message;