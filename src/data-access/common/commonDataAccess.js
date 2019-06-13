export const callFetch = (url, verb, success, data, headers, onCompleteFunc, onErrorFunc, stringifyData=true) => {

    var attributes ={
        method: verb
    };

    if (headers != null) {
        attributes.headers = headers;
    }

    if (data != null) {
        if (stringifyData){
            attributes.body = JSON.stringify(data);
        } else {
            attributes.body = data;
        }
    }

    fetch(url, attributes)
        .then(function(response) { 
            if (response.status == success){
               
                if(attributes.method == 'PATCH')
                    return null;
                return response.json(); 
            }

            if (onErrorFunc == null){
                return null;
            }

            onErrorFunc(response.message);
            return null;
    }).then(function(response) {

        if (onCompleteFunc == null){
            return;
            }

            onCompleteFunc(response);
    });
}
