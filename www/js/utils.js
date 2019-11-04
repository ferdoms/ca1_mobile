
var utils = {
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let res = await response.json()
            let error = new Error(res['Error']);
            error.message = res['Error'];
            throw error;
        }
    }
}