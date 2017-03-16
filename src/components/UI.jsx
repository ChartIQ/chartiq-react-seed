import configs from "../../configs/ui.js";
import TimeZone from "./TimezoneModal";
import ThemeModal from "./ThemeModal";
import StudyModal from "./StudyModal";
import { Actions } from "../stores/ChartStore";
var UI = React.createClass({
    getInitialState: function () {
        return {
            ciq: null
        }
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
	            showLoader: nextProps.showLoader,
	            hideLoader: nextProps.hideLoader
            });
        }
    },
    render: function () {
        return (
            <ciq-UI-Wrapper>
                <nav className="ciq-nav">
                    <div className="left">
                        <ChartSymbol showLoader={this.props.showLoader.bind(this)} hideLoader={this.props.hideLoader.bind(this)} ciq={this.state.ciq} />
                        <Comparison ciq={this.state.ciq} />
                    </div>
                    <div className="right">
                        <Periodicity showLoader={this.props.showLoader.bind(this)} hideLoader={this.props.hideLoader.bind(this)} ciq={this.state.ciq} />
                        <ChartTypes ciq={this.state.ciq} />
                        <StudyUI ciq={this.state.ciq} />
                        <ThemeUI ciq={this.state.ciq} />
                        <Crosshairs ciq={this.state.ciq} />
                        <TimeZoneButton ciq={this.state.ciq} />
                    </div>
                </nav>
            </ciq-UI-Wrapper>
        )
    }
});

var OverlayMenu = React.createClass({
	getInitialState: function() {
		return {
			open: false,
			params:{},
			top:'',
			left:''
		}
	},
	open(params){
		this.setState({
			open: true,
			params:params,
			top:params.stx.cy+'px',
			left:params.stx.cx+'px'
		});
	},
	close(){
		this.setState({
			open: false
		});
	},
	clickHandler: function(event) {
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(event, this.state.params);
		}
	},
	render: function(){
		if (!this.state.open) return <span></span>;
		var self=this;
		return (
			<span className="overlayMenu" style={{top:self.state.top, left:self.state.left}}>
	            <div className="edit" onClick={ function() {
		            self.clickHandler('edit');
	            }}>Edit settings...</div>
				<div className="delete" onClick={ function() {
					self.clickHandler('delete');
				}}>Delete study</div>
            </span>
		);
	}
});

var StudyUI = React.createClass({
    getInitialState: function () {
        return {
            ciq: null
        }
    },
    addStudy(study) {
    	var studyLookup = {};
		for(var libraryEntry in CIQ.Studies.studyLibrary){
            studyLookup[CIQ.Studies.studyLibrary[libraryEntry].name]=libraryEntry;
		}
        CIQ.Studies.addStudy(this.state.ciq, studyLookup[study]);
    },
	removeStudy(params){
    	CIQ.Studies.removeStudy(params.stx, params.sd);
	},
    getStudyList() {
        var studies = [];
        for(var study in CIQ.Studies.studyLibrary){
        	if(CIQ.Studies.studyLibrary.hasOwnProperty(study)) {
		        studies.push(CIQ.Studies.studyLibrary[study].name);
	        }
        }
        return studies.sort();
    },
    openModal(params) {
        this.refs.studyModal.open(params);
    },
	openDialog(params){
		this.refs.overlayMenu.open(params);
	},
    componentWillReceiveProps(nextProps) {
        var self = this;
        if (nextProps.ciq) {
            function closure(fc) {
                return function () {
                    fc.apply(self, arguments);
                };
            }
            nextProps.ciq.callbacks.studyOverlayEdit = closure(self.openDialog);
            nextProps.ciq.callbacks.studyPanelEdit = closure(self.openModal);
            this.setState({
                ciq: nextProps.ciq
            });
        }
    },
	clickHandler: function(event, params) {
		if(event==='edit'){
			this.openModal(params);
		}
		else if(event==='delete'){
			this.removeStudy(params);
		}
		this.refs.overlayMenu.close();
	},
    render: function () {
        var self = this;
        var studies = this.getStudyList().map(function (study, index) {
            return <menu-option key={"study" + index} onClick={function () {
                self.addStudy(study);
            }}><span>{study}</span></menu-option>

        });
        return (
            <span>
	            <OverlayMenu ref="overlayMenu" onClick={this.clickHandler} />
                <StudyModal ref="studyModal" />
                <menu-select id="studySelect">
                    <span className="title">Studies</span>
                    <menu-select-options className="ps-container">
                        {studies}
                    </menu-select-options>
                </menu-select>
            </span>
        );
    }
});

