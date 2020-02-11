import React, {useState} from 'react';
import styled from 'styled-components';
import Line from '../panel/line';
import Editor from './editor';

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
    background-color: var(--back-default);
    box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    background-image: ${props => !props.open ? `url(data:image/svg+xml, ${encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M812.12,546.37c106.08,0,192.38-86.3,192.38-192.38s-86.3-192.38-192.38-192.38s-192.38,86.3-192.38,192.38 S706.04,546.37,812.12,546.37z M812.12,236.61c64.72,0,117.38,52.66,117.38,117.38s-52.66,117.38-117.38,117.38 s-117.38-52.66-117.38-117.38S747.39,236.61,812.12,236.61z"/><polygon fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" points="429.01,607.62 596,792.51 687.6,676.48 838.23,827.11 891.26,774.08 681,563.81 592.15,676.35 422.32,488.32  84.93,958.39 967,958.39 967,883.39 231.07,883.39 	"/></g></svg>')})` : ''};
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;    
    display: block;
    bottom: ${props => props.open ? '20px' : '25px'};
    left: ${props => props.open ? '20px' : '25px'};
    transition: all 0.5s;
    transform: translateZ(1.2px);
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

  &:after{
        content: '';
        position: absolute;
        background-image: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M19,6.4L17.6,5L12,10.6L6.4,5L5,6.4l5.6,5.6L5,17.6L6.4,19l5.6-5.6l5.6,5.6l1.4-1.4L13.4,12L19,6.4z"/></svg>')});
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        transform: rotate(45deg);
        display: ${props => props.icon == undefined ? 'block' : 'none'};
    }
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
  position: fixed;
  bottom: ${props => props.selection != -1 ? '95px' : '-200px'};
  opacity: ${props => props.selection != -1 ? '1' : '0'};
  left: 20px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.5s;  
  transform: translateZ(300px);
`;

const Button = styled.div`
  width: calc(50% - 5px);
  height: 35px;
  background-color: var(--color-secundary);
  background-image: ${ props => {
      if(props.type == 'remove') return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="#FFF" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')+')'
      else return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><polygon fill="#FFF" points="0,888.13 0,1120.03 245.54,1120.03 934.43,431.14 695.71,192.42 	"/><path fill="#FFF" d="M1105.42,151.96L973.04,19.58c-25.38-25.38-66.26-26.19-92.63-1.85l-79,72.92c-3.73,3.45-6.9,7.25-9.66,11.26l-41.47,35.94 l231.9,231.9l95.49-95.49l0,0l27.75-27.75C1131.53,220.41,1131.53,178.07,1105.42,151.96z"/></g></svg>')+')'
  }};
  background-repeat: no-repeat;
  background-size: ${ props => props.type == 'remove' ? 'auto 20px' : 'auto 17px'};
  background-position: ${ props => props.type == 'remove' ? '7.5px center' : '9px center'};
  color: white !important;
  float: left;
  margin-right: 10px;
  margin-top: 15px;
  cursor: pointer;
  line-height: 35px;
  padding-left: 35px;
  box-sizing: border-box;  
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
      <Editor mailer={mailer} setMailer={setMailer} />
      {/*children*/}
    </Wrapper>    
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
        <Button type="remove" onClick={() => Remove(mailer.selection.background)}>Remove</Button>
        <Button onClick={() => mailer.open(url => Change(url, 'color'))} style={{marginRight: '0px'}}>Change</Button>
    </Panel>
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
  </>;
}