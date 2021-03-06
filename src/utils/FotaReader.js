var parse           =   require('./XmlParser.js');
var moment          =   require('moment');
var DateConstants   =   require('../constants/DateConstants.js');


var convertObject   =   function (fotaObject)
                        {
                            var ret = [];
                            var nbrTrain = 0;

                            if(fotaObject)
                            {
                                var trainMap    = {};
                                fotaObject  .TIGRE_PLAN_DE_TRANSPORT
                                            .FLUX_ROULEMENT_OPERA_TIGRE[0]
                                            .TRANCHES[0]
                                            .TRANCHE
                                            .forEach    (   function(train)
                                                            {
                                                                nbrTrain++;

                                                                var passeMinuitDepart   =   false;
                                                                var premierHoraire      =   null;

                                                                var gares = train   .GARES[0]
                                                                                    .GARE
                                                                                    .sort   (   function(gareA, gareB)
                                                                                                {
                                                                                                    return gareA.$.RANG - gareB.$.RANG;
                                                                                                }
                                                                                            )
                                                                                    .map    (   function(gare)
                                                                                                {
                                                                                                    var s = {   nom     :   "",
                                                                                                                abrege  :   gare.CODE_GARE[0].$.TT020LIEU,
                                                                                                                depart  :   gare.$.HEURE_DEPART     ? moment(gare.$.HEURE_DEPART, "hh:mm") : null,
                                                                                                                arrivee :   gare.$.HEURE_ARRIVEE    ? moment(gare.$.HEURE_ARRIVEE, "hh:mm"): null
                                                                                                            };

                                                                                                    var dateActuelle = s.arrivee != null    ?   s.arrivee
                                                                                                                                            :   s.depart;

                                                                                                    premierHoraire = premierHoraire || dateActuelle;

                                                                                                    passeMinuitDepart = dateActuelle.isBefore(premierHoraire);

                                                                                                    return s;
                                                                                                }
                                                                                            );

                                                                var t =     {   idtrain             :   nbrTrain,
                                                                                numero              :   train.$.NUMERO_TRANCHE_COMMERCIALE,
                                                                                sillon              :   train.$.NUMERO_TRANCHE_COMMERCIALE,
                                                                                type                :   "us",
                                                                                passeMinuitDepart   :   passeMinuitDepart,
                                                                                passeMinuitArrivee  :   false,
                                                                                stations            :   gares
                                                                            };
                                                                trainMap[t.numero] = t;
                                                            }
                                                        );


                                ret =   fotaObject  .TIGRE_PLAN_DE_TRANSPORT
                                                    .FLUX_ROULEMENT_OPERA_TIGRE[0]
                                                    .ROULEMENTS[0]
                                                    .ROULEMENT[0]
                                                    .LIGNES_ROULEMENT[0]
                                                    .LIGNE_ROULEMENT
                                                    .map    (   function(ligne)
                                                                {
                                                                    var segments    =   [];

                                                                    if(ligne.SEGMENTS)
                                                                    {
                                                                        segments    =   ligne   .SEGMENTS[0]
                                                                                                    .SEGMENT;
                                                                    }


                                                                    var trainsDejaAjoutes = [];

                                                                    return  {   numero  :   ligne.$.NUMERO_LIGNE,
                                                                                trains  :   segments    .map    (   function(train)
                                                                                                                    {
                                                                                                                        if(!trainsDejaAjoutes.some( function(numero) { return numero == train.$.NUMERO_TRANCHE_COMMERCIALE; }))
                                                                                                                        {
                                                                                                                            trainsDejaAjoutes.push(train.$.NUMERO_TRANCHE_COMMERCIALE);
                                                                                                                            return trainMap[train.$.NUMERO_TRANCHE_COMMERCIALE];
                                                                                                                        }
                                                                                                                    }
                                                                                                                )
                                                                                                        .filter (   function(e){ return e;  }) // remove NULL and UNDEFINED
                                                                            };
                                                                }
                                                            );

                            }
                            return ret;
                        };


module.exports = convertObject;