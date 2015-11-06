/**
  * @jsx React.DOM
  */
var React                   =   require('react');
var LigneRoulementStore     =   require('../stores/LigneRoulementStore.js');
var LigneRoulementActions   =   require('../actions/LigneRoulementActions.js');
var TotemLigneRoulement     =   require('./TotemLigneRoulement.jsx');
var DateConstants           =   require('../constants/DateConstants.js');


function getAppState() {
    return  {
                allLignes       :   LigneRoulementStore.getAll(),
                selectedDate    :   LigneRoulementStore.getSelectedDate()
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

    moveToDayBefore:    function()
    {
        if(this.state.selectedDate)
        {
            this.moveToDay(this.state.selectedDate.subtract(1, 'days'));
        }
    },

    moveToDayAfter: function()
    {
        if(this.state.selectedDate)
        {
            this.moveToDay(this.state.selectedDate.add(1, 'days'));
        }
    },

    moveToDay: function(day)
    {
        LigneRoulementActions.loadForDay(day.format(DateConstants.dateFormatForFile));
    },

    render: function ()
    {
        var date = "";
        var dateSimple = "";
        if(this.state.selectedDate)
        {
            date = this.state.selectedDate.format(DateConstants.dateFormatForDisplay);
            dateSimple = this.state.selectedDate.format(DateConstants.dateFormat);
        }

        var lignes = [];
        if(this.state.allLignes && this.state.allLignes.length > 0)
        {
            lignes =    this.state.allLignes    .map    (   function(ligne)
                                                                {
                                                                    return <TotemLigneRoulement ligne={ligne} key={dateSimple+ligne.numero} />;
                                                                }
                                                            );
        }
        else
        {
            lignes =    <div className="text-center text-no-data">Pas de données pour le {date} ...</div>;
        }


        return  (   <div>
                        <div className="header">
                            <h3 className="text-muted">TOTEM Mobile (PoC)</h3>
                            <div></div>
                            <nav>
                                <ul className="nav nav-pills">
                                    <li role="presentation">
                                        <a href="#" className="btn btn-xs btn-default" onClick={this.moveToDayBefore}>
                                            &lt;&lt;
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#" className="btn btn-xs btn-default">
                                            {date}
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#" className="btn btn-xs btn-default" onClick={this.moveToDayAfter}>
                                            &gt;&gt;
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div>
                            {lignes}
                        </div>

                        <footer className="footer">
                            <p> Concept by <a href="http://garnier.wf/" target="_blank">Daniel Garnier-Moiroux</a></p>
                        </footer>
                    </div>
                );

    },

    _onChange: function () {
        this.setState(getAppState());
    },

    _onResize: function() {
        LigneRoulementActions.resizeWindow();
    }

});

module.exports = TotemApp;