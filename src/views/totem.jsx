/**
  * @jsx React.DOM
  */
var React = require('react');
var LigneRoulementStore = require('../stores/LigneRoulementStore.js');

function getAppState() {
    return  {
                allTrains:      LigneRoulementStore.getAll(),
                selectedTrain:  LigneRoulementStore.getSelectedTrain(),
                selectedLigne:  LigneRoulementStore.getSelectedLigne()
            };
}

var TotemApp = React.createClass({

    getInitialState: function () {
        return getAppState();
    },

    componentDidMount: function () {
        LigneRoulementStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        LigneRoulementStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return <div className="toto" id="toto">
          Hello world :)
          </div>;
    },

    _onChange: function () {
        this.setState(getAppState());
    }

});

module.exports = TotemApp;