export const isProdEnv = () => !window.location.href.includes("http://localhost");

export const getErrorMessageFromResponse = (e) => e.response ? e.response.data.message : e.message;

export const ordinalSuffixOf = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}