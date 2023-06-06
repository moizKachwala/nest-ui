export const CHAT_GET_RESPONSE = 'CHAT_GET_RESPONSE';
export const CHAT_GET_RESPONSE_PENDING = 'CHAT_GET_RESPONSE_PENDING';
export const CHAT_GET_RESPONSE_FULFILLED = 'CHAT_GET_RESPONSE_FULFILLED';
export const CHAT_GET_RESPONSE_REJECTED = 'CHAT_GET_RESPONSE_REJECTED';

export const list = (chatPayload) => ({
    type: CHAT_GET_RESPONSE,
    payload: {chatPayload}
});