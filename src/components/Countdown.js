import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import variables from '../css/_variables.scss';

//https://www.florin-pop.com/blog/2019/05/countdown-built-with-react/
const Countdown = (props) => {
    const clockItem = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [days, setDays] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [diameter, setDiameter] = useState('');
    
	useEffect(() => {
		const interval = setInterval(() => {
			const { timeTillDate } = props;
		    const then = moment(timeTillDate);
            const now = moment();
            const countdown = moment(then - now);
            
			setDays(then.diff(now, 'days'));
			setHours(countdown.format('HH'));
			setMinutes(countdown.format('mm'));
            setSeconds(countdown.format('ss'));
            const ddiameter = clockItem.current ? clockItem.current.offsetWidth : 0;
            setDiameter(ddiameter);
            setLoaded(true);
        }, 1000);

        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
	}, [props, clockItem])

	const daysRadius = mapNumber(days, 365, 0, 0, 360);
	const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
	const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
	const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);
    
    if(!seconds) {
		return null;
	}
	
	return (
			<div className={loaded ? 'clock row show' : 'clock row'}>
				{days && (
                    <div className='col-6 col-lg-3'>
					<div ref={clockItem} className='countdown-item'>
                        <div className='content'>
						<SVGCircle item={diameter} radius={daysRadius} />
						{days} 
						<span>days</span>
                        </div>
					</div>
                    </div>
				)}
				{hours && (
                    <div className='col-6 col-lg-3'>
					<div className='countdown-item'>
                    <div className='content'>							
						<SVGCircle item={diameter} radius={hoursRadius} />
						{hours} 
						<span>hours</span>
                    </div>
					</div>
                    </div>
				)}
				{minutes && (
                    <div className='col-6 col-lg-3'>
					<div className='countdown-item'>
                    <div className='content'>
						<SVGCircle item={diameter} radius={minutesRadius} />
						{minutes} 
						<span>minutes</span>
                    </div>
					</div>
                    </div>
				)}
				{seconds && (
                    <div className='col-6 col-lg-3'>
					<div className='countdown-item'>
                    <div className='content'>
						<SVGCircle item={diameter} radius={secondsRadius} />
						{seconds} 
						<span>seconds</span>
                    </div>
					</div>
                    </div>
				)}
			</div>
	);
}

const SVGCircle = ({ item, radius }) => {
    //const countdownitem = item;
    const cdidiameter = item / 2
    return (
	<svg className='countdown-svg'>
		<path fill="none" stroke={variables.accentcolor} strokeWidth="4" d={describeArc(cdidiameter, cdidiameter, cdidiameter-2.8, 0, radius)}/>
	</svg>
    )
}

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x + 0.1, end.y
    ].join(" ");

    return d;       
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export default Countdown;