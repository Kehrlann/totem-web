var parseString     =   require("xml2js").parseString;
var Q               =   require("Q");

var parseXml =  function(xml)
                {
                    var deferred = Q.defer();
                    parseString (   xml,
                                    function (err, result)
                                    {
                                        if(err)
                                        {
                                            console.log("ERROR", err);
                                            deferred.reject(err);
                                        }
                                        else
                                        {
                                            console.log("SUCCESS");
                                            deferred.resolve(result);
                                        }
                                    }
                                );
                    return deferred.promise;
                };

module.exports = parseXml;