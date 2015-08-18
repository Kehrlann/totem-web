var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require("../constants/LigneRoulementConstants.js");
var moment = require("moment");

var CHANGE_EVENT = 'change';

var _typesTrain = {US: "us", UM_TETE: "umt", UM_QUEUE: "umq"};
var _dateFormat = "YYYYMMDDHHmmss";

var _lignesRoulement    =   [   {
                                    "numero"    :   "1",
                                    "trains"    :   [
                                                        {
                                                            numero: 9413,
                                                            sillon: 9313,
                                                            stations: [{
                                                                nom: "Paris Nord",
                                                                abrege: "PNO",
                                                                depart: moment().hours(8).minutes(1).seconds(0).format(_dateFormat),
                                                                arrivee: null
                                                            },
                                                                {
                                                                    nom: "Bruxelles",
                                                                    abrege: "BRU",
                                                                    depart: null,
                                                                    arrivee: moment().hours(9).minutes(23).seconds(0).format(_dateFormat)
                                                                }
                                                            ],
                                                            type: _typesTrain.US
                                                        },
                                                        {
                                                            numero: 9340,
                                                            sillon: 9340,
                                                            stations: [
                                                                {
                                                                    nom: "Bruxelles",
                                                                    abrege: "BRU",
                                                                    depart: moment().hours(13).minutes(13).seconds(0).format(_dateFormat),
                                                                    arrivee: null
                                                                },
                                                                {
                                                                nom: "Paris Nord",
                                                                abrege: "PNO",
                                                                depart: null,
                                                                arrivee: moment().hours(14).minutes(35).seconds(0).format(_dateFormat)
                                                                }
                                                            ],
                                                            type: _typesTrain.US
                                                        },
                                                        {
                                                            numero: 9369,
                                                            sillon: 9369,
                                                            stations: [
                                                                {
                                                                    nom: "Paris Nord",
                                                                    abrege: "PNO",
                                                                    depart: moment().hours(17).minutes(25).seconds(0).format(_dateFormat),
                                                                    arrivee: null
                                                                },
                                                                {
                                                                    nom: "Bruxelles",
                                                                    abrege: "BRU",
                                                                    arrivee: moment().hours(18).minutes(47).seconds(0).format(_dateFormat),
                                                                    depart: moment().hours(18).minutes(51).seconds(0).format(_dateFormat)
                                                                },
                                                                {
                                                                    nom: "Anvers",
                                                                    abrege: "ANT",
                                                                    arrivee: moment().hours(19).minutes(27).seconds(0).format(_dateFormat),
                                                                    depart: moment().hours(19).minutes(30).seconds(0).format(_dateFormat)
                                                                },
                                                                {
                                                                    nom: "Rotterdam",
                                                                    abrege: "RTM",
                                                                    arrivee: moment().hours(20).minutes(2).seconds(0).format(_dateFormat),
                                                                    depart: moment().hours(20).minutes(5).seconds(0).format(_dateFormat)
                                                                },
                                                                {
                                                                    nom: "Schipol",
                                                                    abrege: "SHX",
                                                                    arrivee: moment().hours(20).minutes(24).seconds(0).format(_dateFormat),
                                                                    depart: moment().hours(20).minutes(29).seconds(0).format(_dateFormat)
                                                                },
                                                                {
                                                                    nom: "Amsterdam",
                                                                    abrege: "AMS",
                                                                    arrivee: moment().hours(20).minutes(42).seconds(0).format(_dateFormat),
                                                                    depart: null
                                                                }
                                                            ],
                                                            type: _typesTrain.US
                                                        }
                                                    ]
                                },
                                {
                                    "numero"    :   "2",
                                    "trains"    :   [
                                                        {
                                                            numero: 9424,
                                                            sillon: 9324,
                                                            stations: [
                                                                {
                                                                    nom: "Köln",
                                                                    abrege: "KOL",
                                                                    depart: moment().hours(8).minutes(44).seconds(0).format(_dateFormat),
                                                                    arrivee: null
                                                                },
                                                                {
                                                                    nom: "Aachen",
                                                                    abrege: "AAC",
                                                                    arrivee: moment().hours(9).minutes(20).seconds(0).format(_dateFormat),
                                                                    depart: moment().hours(9).minutes(25).seconds(0).format(_dateFormat)
                                                                },
                                                                {
                                                                    nom: "Liège Guillemins",
                                                                    abrege: "LIE",
                                                                    depart: moment().hours(9).minutes(51).seconds(0).format(_dateFormat),
                                                                    arrivee: moment().hours(9).minutes(46).seconds(0).format(_dateFormat)
                                                                },
                                                                {
                                                                    nom: "Bruxelles",
                                                                    abrege: "BRU",
                                                                    arrivee: moment().hours(10).minutes(32).seconds(0).format(_dateFormat),
                                                                    depart: moment().hours(10).minutes(37).seconds(0).format(_dateFormat)
                                                                },
                                                                {
                                                                    nom: "Paris Nord",
                                                                    abrege: "PNO",
                                                                    arrivee: moment().hours(12).minutes(05).seconds(0).format(_dateFormat),
                                                                    depart: null
                                                                }
                                                            ],
                                                            type: _typesTrain.US
                                                        },
                                                        {
                                                            numero: 9457,
                                                            sillon: 9357,
                                                            stations: [{
                                                                nom: "Paris Nord",
                                                                abrege: "PNO",
                                                                depart: moment().hours(15).minutes(22).seconds(0).format(_dateFormat),
                                                                arrivee: null
                                                            },
                                                                {
                                                                    nom: "Bruxelles",
                                                                    abrege: "BRU",
                                                                    depart: null,
                                                                    arrivee: moment().hours(16).minutes(47).seconds(0).format(_dateFormat)
                                                                }
                                                            ],
                                                            type: _typesTrain.US
                                                        },
                                                        {
                                                            numero: 9476,
                                                            sillon: 9376,
                                                            stations: [
                                                                {
                                                                    nom: "Bruxelles",
                                                                    abrege: "BRU",
                                                                    depart: moment().hours(19).minutes(13).seconds(0).format(_dateFormat),
                                                                    arrivee: null
                                                                },
                                                                {
                                                                nom: "Paris Nord",
                                                                abrege: "PNO",
                                                                depart: null,
                                                                arrivee: moment().hours(20).minutes(38).seconds(0).format(_dateFormat)
                                                                }
                                                            ],
                                                            type: _typesTrain.US
                                                        }
                                                    ]
                                    }
                                ];

var _selectedTrain      = null;
var _selectedLigne      = null;


var LigneRoulementStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
      return _lignesRoulement;
    },

    getSelectedTrain: function() {
        return _selectedTrain;
    },

    getSelectedLigne: function(){
        return _selectedLigne;
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
  var text;

    switch(action.actionType) {
        case Constants.TRAIN_SELECT:
            if (action.id !== '')
            {
                _selectedTrain = action.id;
                _lignesRoulement    .some   (   function(ligne)
                                                {
                                                    if(ligne.trains && ligne.trains.length > 0)
                                                        return ligne.trains     .some   (   function(train)
                                                                                            {
                                                                                                if(train.numero && train.numero == action.id)
                                                                                                {
                                                                                                    _selectedLigne = ligne.numero;
                                                                                                    _selectedTrain = train.numero;
                                                                                                    return true;
                                                                                                }
                                                                                            }
                                                                                        );
                                                    else
                                                        return false;
                                                }
                                            );
                LigneRoulementStore.emitChange();
            }
            break;

        case Constants.TRAIN_UNSELECT:
            _selectedLigne = null;
            _selectedTrain = null;
            LigneRoulementStore.emitChange();
            break;


        default:
          // no op
    }
});

module.exports = LigneRoulementStore;