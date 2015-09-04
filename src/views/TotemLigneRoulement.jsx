/**
  * @jsx React.DOM
  */
var React                       =   require('react/addons');
var CSSTransitionGroup          =   React.addons.CSSTransitionGroup;
var d3                          =   require('d3');
var moment                      =   require('moment');

var LigneRoulementStore         =   require('../stores/LigneRoulementStore.js');
var LigneRoulementActions       =   require('../actions/LigneRoulementActions.js');
var DateConstants               =   require('../constants/DateConstants.js');

var Cartouche                   =   require('./TotemLigneRoulementCartouche.jsx');

var d3parse = d3.time.format(DateConstants.d3Format).parse;

var getLigneRoulementState = function()
{
    return  {   selectedTrain:  LigneRoulementStore.getSelectedTrain(),
                selectedLigne:  LigneRoulementStore.getSelectedLigne()
            };

};

var renderLigne = function(element, trains, selectedTrain)
{

    if(trains && trains.length >0)
    {
        var w = element.clientWidth;

        var vis     =   d3  .select(element)
                            .select(".graph")
                            .append("svg")      .attr   ("class",   "ligneRoulement")
                                                .attr   ("height",  "150px")
                                                .attr   ("width",   w)
                                                .style  ("border",  "1px solid black");

        var xAxis   =   vis     .append ("svg:g")
                                .attr   ("class", "xAxis axis");

        var grid    =   vis     .append("svg:g")
                                .attr("class", "grid");

        var xRange =
                d3      .time
                        .scale()
                        .range([0, w])
                        .domain([DateConstants.dateStart, DateConstants.dateEnd]);

        var axis =
                d3.svg  .axis()
                        .scale(xRange)
                        .ticks(4)
                        .tickSize(10)
                        .tickFormat(d3.time.format("%H:%M"));

        xAxis   .call(axis);

        grid    .call(  d3.svg
                            .axis()
                            .scale(xRange)
                            .ticks(4)
                            .tickSize(150)
                            .tickFormat("")
                );

        renderTrains(vis, trains);
        rescaleLigne(element, selectedTrain);
    }
};

var renderTrains = function(vis, trains)
{
    // Train group, starting
    var train_group = vis
            .selectAll(".train")
            .data(trains)
            .enter()
            .append("svg:g")
            .attr("class", "train")
            .attr("fill-opacity", "1.0")
            .attr("idtrain", function(d,i){ return d.idtrain; });

    // Ajouter le container
    train_group
            .append("rect")
            .attr("class", "dessin background")
            .style("fill", "#000")
            .attr("fill-opacity", "0.0")
            .attr("y", 0)
            .attr("height", 150);


    //  Ajouter le dessin du train
    train_group
            .append("rect")
            .attr("class", "dessin")
            .style("fill", "#000")
            .attr("y", 95)
            .attr("height", 4);

    // Ajouter le numéro de train
    train_group
            .append("text")
            .text(function (d, i) {
                return d.numero;
            })
            .attr("class", "numero")
            .style("fill", "red")
            .attr("y", 58)
            .attr("text-anchor", 'middle');

    // Ajouter la gare de départ
    train_group
            .append("text")
            .text(function (d, i) {
                return d.stations[0].abrege;
            })
            .attr("class", "gare depart")
            .style("fill", "blue")
            .attr("y", 85)
            .attr("text-anchor", 'middle');

    // Ajouter la gare d'arrivée
    train_group
            .append("text")
            .text(function (d, i) {
                return d.stations[d.stations.length - 1].abrege;
            })
            .attr("class", "gare arrivee")
            .style("fill", "blue")
            .attr("y", 73)
            .attr("text-anchor", 'middle');


    // Ajouter l'horaire d'arrivée
    train_group
            .append("text")
            .text(function (d, i) {
                return moment(d.stations[0].depart, DateConstants.dateFormat).format(DateConstants.timeFormat);
            })
            .attr("class", "horaire depart")
            .style("fill", "red")
            .attr("y", 128)
            .attr("text-anchor", 'middle');


    // Ajouter l'horaire d'arrivée
    train_group
            .append("text")
            .text(function (d, i) {
                return moment(d.stations[d.stations.length - 1].arrivee, DateConstants.dateFormat).format(DateConstants.timeFormat);
            })
            .attr("class", "horaire arrivee")
            .style("fill", "red")
            .attr("y", 116)
            .attr("text-anchor", 'middle');

    // Hidden select, to cover all elements
    train_group
            .append("rect")
            .attr("class", "dessin")
            .style("fill", "#000")
            .attr("fill-opacity", "0.0")
            .attr("y", 0)
            .attr("height", 150)
            .on("mouseover", function (d, i) {
                d3.select(this.parentNode).classed("hover", true);
            })
            .on("mouseout", function (d, i) {
                d3.select(this.parentNode).classed("hover", false);
            })
            .on("click", function (d, i) {
                LigneRoulementActions.selectTrain(d.idtrain);
            });
};

