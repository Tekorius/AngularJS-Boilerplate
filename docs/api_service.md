# API service #

This boilerplate comes with a convenient API service that uses promises as its core functionality.

You can implement this service however you like, but the best way is to group logical endpoints to objects like in example.

Call function automatically attaches connected user token to non-anonymous calls.

## Configuration ##

API service comes with ApiProvider. Currently the only configuration is root url:

    ApiProvider.rootUrl('http://url.to-your-api.com');
    
You should omit the trailing slash.

## Call method ##

    Api.call(endpoint, method, query, params, anonymous)
    
* `endpoint` - endpoint to attach to root url (ex. `'/users'`)
* `method` - method to use when calling an endpoint. Available options: `'GET'`, `'POST'`, `'PUT'`, `'PATCH'`, `'DELETE'`, `'HEAD'`. See [$http service documentation](https://docs.angularjs.org/api/ng/service/$http) for more info
* `query` - attached GET parameters. Should be an object.
* `params` - http body. Should be an object
* `anonymous` - boolean if authentication header should be used. For example login does not require authentication header and anonymous is used

## Connected user object ##

By default API service exposes `connectedUser` object. You can change your service to use getter/setter pattern. The only requirement is that object has a token

    Api.connectedUser = {
        token: 'asdasd-asd-asd-asd'
    }
    
## Upload method ##

It may happen that you need to upload something to the server. Since this is handled a bit different, here is an example:

    Api.upload(function() {
        return { yourArgument: yourValue };
    });
    
By default the upload will be url-encoded format

## Other methods ##

* `Api.url(endpoint, query)` - returns url to endpoint with get parameters. May be used where full url is needed
* `Api.getRootUrl()` - gets root url

[Back to index](index.md)