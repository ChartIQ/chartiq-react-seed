//modules
import { connect } from 'react-redux'

//actions
import { setChartContainer,
        addComparison,
        addStudy,
        removeComparison,
        removeStudy,
        toggleCrosshairs,
        setSpanWithLoader,
        changeContainerSize,
        changeVectorParams,
        changeVectorLineParams,
        changeVectorStyle,
        setPeriodicity,
        setChartType,
        toggleLoader,
        setRefreshInterval,
        setSymbol,
        changingChartData,
        setPeriodicityWithLoader,
        toggleTimezoneModal } from '../actions/chartActions'

import { toggleDrawing } from '../actions/drawActions'

//components
import Chart from '../components/Chart'

const mapStateToProps = (state, props) => {
    return {
        ciq: state.chart.ciq,
        chartType: state.chart.chartType,
        periodicity: state.chart.periodicity,
        isLoadingPeriodicity: state.chart.isLoadingPeriodicity,
        comparisons: state.chart.comparisons,
        service: state.chart.service,
        symbol: state.chart.symbol,
        refreshInterval: state.chart.refreshInterval,
        showCrosshairs: state.chart.showCrosshairs,
        showTimezoneModal: state.chart.showTimezoneModal,
        chartSeries: state.chart.chartSeries
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setChartContainer: (container) => {
            dispatch(setChartContainer(container))
        },
        changeVectorParams: (tool) => {
            dispatch(changeVectorParams(tool))
        },
        changeVectorLineParams: (weight, pattern) => {
            dispatch(changeVectorLineParams(weight, pattern))
        },
        changeVectorStyle: (styleType, style) => {
            dispatch(changeVectorStyle(styleType, style))
        },
        addComparison: (comparison, color) => {
            dispatch(addComparison(comparison, color))
        },
        addStudy: (study) => {
            dispatch(addStudy(study))
        },
        removeComparison: (comparison) => {
            dispatch(removeComparison(comparison))
        },
        removeStudy: (params) => {
            dispatch(removeStudy(params))
        },
        toggleCrosshairs: () => {
            dispatch(toggleCrosshairs())
        },
        toggleTimezoneModal: () => {
            dispatch(toggleTimezoneModal())
        },
        setSymbol: (symbol) => {
            dispatch(setSymbol(symbol))
        },
        toggleDrawingToolbar: () => {
            dispatch(toggleDrawing())
        },
        setPeriodicity: (period, interval) => {
            dispatch(setPeriodicity(period, interval))
        },
        setPeriodicityWithLoader: (periodicity) => {
            dispatch(setPeriodicityWithLoader(periodicity))
        },
        setChartType: (type) => {
            dispatch(setChartType(type))
        },
        setSpanWithLoader: (multiplier, base, interval, period, timeUnit) => {
            dispatch(setSpanWithLoader(multiplier, base, interval, period, timeUnit))
        }
    }
}

const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart)

export default ChartContainer