var rescaleLigne = function(element, selectedTrain){

    var w = element.clientWidth;

    var vis     =   d3  .select(element)
                        .select(".graph")
                        .select("svg");

    vis .attr   ("width",   w);
    var xAxis   =   vis.select(".xAxis");
    var grid    =   vis.select(".grid");


    var xRange  =
        d3      .time
                .scale()
                .range([0, w])
                .domain([DateConstants.dateStart, DateConstants.dateEnd]);

    var axis    =
            d3.svg  .axis()
                    .scale(xRange)
                    .ticks(4)
                    .tickSize(10)
                    .tickFormat(d3.time.format("%H:%M"));

    xAxis.call(axis);

    grid.call(
            d3.svg
                    .axis()
                    .scale(xRange)
                    .ticks(4)
                    .tickSize(150)
                    .tickFormat("")
            );


    var left = function (d) {
        return xRange(d3parse(d.stations[0].depart));
    };
    var right = function (d) {
        return xRange(d3parse(d.stations[d.stations.length - 1].arrivee));
    };
    var middle = function (d) {
        return (left(d) + right(d)) / 2;
    };
    var width = function (d) {
        return right(d) - left(d);
    };

    // Repaint le dessin
    vis.selectAll(".dessin").attr("x", left)
            .attr("width", width);

    // Repaint le numéro
    vis.selectAll(".numero").attr("x", middle);

    // Repaint les gares
    vis.selectAll(".depart").attr("x", left);
    vis.selectAll(".arrivee").attr("x", right);

    // Repaint selected

    if(selectedTrain)
    {
        vis         .selectAll(".train:not([idtrain='"+selectedTrain.idtrain+"'])")
                    .classed("active", false);

        vis         .select(".train[idtrain='"+selectedTrain.idtrain+"']")
                    .classed("active", true);

    }
    else
    {
        vis         .selectAll(".train")
                    .classed("active", false);
    }
};


var TotemLigneRoulement = React.createClass({

    getInitialState: function ()
    {
        return getLigneRoulementState();
    },

    componentDidMount: function ()
    {
        var el = this.getDOMNode();
        var trains = [];
        if(this.props.ligne && this.props.ligne.trains)
        {
            trains = this.props.ligne.trains;
        }
        // TODO :filter crad
        renderLigne(el, trains.filter(function(t){ return t;}), this.state.selectedTrain);
    },

    componentDidUpdate: function ()
    {
        var el = this.getDOMNode();
        var trains = [];
        if(el && this.props.ligne && this.props.ligne.trains)
        {
            rescaleLigne(el, this.state.selectedTrain);
        }
    },


    componentWillReceiveProps : function(nextProps)
    {
        this.setState(getLigneRoulementState());
    },

    render: function ()
    {
        var ligne = this.props.ligne;

        if(!ligne || !ligne.trains || ligne.trains.length <= 0)
        {
            return null;
        }
        else
        {
            var cartouche = null;

            if (this.props.ligne.numero == this.state.selectedLigne)
            {
                cartouche = <Cartouche key={this.state.selectedTrain.idtrain} train={this.state.selectedTrain} />
            }

            return  (
                        <div>
                            <div className="graph"></div>
                            <CSSTransitionGroup transitionName="cartouche">
                                {cartouche}
                            </CSSTransitionGroup>
                        </div>
                    );

        }


    }

});

module.exports = TotemLigneRoulement;