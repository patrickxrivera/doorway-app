class PhoneNumber {
    static toInternationalFormat(phoneNumber) {
        const strippedPhoneNumber = phoneNumber.trim();

        const length = strippedPhoneNumber.length;

        // Missing leading country code
        if (length === 10) {
            return `+1${strippedPhoneNumber}`;
        }

        return strippedPhoneNumber;
    }

    static toInternationalFormatV2(phoneNumber) {
        const formattedPhoneNumber = PhoneNumber.toInternationalFormat(
            phoneNumber
        );
        return formattedPhoneNumber.includes("+")
            ? formattedPhoneNumber
            : `+${phoneNumber}`;
    }
}

export default PhoneNumber;