var TimeZoneButton = React.createClass({
    getInitialState: function () {
        return {
            ciq: null
        }
    },
    onClick() {
        this.refs.modal.toggle();

    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    render: function () {
        var self = this;
        return (
            <span><TimeZone ref="modal" ciq={this.state.ciq} /><button className="timezone-btn" onClick={this.onClick}></button></span>
        )
    }
});

var ChartSymbol = React.createClass({
    getInitialState: function () {
        return {
            ciq: null,
            symbol: "AAPL"
        }
    },
    onOptionClick() {
        if (!this.state.ciq || !this.state.symbol) return;
        this.props.showLoader();
        this.state.ciq.newChart(this.state.symbol);
        this.setState({
            symbol: null
        });
        this.refs["symbolInput"].value="";
        var that=this;
	    window.setTimeout(function() {
		    that.props.hideLoader();
	    }, 1000);
    },
    onChange(event) {
        this.setState({
            symbol: event.target.value
        })
    },
	handleKeyPress(key){
		if(key == 'Enter'){
			this.onOptionClick();
		}
	},
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
	            showLoader: nextProps.showLoader,
	            hideLoader: nextProps.hideLoader
            });
        }
    },
    render: function () {
        var self = this;
        return (

            <span className="symbol-frame">
	            <input ref="symbolInput" id="symbolInput" type="text" placeholder="Enter Symbol"
	            onChange={function (event) {
		            self.onChange(event.nativeEvent);
	            }}
	            onKeyPress={function(event){ self.handleKeyPress(event.key); }}></input><div className="symbol-btn" onClick={this.onOptionClick}></div>
            </span>


        )
    }
});

var Periodicity = React.createClass({
    getInitialState: function () {
        return {
            ciq: null,
            activeOption: null
        }
    },
    onOptionClick(period, interval, index) {
        if (!this.state.ciq) return;
	    this.props.showLoader();
        this.state.ciq.setPeriodicityV2(period, interval);
        this.setState({
            activeOption: configs.periodicity.options[index]
        });
	    var that=this;
	    window.setTimeout(function() {
		    that.props.hideLoader();
	    }, 1000);
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
                activeOption: this.getCurrentOption(nextProps.ciq.layout),
	            showLoader: nextProps.showLoader,
	            hideLoader: nextProps.hideLoader
            });
        }
    },
    getCurrentOption(layout) {
        for (var i = 0; i < configs.periodicity.options.length; i++) {
            var option = configs.periodicity.options[i];
            if (layout.interval === option.interval && layout.period === option.periodicity) {
                return option;
            }
        }
    },
    render: function () {
        var self = this;

        var options = configs.periodicity.options.map(function (item, index) {
            return <menu-option key={"period" + index} className="option" onClick={function () {
                self.onOptionClick(item.period, item.interval, index);
            }}>{item.label}</menu-option>
        });

        return (
            <span>
                <menu-select id="periodicitySelect">
                    <span className="title">{this.state.activeOption ? this.state.activeOption.label : null}</span>
                    <menu-select-options className="menu-hover">
                        {options}
                    </menu-select-options>
                </menu-select>
            </span>
        )
    }
});

var ChartTypes = React.createClass({
    getInitialState: function () {
        return {
            ciq: null,
            activeOption: null
        };
    },
    onOptionClick(type, index) {
        if (!this.state.ciq) return;
        if ((type.aggregationEdit && this.state.ciq.layout.aggregationType != type.type) || type.type == 'heikinashi') {
            this.state.ciq.setChartType('candle');
            this.state.ciq.setAggregationType(type.type);
        } else {
	        this.state.ciq.setAggregationType(null);
            this.state.ciq.setChartType(type.type);
        }
        this.setState({
            activeOption: configs.chartTypes.types[index]
        });
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
                activeOption: this.getCurrentOption(nextProps.ciq.layout)
            });
        }
    },
    getCurrentOption(layout) {
        for (var i = 0; i < configs.chartTypes.types.length; i++) {
            var option = configs.chartTypes.types[i];
            if (layout.chartType === option.type) {
                return option;
            }
        }
        return configs.chartTypes.types[0];
    },
    render: function () {
        var self = this;
        var options = configs.chartTypes.types.map(function (item, index) {
            return <menu-option key={"type" + index} className="option" onClick={function () {
                self.onOptionClick(item, index);
            }}>{item.label}</menu-option>
        });

        return (

            <menu-select id="chartTypeSelect">
                <span className="title">{this.state.activeOption ? this.state.activeOption.label : this.state.activeOption}</span>
                <menu-select-options className="menu-hover">
                    {options}
                </menu-select-options>
            </menu-select>


        )
    }
});
var Comparison = React.createClass({
    getInitialState: function () {
        return {
            ciq: null,
            symbol: null
        }
    },
    compareChange(event) {
        this.setState({
            symbol: event.target.value
        })
    },
    onOptionClick() {
        if (!this.state.ciq) return;
	    if(!this.state.ciq.callbacks.symbolChange) this.state.ciq.callbacks.symbolChange=this.updateComparisonSeries;
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        var newSeries = this.state.ciq.addSeries(this.state.symbol, {
            isComparison: true,
            color: getRandomColor(),
            data: {
                useDefaultQuoteFeed: true
            }
        });
        this.setState({
            symbol: null
        });
        this.refs["compareInput"].value = "";
        Actions.addComparisonSeries(newSeries);
    },
	handleKeyPress(key){
		if(key == 'Enter'){
			this.onOptionClick();
		}
	},
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
	updateComparisonSeries(){
		console.log('here!');
		console.log(arguments);
		if(arguments[0].action=='remove-series'){
			Actions.removeComparisonSeries(arguments[0].stx.chart.series[arguments[0].symbol]);
			this.state.ciq.removeSeries(arguments[0].symbol, this.state.ciq.chart);
		}
	},
    render: function () {
        var self = this;
        return (
            <span className="symbol-frame">
	            <input ref="compareInput" onChange={function (event) {
		            self.compareChange(event.nativeEvent);
	            }}
	            onKeyPress={function(event){ self.handleKeyPress(event.key); }} id="symbolCompareInput" placeholder="Add Comparison" type="text" >
                </input>
                <div className="comparison-btn" onClick={this.onOptionClick} ></div>
            </span>
        );
    }
});


