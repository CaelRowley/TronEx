import $ from 'jquery'
class Service {

    getEntity(type, filter, field){
        var dfd = $.Deferred();

        var elasticsearchHost = 'http://www.tronex.co.uk:9200/_search';

        // var type = "witnesses";
        // var filter = "";
        // var field = "";

        var body = {
           'size': 500
        };

        var query = {
           'bool': {}
        };

        if (type.length > 0) {
            query.bool.must = [
                {   'multi_match': {
                    'query': type,
                    'fields': [ '_index' ]
                }}
            ]
        }

        if(field.length>0){
            var filterAndField = { 'multi_match' : {'query' : filter, 'fields' : [ field ]}}
            query.bool.must.push(filterAndField);
        }

        body.query = query;

        $.ajax({
            url: elasticsearchHost,
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
            },
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(body),
            success: function(response){
                dfd.resolve(response);
            }/*,
            error: function(response){
                console.log("error");
            }*/
        });
        return dfd;
    }

    getWitnessByAddress(address){
        return this.getEntity("witnesses", "witnessAddress", address);
    }
}

export default Service;