/**
  * @jsx React.DOM
  */
var React                   =   require('react');
var LigneRoulementStore     =   require('../stores/LigneRoulementStore.js');
var LigneRoulementActions   =   require('../actions/LigneRoulementActions.js');
var TotemLigneRoulement     =   require('./TotemLigneRoulement.jsx');

function getAppState() {
    return  {
                allLignes:      LigneRoulementStore.getAll()
            };
}

var TotemApp = React.createClass({

    getInitialState: function () {
        return getAppState();
    },

    componentDidMount: function () {
        LigneRoulementStore.addChangeListener(this._onChange);
        window.addEventListener('resize', this._onResize);
        LigneRoulementActions.loadForDay("2014-01-22");
    },

    componentWillUnmount: function () {
        LigneRoulementStore.removeChangeListener(this._onChange);
        window.removeEventListener('resize', this._onResize);
    },

    render: function ()
    {
        if(!this.state.allLignes)
        {
            return null;
        }
        else
        {
            var lignes =    this.state.allLignes    .map    (   function(ligne)
                                                                {
                                                                    return <TotemLigneRoulement ligne={ligne} key={ligne.numero} />;
                                                                }
                                                            );
            return <div>
                    {lignes}
                </div>;
        }

    },

    _onChange: function () {
        this.setState(getAppState());
    },

    _onResize: function() {
        LigneRoulementActions.resizeWindow();
    }

});

module.exports = TotemApp;