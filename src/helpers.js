import { ApiDetails } from './constants';

export async function getResponseJson (response) {
    if (!response.ok) {
        return Promise.resolve(response.json())
            .then(error => {
                throw error || response.statusText
            });
    }
    if (response.status === 204) return "";
    return await response.json();
}

export function wrappedFetch(url, method, body) {
    
    let options = 
    {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${ApiDetails.username}:${ApiDetails.password}`)
        }
    };
    if (body) {
        options.body = body;
    }

    url = `${ApiDetails.apiBaseUrl}${url}`;
    let result = new Promise((resolve, reject) => {
        fetch(url, options)
            .then(data => {
                if (data.ok) {
                    resolve(getResponseJson(data));
                } else {
                    data.text().then(body => {
                        let errors = [];
                        try {
                            let resultObj = JSON.parse(body);
                            if (resultObj.modelState) {
                                Object.keys(resultObj.modelState).forEach(
                                    key => {
                                        errors.push(resultObj.modelState[key]);
                                    }
                                );
                            } else if (resultObj.Message) {
                                errors.push(resultObj.Message);
                            }
                        } catch (e) {
                            errors.push(body);
                        }
                        reject(errors);
                    });
                }
            })
            .catch(error => {
                reject(error);
            });
    });
    return result;
}


if (!Array.prototype.sortBy) {

    Array.prototype.sortBy = function(names) {
        var result = [];
        this.forEach(function(element) {
            result.push(element);
        });
        if (names && (typeof(names) == 'string' || Array.isArray(names))) {
            if (typeof(names) == 'string') names = [names];
            return result.sort(function(a, b) {
                for(var i = 0; i < names.length; i++) {
                    var name = names[i];
                    if (a[name] == b[name])
                        continue;
                    else if (a[name] > b[name])
                        return 1;
                    else
                        return -1;
                }
                return 0;
            });
        }
        else {
            return result.sort();
        }
    }
}