var Crosshairs = React.createClass({
    getInitialState: function () {
        return {
            ciq: null
        }
    },
    onClick() {
        if (!this.state.ciq) return;
        this.state.ciq.layout.crosshair = !this.state.ciq.layout.crosshair;
        this.forceUpdate();

    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    render: function () {
        var cName = "crosshair-btn ";
        cName += this.state.ciq ? (this.state.ciq.layout.crosshair ? "active" : "") : "";
        return (
            <span> <button className={cName} onClick={this.onClick}></button></span>
        );
    }
});

var ThemeUI = React.createClass({
    getInitialState: function () {
        return {
            themeList: [{
                "name": "Default",
                "settings": // the default theme settings
                {
                    "chart": {
                        "Axis Text": { "color": "rgba(197,199,201,1)" },
                        "Background": { "color": "rgba(28,42,53,1)" },
                        "Grid Dividers": { "color": "rgba(37,55,70,1)" },
                        "Grid Lines": { "color": "rgba(33,50,63,1)" }
                    },
                    "chartTypes": {
                        "Candle/Bar": {
                            "down": { "border": "rgba(227,70,33,1)", "color": "rgba(184,44,12,1)", "wick": "rgba(0,0,0,1)" },
                            "up": { "border": "rgba(184,222,168,1)", "color": "rgba(140,193,118,1)", "wick": "rgba(0,0,0,1)" }
                        },
                        "Line": { "color": "rgba(0,0,0,1)" },
                        "Mountain": { "color": "rgba(102,202,196,0.498039)" }
                    }
                }
            },{
                "name": "+ New Theme"
            }],
            themeHelper: null
        };
    },
    setThemeHelper(ciq) {
        if (!ciq) return;
        var themeHelper = new CIQ.ThemeHelper({
            'stx': ciq
        });
        this.setState({
            ciq: ciq,
            themeHelper: themeHelper,
        });
    },
    themeSelect(theme) {
        if (theme.name === "+ New Theme") {
            return this.openThemeModal();
        }
        this.updateTheme(theme.settings);
    },
    openThemeModal() {
        this.refs.themeModal.openDialog(this.addTheme);
    },
    addTheme(theme, themeName) {
    	var item={
		    name: themeName,
		    settings: theme
	    };
	    this.state.themeList.splice((this.state.themeList.length-1), 0, item);
        this.setState({
            themeList: this.state.themeList
        });
        this.updateTheme(theme);
    },
    updateTheme(theme) {
        var c = CIQ.clone(theme);
        this.state.themeHelper.settings = c;
        this.state.themeHelper.update();
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            this.setThemeHelper(nextProps.ciq);
        }

    },
    render: function () {
        var self = this;
        var options = this.state.themeList.map(function (theme, index) {
            return (<menu-option key={"theme" + index} className="option" onClick={function () {
                self.themeSelect(theme)
            }} >{theme.name}</menu-option>);
        });
        return (
            <span>
                <ThemeModal ref="themeModal" themeHelper={this.state.themeHelper ? this.state.themeHelper : null} />
                <menu-select id="themeSelect">
                    <span className="title">Select Theme</span>
                    <menu-select-options>
                        {options}
                    </menu-select-options>
                </menu-select>
            </span>
        );
    }
});


module.exports = UI;
