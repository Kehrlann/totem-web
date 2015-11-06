var AppDispatcher               =   require('../dispatcher/AppDispatcher.js');
var EventEmitter                =   require('events').EventEmitter;
var assign                      =   require('object-assign');
var LigneRoulementConstants     =   require("../constants/LigneRoulementConstants.js");
var LigneRoulementActions       =   require("../actions/LigneRoulementActions.js");
var DateConstants               =   require("../constants/DateConstants.js");
var ParseXml                    =   require("../utils/XmlParser.js");
var ReadFota                    =   require("../utils/FotaReader.js");
var moment                      =   require("moment");
var Q                           =   require("q");
var $                           =   require("jquery");

var CHANGE_EVENT = 'change';

var _typesTrain = {US: "us", UM_TETE: "umt", UM_QUEUE: "umq"};

var _lignesRoulement    =   [];

var _selectedTrainNumber    =   null;
var _selectedTrain          =   null;
var _selectedLigne          =   null;
var _selectedDate           =   null;


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

    getSelectedDate: function(){
        return _selectedDate;
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

    switch(action.actionType) {
        case LigneRoulementConstants.TRAIN_SELECT:
            if (action.id !== '')
            {
                _lignesRoulement    .some   (   function(ligne)
                                                {
                                                    if(ligne.trains && ligne.trains.length > 0)
                                                        return ligne.trains     .some   (   function(train)
                                                                                            {
                                                                                                if(train && train.idtrain == action.id)
                                                                                                {
                                                                                                    _selectedLigne = ligne.numero;
                                                                                                    _selectedTrainNumber = train.numero;
                                                                                                    _selectedTrain = train;
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

        case LigneRoulementConstants.TRAIN_UNSELECT:
            _selectedLigne = null;
            _selectedTrainNumber = null;
            _selectedTrain = null;
            LigneRoulementStore.emitChange();
            break;

        case LigneRoulementConstants.LIGNES_LOAD:
            if (action.lignes)
            {
                _selectedLigne = null;
                _selectedTrainNumber = null;
                _selectedTrain = null;
                _lignesRoulement = action.lignes;
                LigneRoulementStore.emitChange();
            }
            break;

        case LigneRoulementConstants.LOAD_FOR_DATE:
            if(action.date)
            {
                _selectedDate = moment(action.date, DateConstants.dateFormatFromBrowser);

                Q       ( $.get ("data/" + _selectedDate.format(DateConstants.dateFormatForFile) + ".xml")
                        )
                .then   (   function(data)
                            {
                                if(data)
                                {
                                    var cleared = new XMLSerializer().serializeToString(data.documentElement);
                                    return ParseXml(cleared);
                                }
                                else
                                {
                                    return null;
                                }
                            }
                        )
                .then   (   function(data)

                            {
                                if(data)
                                {
                                    LigneRoulementActions.loadLignes(ReadFota(data));
                                }
                                else
                                {
                                    LigneRoulementActions.loadLignes([]);
                                }
                            }
                        )
                .catch  (   function(err)
                            {
                                console.error("ERROR - LigneRoulementStore - LOAD FOR DATE", err);
                                LigneRoulementActions.loadLignes([]);
                            }
                        );
            }
            break;

        case LigneRoulementConstants.WINDOW_RESIZE:
            LigneRoulementStore.emitChange();
            break;

        default:
          // no op
    }
});

module.exports = LigneRoulementStore;
