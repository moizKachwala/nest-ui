export const METHOD_GET = 'GET';
export const METHOD_PUT = 'PUT';
export const METHOD_POST = 'POST';
export const METHOD_DELETE = 'DELETE';

export const MIME_TYPE_JSON = 'application/json';
export const MIME_TYPE_OCTET = 'application/octet-stream';
export const MIME_TYPE_TEXT_HTML = 'text/html; charset=utf-8';

export const HEADERS_JSON_SEND = {
    'Content-Type': MIME_TYPE_JSON,
};

export const HEADERS_JSON_RECEIVE = {
    'Accept': MIME_TYPE_JSON,
};

export const HEADERS_JSON_SEND_RECEIVE = {
    ...HEADERS_JSON_SEND,
    ...HEADERS_JSON_RECEIVE,
};

export const HEADERS_OCTET_SEND = {
    'Content-Type': MIME_TYPE_OCTET,
};

export const HEADERS_OCTET_RECEIVE = {
    'Accept': MIME_TYPE_OCTET,
};

export const HEADERS_OCTET_SEND_RECEIVE = {
    ...HEADERS_JSON_SEND,
    ...HEADERS_OCTET_RECEIVE,
};

export const HEADERS_TEXT_HTML_SEND_RECEIVE = {
    ...HEADERS_JSON_SEND,
    ...MIME_TYPE_TEXT_HTML,
};

export const SERVER_URL = process.env.REACT_APP_API_ENDPOINT;