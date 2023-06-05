function processResponseBody(response) {
    const contentType = response.headers.get('content-type');
    if (contentType) {
        if (contentType.indexOf('application/json') !== -1) {
            return response.json();
        }
    }
    return Promise.resolve();
}

export function apiHandleResponse(response) {
    return processResponseBody(response)
        .then((payload) => {
            if (response.ok) {
                return payload;
            }

            // eslint-disable-next-line no-throw-literal
            throw { response, payload };
        });
}

export function apiHandleOctetResponse(response) {
    if (response.ok) {
        return response.blob();
    }

    return false;
}

export function apiHandleOctetResponseWithFileName(response) {
    if (response.ok) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const disposition = response.headers.get('content-disposition');
        let fileName = '';
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '');
        }

        return response.blob().then((file) => {
            return {
                file,
                fileName,
            }
        });
    }

    return false;
}