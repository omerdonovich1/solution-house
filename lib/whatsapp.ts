/** Solution House WhatsApp line + a ready-to-send opener. */
export const WHATSAPP_NUMBER = "972522300139"; // 052-230-0139

const MESSAGE =
  "היי 👋 הגעתי מהאתר של Solution House ואשמח לשמוע עוד — איך תוכלו לעזור לעסק שלי?";

/** wa.me link that opens the chat with the message already typed. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  MESSAGE
)}`;
