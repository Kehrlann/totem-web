var AppDispatcher   = require('../dispatcher/AppDispatcher.js');
var Constants       = require('../constants/LigneRoulementConstants.js');

var LigneRoulementActions = {

  /**
   * Charger toute les lignes d'une journée
   *
   * @param  {date} date
   */
  loadForDay: function(date) {
    AppDispatcher.dispatch({
      actionType: Constants.LOAD_FOR_DATE,
      date: date
    });
  },

  /**
   * Sélectionner un train.
   *
   * @param  {string} id , le guid du train à déselectionner
   */
  selectTrain: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.TRAIN_SELECT,
      id: id
    });
  },

  /**
   * Déselectionner le train
   */
  unselectTrain: function() {

    AppDispatcher.dispatch({
      actionType: Constants.TRAIN_UNSELECT
    });
  }

};

module.exports = LigneRoulementActions;
