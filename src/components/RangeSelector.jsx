
const RangeSelector = (props) => {

	return (
		<div>

      <div className="quick-link" key='R0' onClick={props.setSpanWithLoader.bind(this,1,'today')}>1D</div>
      <div className="quick-link" key='R1' onClick={props.setSpanWithLoader.bind(this,5,'day',30,2,'minute')}>5D</div>
      <div className="quick-link" key='R2' onClick={props.setSpanWithLoader.bind(this,1,'month',30,8,'minute')}>1M</div>

      <div className="quick-link hide-sm" key='R3' onClick={props.setSpanWithLoader.bind(this,3,'month')}>3M</div>
      <div className="quick-link hide-sm" key='R4' onClick={props.setSpanWithLoader.bind(this,6,'month')}>6M</div>
      <div className="quick-link hide-sm" key='R5' onClick={props.setSpanWithLoader.bind(this,1,'YTD')}>YTD</div>

      <div className="quick-link" key='R6' onClick={props.setSpanWithLoader.bind(this,1,'year')}>1Y</div>
      <div className="quick-link hide-sm" key='R7' onClick={props.setSpanWithLoader.bind(this,5,'year',1,1,'week')}>5Y</div>
      <div className="quick-link hide-sm" key='R8' onClick={props.setSpanWithLoader.bind(this,1,'all',1,1,'month')}>All</div>

		</div>
	)
}

export default RangeSelector

