/**
  * @jsx React.DOM
  */
var React                       =   require('react');
var moment                      =   require('moment');
var DateConstants               =   require('../constants/DateConstants.js');
var LigneRoulementActions       =   require('../actions/LigneRoulementActions.js');

var getStationList =    function(train)
                        {
                            var result = [];

                            if(train)
                            {
                                result = train.stations.map     (   function(station)
                                                                    {
                                                                        var arrivee = station.arrivee   ?   moment(station.arrivee,   DateConstants.dateFormat).format(DateConstants.timeFormat) : "-";
                                                                        var depart  = station.depart    ?   moment(station.depart,    DateConstants.dateFormat).format(DateConstants.timeFormat) : "-";

                                                                        var classString = "row station-row";
                                                                        if(depart == arrivee)
                                                                        {
                                                                            classString += " nostop";
                                                                        }

                                                                        return  (   <div className={classString} key={station.abrege+arrivee+depart}>
                                                                                        <div className="col-xs-4">{station.abrege}</div>
                                                                                        <div className="col-xs-4">{arrivee}</div>
                                                                                        <div className="col-xs-4">{depart}</div>
                                                                                    </div>
                                                                                );
                                                                    }
                                                                )
                            }

                            return result;
                        };

var TotemLigneRoulementCartouche = React.createClass({

    handleClose : function()
    {
        LigneRoulementActions.unselectTrain();
    },

    render : function()
    {
        if(!this.props.train)
        {
            return null;
        }
        else
        {
            var stations = getStationList(this.props.train);

            return  (   <div className="cartouche">
                            <div className="row">
                                <div className="col-xs-3 descriptor">Numéro de train</div>
                                <div className="col-xs-3">{this.props.train.numero}</div>
                                <div className="col-xs-3 descriptor">Numéro de sillon</div>
                                <div className="col-xs-3">{this.props.train.sillon}</div>
                            </div>
                            <div className="row">&nbsp;</div>
                            <div className="row">&nbsp;</div>
                            <div className="row">
                                <div className="col-xs-3 descriptor">Parcours</div>
                                <div className="col-xs-9" id="stations">
                                    {stations}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-sm-offset-8 text-center">
                                    <button className="btn btn-large btn-danger btn-fermer" onClick={this.handleClose}>
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
        }
    }
});


module.exports = TotemLigneRoulementCartouche;