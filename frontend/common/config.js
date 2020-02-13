import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Input from './data/input.js';

const Wrapper = styled.div`
	width: ${props => props.open ? '30px' : '100%'};
	height: ${props => props.open ? '30px' : '100%'};
	top: ${props => props.open ? '5px' : '0px'};
	right: ${props => props.open ? '5px' : '0px'};
    overflow-x: hidden;
	overflow-y: ${props => props.open ? 'hidden' : 'auto'};
	position: fixed;
	transition: all 0.5s;
    transition-delay: ${props => !props.open ? '0s' : '0.5s'};
	
	&:before{
		content: '';
		position: absolute;
		right: 0px;
		width: 30px;
		height:30px;
        background: url(data:image/svg+xml, ${props => encodeURIComponent(`<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 542.01 542.01" style="enable-background:new 0 0 542.01 542.01;" xml:space="preserve"><path fill="${document.documentElement.style.getPropertyValue('--text-color')}" d="M541.6,270.65c0,7.83-0.17,15.67,0.07,23.5c0.14,4.51-1.57,6.68-6.07,7.38c-15.3,2.36-30.54,5.15-45.87,7.36	c-10.42,1.5-16.79,6.63-19.45,17.11c-4.16,16.36-10.59,31.94-19.29,46.42c-5.67,9.45-4.71,17.65,1.77,26.26	c9.22,12.24,17.76,24.99,26.79,37.36c2.65,3.62,2.71,6.21-0.64,9.46c-11.34,11.04-22.56,22.22-33.57,33.59	c-3.31,3.42-5.82,3.19-9.4,0.57c-12.64-9.24-25.59-18.06-38.17-27.39c-8.03-5.96-15.78-6.75-24.53-1.59	c-15.42,9.1-31.91,15.72-49.22,20.32c-8.18,2.17-13.11,7.37-14.49,15.94c-2.55,15.78-5.34,31.52-7.94,47.29	c-1.13,6.88-1.51,7.34-8.6,7.34c-15.17,0.01-30.33-0.14-45.5,0.09c-4.72,0.07-6.96-1.46-7.68-6.23c-2.31-15.31-5.1-30.55-7.35-45.87	c-1.5-10.22-6.58-16.48-16.85-19.11c-15.7-4.02-30.7-10.08-44.7-18.27c-9.71-5.68-18.21-5.1-27.19,1.77	c-12.16,9.31-24.98,17.76-37.33,26.83c-3.89,2.86-6.47,2.55-9.8-0.89c-10.77-11.14-21.7-22.13-32.86-32.88	c-3.73-3.59-3.59-6.24-0.66-10.2c9.2-12.46,17.88-25.31,27.1-37.76c5.98-8.07,6.45-15.87,1.33-24.54	c-8.93-15.12-15.71-31.2-20.23-48.19c-2.4-9.01-8.08-14.05-17.41-15.51c-15.79-2.46-31.51-5.43-47.3-7.91	c-4.57-0.72-6.65-2.4-6.57-7.35c0.25-15.66,0.22-31.33,0.01-46.99c-0.06-4.56,1.54-6.62,6.05-7.32c15.14-2.35,30.2-5.23,45.36-7.38	c10.46-1.48,16.87-6.49,19.5-16.99c4.03-16.04,9.96-31.47,18.49-45.67c6.07-10.1,5.16-18.78-1.95-28	c-9.25-12-17.6-24.69-26.55-36.92c-2.67-3.64-2.63-6.21,0.69-9.44c11.23-10.92,22.36-21.95,33.24-33.21	c3.35-3.46,5.83-3.76,9.72-0.9c12.74,9.38,25.82,18.32,38.57,27.68c7.76,5.69,15.4,6.21,23.68,1.32	c15.13-8.93,31.15-15.82,48.15-20.3c9.46-2.49,14.67-8.34,16.17-18.03c2.31-14.97,5.04-29.88,7.48-44.84	c1.37-8.37,1.36-8.47,9.63-8.47c15,0,30,0.15,45-0.08c4.89-0.07,6.67,1.89,7.38,6.54c2.48,16.13,5.33,32.2,8.03,48.29	c1.28,7.61,5.46,12.92,12.94,14.93c19.24,5.19,37.44,12.78,54.81,22.5c7.29,4.08,14.07,2.54,20.54-2.15	c12.95-9.38,26.05-18.56,38.88-28.11c4.06-3.02,6.67-2.72,10.16,0.91c10.75,11.16,21.73,22.1,32.87,32.88	c3.52,3.41,3.48,6.05,0.69,9.85c-8.97,12.22-17.37,24.86-26.54,36.93c-6.67,8.78-7.51,17.07-1.73,26.68	c8.89,14.76,15.12,30.74,19.52,47.4c2.33,8.82,7.7,13.95,16.89,15.38c15.63,2.43,31.2,5.23,46.81,7.8c6.54,1.07,7.09,1.59,7.1,8.32	C541.61,255.65,541.6,263.15,541.6,270.65z M377.65,270.57c-0.31-59.16-48.7-107.39-107.16-106.81	c-59.42,0.59-107.29,48.73-106.65,107.26c0.65,59.37,48.01,106.58,106.9,106.55C329.7,377.55,377.96,329.25,377.65,270.57z"/></svg>`)});
		background-size: auto 20px;
        background-position: center;
        background-repeat: no-repeat;
        top: ${props => props.open ? '0px' : '-100px'};
		opacity: ${props => props.open ? '1' : '0'};
	    transition: all 0.5s;
	}
