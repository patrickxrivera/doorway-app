import axios from "axios";
import { SAVE_EMAIL } from "../utils/endpoints";
import ErrorLogger from "../services/error-logger";

export const saveEmail = async (email) => {
    try {
        const res = await axios.post(SAVE_EMAIL, { email });
        return res.data;
    } catch (e) {
        ErrorLogger.send(e, { email });
        return null;
    }
}