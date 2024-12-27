import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { debounce } from 'lodash';
import { ThemeContext } from './ThemeContext';

const StyledSlider = styled.input.attrs(props => ({
  type: 'range',
  min: 500,  
  max: 1500  
}))`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  outline: none;
  transition: background 0.3s;
  background: linear-gradient(to right, #00cec9 0%, #00cec9 ${props => (props.value - 500) / 1000 * 100}%, #dfe6e9 ${props => (props.value - 500) / 1000 * 100}%);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid #b2ebf2;
    box-shadow: 0 0 2px #000;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid #b2ebf2;
    box-shadow: 0 0 2px #000;
  }
`;

const Threatpanel = ({ handleSpeedChange, isSidebarOpen, toggleSidebar, activeAttacks = [] }) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const minSpeed = 500;
  const maxSpeed = 1500;
  const [attackSpeed, setAttackSpeed] = useState(minSpeed + (maxSpeed - minSpeed) / 2);
  const [isChartEnlarged, setIsChartEnlarged] = useState(false);

    const debouncedHandleSpeedChange = useMemo(() =>
        debounce((newSpeed) => {
            handleSpeedChange(newSpeed);
        }, 500),
    [handleSpeedChange]);
 
    useEffect(() => {
        return () => {
            debouncedHandleSpeedChange.cancel();
        };
    }, [debouncedHandleSpeedChange]);
 
    const handleSpeedInput = useCallback((event) => {
      const newSpeed = Number(event.target.value);
      setAttackSpeed(newSpeed);
      debouncedHandleSpeedChange(newSpeed);
  }, [debouncedHandleSpeedChange]);

  useEffect(() => {
    fetch('/data.json')
        .then(response => response.json())
        .then(fetchedData => {
            const parsedData = fetchedData.map(d => ({
                date: new Date(d.date),
                value: d.value
            }));
            setData(parsedData);
        })
        .catch(error => console.error('Error fetching data:', error));
}, []);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/daily_threats/');

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.daily_threat_data) {
                const parsedData = message.daily_threat_data.map(d => ({
                    date: new Date(d.date),
                    value: d.TotalAttacks
                }));
                setData(parsedData);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const margin = { top: 20, right: 30, bottom: 30, left: 50 },
            width = isChartEnlarged ? window.innerWidth * 0.8 - margin.left - margin.right : 230 - margin.left - margin.right,
            height = isChartEnlarged ? window.innerHeight * 0.6 - margin.top - margin.bottom : 150 - margin.top - margin.bottom;

        d3.select("#chart svg").remove();

        const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`); 

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        const area = d3.area()
            .x(d => x(d.date))
            .y0(height)
            .y1(d => y(d.value));

        svg.append("path")
            .datum(data)
            .attr("fill", "#3478f6")
            .attr("d", area);

            svg.append("g")
            .attr("transform", `translate(0,${height})`) 
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b %d")));
        

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".2s")));
    }, [data, isChartEnlarged]);

    return (
        <div id="leftSidebar" className={theme}>
            <h2>THREAT DATA</h2>
            <b>RECENT DAILY ATTACKS</b>
            <div id="chart" style={{cursor: 'pointer'}} onClick={() => setIsChartEnlarged(!isChartEnlarged)}
                title={isChartEnlarged ? "Click to Minimize" : "Click to Enlarge"}>
            </div>
            <ul id="threatList">
                <li>
                <b>ATTACK SPEED</b>
                        <div className="speed-controls">
                            <StyledSlider value={attackSpeed} onChange={handleSpeedInput} />
                            <span>{attackSpeed} ms</span>
                        </div>
                    </li>
                    <li>
                    <b>ACTIVE ATTACKS</b>
                    <ul id="activeAttacksList">
                        {activeAttacks.map((attack, index) => (
                            <li key={index}>
                                {attack.sourceName} to {attack.destinationName} ({attack.threatType})
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Threatpanel;