`;

const Content = styled.div`
	width: 100%;
    box-sizing: border-box;
	min-height: 70vh;
    margin-top: ${props => props.open ? '30vh': '150vh'};
	background: var(--color-base);
    border-top: 1px solid var(--border-color);
    padding: 20px;
    transition: all 0.5s;
    transition-delay: ${props => !props.open ? '0s' : '0.5s'};
`;

const Line = styled.div`
	width: 100%;
	padding: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;
`;

const Title = styled.div`
	width: 120px;
`;

const Value = styled.div`
	width: calc(100% - 130px);
	margin-left: 10px;
`;

const Button = styled.div`
    padding-right: 40px;
    padding-left: 10px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    margin-top: -5px;
    transform: translateY(-10px);
    float: right;
    background: none;
    box-shadow: 0px 0px 0px 1px var(--text-color);
    position: relative;

    &:after{
        content: '';
        position: absolute;
        right: 10px;
        top: calc(50% - 1px);
        width: 20px;
        height: 2px;
        transform: rotate(90deg);
        background: var(--text-color);
    }

    &:before{
        content: '';
        position: absolute;
        right: 10px;
        top: calc(50% - 1px);
        width: 20px;
        height: 2px;
        background: var(--text-color);
    }
`;

const Close = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    top: ${props => props.open ? '0px' : '15px'};
    right: ${props => props.open ? '0px' : '15px'};
    background: transparent;
    border: 2px solid var(--text-color);
    opacity: ${props => props.open ? '0' : '1'};

    &:after{
        content: '';
        position: absolute;
        left: 10px;
        top: calc(50% - 1px);
        width: 30px;
        height: 2px;
        transform: rotate(-45deg);
        background: var(--text-color);
        opacity: ${props => props.open ? '0' : '1'};
    }

    &:before{
        content: '';
        position: absolute;
        left: 10px;
        top: calc(50% - 1px);
        width: 30px;
        height: 2px;
        transform: rotate(45deg);
        background: var(--text-color);
        opacity: ${props => props.open ? '0' : '1'};
    }
`;

export default function Config({data, setData}){
	const [open, setOpen] = useState(true);   
    const [select, setSelect] = useState(-1);
	const [animations, setAnimations] = useState(Object.keys(data.animations))

    if(data.open < 3 || data.open == undefined){
        data.open = data.open == undefined ? 0 : data.open+1;
        if(data.open == 2 && Object.keys(data.animations).length == 0) setOpen(false);
    }

	const Add = () => {
		const d = animations.slice();
		
		d.push("");
		setAnimations(d);
	}
	
	const Edit = (val, old) => {
		const d = animations.slice();
		const id = d.indexOf(old);
		
		if(id > -1){
            const t = Object.assign({}, data);
            const novo = {};
            d[id]= val;

            for(let i = 0; i < animations.length; i++){
                let temp = Object.assign({}, data.animations[animations[i]]);
                if(d[i] != "")  novo[d[i]] = Object.keys(temp).length == 0 ? {frames: [], fps: 10} : temp;
            }

            t.animations = novo;
            
            setAnimations(d);
            setData(t);
		}        
	};
	
	const Remove = id => {
		const t = [];
		const d = Object.assign({}, data);
        const novo = {};

        for(let i = 0; i < animations.length; i++){
            let temp = Object.assign({}, data.animations[animations[i]]);
            
            if(animations[i] != "" && id != i) {
                novo[animations[i]] = temp == undefined ? {frames: [], fps: 10} : temp;
                t.push(animations[i])
            }
        }
        
        d.animations = novo;

        setSelect(-1);
		setAnimations(t);
        setData(d);
	};
	
	return <>
		<Wrapper open={open}>
			<Content open={!open}>
				<h1>Animations Settings</h1>
				<p>blablabla</p>
				<Line style={{paddingBottom: '20px', display: 'flex', marginTop: '30px', marginBottom: '30px'}}>
						<Title><h3>Frame Size</h3></Title>
						<Value>
							<Input label="Width" type="number" select={false} setSelect={() => setSelect(-1)} text={data.frame.width} />
							<Input label="Height" type="number" select={false} setSelect={() => setSelect(-1)} text={data.frame.height} />
							<Input label="Padding" type="number" select={false} setSelect={() => setSelect(-1)} text={data.frame.padding} />
						</Value>
				</Line>
				<Line>
					<Button onClick={Add}>Add animation</Button>
					<h3>Animatons</h3>
				</Line>
				{animations.map((value, i) => <Line key={i}>
					<Input                         
						label="Animation Name"
						text={value}
						onchange={e => Edit(e.target.value, value)}
						remove={() => Remove(i)}
                        select={select == i ? true : false}
                        setSelect={props => props ? setSelect(i) : setSelect(-1)}
					/>
				</Line>
				)}
			</Content>
            <Close onClick={() => setOpen(!open)} open={open} />
		</Wrapper>
	</>;
}