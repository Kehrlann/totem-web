var parseString     =   require("xml2js").parseString;
var Q               =   require("q");

var parseXml =  function(xml)
                {
                    var deferred = Q.defer();
                    parseString (   xml,
                                    function (err, result)
                                    {
                                        if(err)
                                        {
                                            deferred.reject(err);
                                        }
                                        else
                                        {
                                            deferred.resolve(result);
                                        }
                                    }
                                );
                    return deferred.promise;
                };

module.exports = parseXml;
