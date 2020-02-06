import React, {useState} from 'react';
import styled from 'styled-components';
import Line from '../panel/line';

const Wrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    transform: ${props => props.open ? 'rotateY(30deg) skewY(-15deg) translateZ(150px) scale(0.4) translateY(-150px)' : ''};
    transform-style: preserve-3d;
    transition: all 0.5s;
`;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-position: center !important;
    background: url(${props => props.color});
    transform: translateZ(${props => props.depth * -300}px);
    position: absolute;
    top: 0px;
    left: 0px;
`;

const Bar = styled.div`
    width: ${props => props.open ? 'calc(100% - 85px)' : '60px'};
    height: ${props => props.open ? '70px' : '60px'};
    background: var(--back-default);
    box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    position: fixed;
    bottom: ${props => props.open ? '20px' : '25px'};
    left: ${props => props.open ? '20px' : '25px'};
    transition: all 0.5s;
    overflow: hidden;
`;

const Close = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: 0px 0px 0px 40px var(--text-color) inset;
  position: fixed;
  bottom: 27px;
  right: ${props => props.open ? '10px' : '-80px'};
  transition: all 0.5s;
  transform: rotate(45deg) scale(0.7);
  cursor: pointer;

  &:before{
    content: '';
    position: absolute;
    left: calc(50% - 2px);
    top: calc(50% - 10px);
    width: 4px;
    height: 20px;
    background: var(--color-default)
  }

  &:after{
    content: '';
    position: absolute;
    top: calc(50% - 2px);
    left: calc(50% - 10px);
    height: 4px;
    width: 20px;
    background: var(--color-default)
  }
`;

const Add = styled.div`
  position: absolute;
  top: 0px;
  right: ${props => props.open ? '0px' : '-60px'};
  width: 50px;
  height: 70px;
  background: var(--back-default);
  box-shadow: 0px 0px 0px 1px var(--border-color) inset;
  transition: all 0.5s;
`;

const Content = styled.div`
  position: absolute;
  width: calc(100% - 50px);
  right: ${props => !props.open ? '60px' : '50px'};
  height: 100%;
  overflow: auto;
  transition: all 0.5s;
`;

const Inner = styled.div`
  position: absolute;
  min-width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-left: 10px;
  box-sizing: border-box;
  width: ${props => props.size * 60}px;
`;

const Block = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-right: 10px;
  position: relative;
  ${props => props.i == props.selection ? 'box-shadow: 0px 0px 0px 4px var(--color-secundary);' : ''}
`;

const Panel = styled.div`
  width: ${props => window.innerWidth < 450 ? 'calc(100% - 40px)' : '250px'};
  position: absolute;
  bottom: ${props => props.selection != -1 ? '95px' : '-200px'};
  opacity: ${props => props.selection != -1 ? '1' : '0'};
  left: 20px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.5s;  
`;

const Button = styled.div`
  width: calc(50% - 5px);
  height: 35px;
  background: var(--color-secundary);
  color: white;
  float: left;
  margin-right: 10px;
  margin-top: 15px;
  cursor: pointer;
`;

export default function BackgroundManager({mailer, setMailer, children}) {
  const Open = v => {
    if(v == mailer.background.status) return;
    const data = Object.assign({}, mailer);

    data.background.status = v;
    if(v == false) data.selection.background = -1;
    setMailer(data)
  }

  const add = () => {
      mailer.open(url => {
          const data = Object.assign({}, mailer);

        data.background.data.push({
            color: url,
            depth: Math.random()
        });
        if(data.background.data.length == 1) data.selection.background = 0;
        setMailer(data)
      })
  }

  const Clean = () => {      
    const data = Object.assign({}, mailer);

    data.selection.background = -1;
    setMailer(data);
  }

  const Select = e => {
      Clean();  
      const data = Object.assign({}, mailer);
      
      data.selection.background = e;
      setMailer(data);
  }

  const Change = (value, key) => {   
    const data = Object.assign({}, mailer);

    data.background.data[data.selection.background][key] = value;
    setMailer(data);
  }

  const Update = (value) => {   
    const data = Object.assign({}, mailer);

    document.getElementById("backgrounds").children[data.selection.background].style.transform = 'translateZ('+(value * -300)+'px)';
  }

  const Remove = id => {   
    const data = Object.assign({}, mailer);
    let arr = data.background.data.filter((value, i) => {
        if(i !== id) return value;
    });

    data.background.data = arr;
    data.selection.background = -1;
    setMailer(data);
  }

  let status = mailer.background.status;

  return <>
    <Close open={status} onClick={() => Open(false)} />
    <Wrapper open={status} id="backgrounds">
      {mailer.background.data.map((v, i) => <Background key={i} color={v.color} depth={v.depth} />)}
      {children}
    </Wrapper>    
    <Bar open={status} onClick={() => Open(true)}>
      <Content open={status}>
          <Inner size={mailer.background.data.length}>
              {mailer.background.data.map((v, i) => <Block key={i} i={i} selection={mailer.selection.background} >
                    <Background onClick={() => Select(i)} color={v.color} depth={0} />
                </Block>)}
            </Inner>
      </Content>
      <Add open={status} onClick={add} />
    </Bar>
    <Panel selection={mailer.selection.background}>
        <Line 
            title="Depth" 
            type="number" 
            opt={{min: 0, max: 1, step: 0.01}} 
            value={mailer.selection.background >= 0 ? mailer.background.data[mailer.selection.background].depth : 0} 
            change={Update}
            blur={e => Change(e, 'depth')} 
            wrap={true}
        />
        <Button onClick={() => Remove(mailer.selection.background)} />
        <Button onClick={() => mailer.open(url => Change(url, 'color'))} style={{marginRight: '0px'}} />
    </Panel>
  </>;
}