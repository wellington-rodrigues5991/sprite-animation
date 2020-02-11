import React,{useRef} from 'react';
import styled from 'styled-components';

const Grid = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: ${props => props.size.w}px;
    height: ${props => props.size.h}px;
    background-image: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400" style="enable-background:new 0 0 400 400; opacity: 0.2" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:'+props.color+';stroke-width: 1px;vector-effect: non-scaling-stroke}</style><line class="st0" x1="0" y1="200" x2="400" y2="200"/><line class="st0" x1="200" y1="0" x2="200" y2="400"/></svg>')}) ;
    background-position: calc(50vw - ${props => props.size.size/2}px) calc(50vh - ${props => props.size.size/2}px);
    background-size: ${props => props.size.size}px;
    
    &:before{
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: ${props => props.size.w}px;
        height: ${props => props.size.h}px;
        background-image: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400" style="enable-background:new 0 0 400 400; opacity: 0.2" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:'+props.color+';stroke-width: 1px;vector-effect: non-scaling-stroke}</style><line class="st0" x1="0" y1="200" x2="400" y2="200"/><line class="st0" x1="200" y1="0" x2="200" y2="400"/></svg>')}) ;
        background-position: calc(50vw - ${props => props.size.size/2}px) calc(50vh - ${props => props.size.size/2}px);
        background-size: ${props => props.size.size}px;
    }
`;

const Guide = styled.div`
    &:before{
        content: '';
        position: absolute;
        top: calc(50vh - 1px);
        left: 0px;
        min-width: 100vw;
        width: ${props => props.size.w}px;
        height: 0px;
        border-top: 2px dotted rgb(53, 138, 235);
    }

    &:after{
        content: '';
        position: absolute;
        top: 0px;
        left: calc(50vw - 1px);
        width: 0px;
        min-height: 100vh;
        height: ${props => props.size.h}px;
        border-left: 2px dotted rgb(53, 138, 235);
    }
`;

export default function GridManager({mailer, setMailer, divisions, gridContainer, children}){
    const resizeMailer = () => {
        let data = Object.assign({}, mailer);
        let res = window.innerWidth;

        if(res < window.innerHeight) res = window.innerHeight;

        if(data.grid == undefined) data.grid = {};
        data.grid.old = data.grid.divisions;
        data.grid.divisions = divisions;
        data.grid.size = res/data.grid.divisions;
        data.grid.w = data.grid.w == undefined ? res : data.grid.w < gridContainer.current.scrollWidth ? gridContainer.current.scrollWidth : data.grid.w;
        data.grid.h = data.grid.h == undefined ? res : (data.grid.h < gridContainer.current.scrollHeight ? gridContainer.current.scrollHeight : data.grid.h);
        setMailer(data);
    }

    if(mailer.grid.size == undefined || mailer.grid.divisions != mailer.grid.old) setTimeout(() => resizeMailer(), 10);
    window.resize = resizeMailer;
    
    return <Grid 
        size={mailer.grid} 
        color={document.documentElement.style.getPropertyValue('--text-color')}
        ref={gridContainer}
    >
        {children}
        <Guide size={mailer.grid} />
    </Grid>;
}

//

window.resize = () => {};
window.addEventListener("resize", () => window.resize());