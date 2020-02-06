import React, { useState, useRef } from 'react';
import BlockPanel from '../block/manager';
import styled from 'styled-components';
import GridManager from '../grid/manager';
import PlatformManager from '../platform/manager';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: hidden;
    transform: translateZ(1px); 
`;

const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    position:absolute;
    top: 0px;
    left: 0px;
`;

export default function Editor({mailer, setMailer}) {
    const gridContainer = useRef(); 
    const Move = e => {
        const target = mailer.block.movable.active ? mailer.block.movable : mailer.platform.movable;
        
        if(target == undefined || target.elem == null) return;
        const pos = (
            e.type != 'touchmove' ? 
            {x: e.clientX, y: e.clientY} : 
            {x: e.touches[0].clientX, y: e.touches[0].clientY}
        );

        let x = (pos.x - target.event.x);
        let y = (pos.y - target.event.y);

        if(target.type == 'block') {
            target.elem.style.left = x + target.pos.x +'px'
            target.elem.style.top = y + target.pos.y +'px'
        }

        if(target.type == 'platform-size'){
            target.elem.style.width = x + target.size.w +'px'
            target.elem.style.height = y + target.size.h +'px'
        }
        
        if(target.type == 'platform-pos') {
            let gridSize = gridContainer.current.getBoundingClientRect();
            const targetSize = target.elem.getBoundingClientRect();

            
            if(gridContainer.current.getAttribute('data-height') != null && gridContainer.current.getAttribute('data-width') != null){
                gridSize = {};
                gridSize.height = gridContainer.current.getAttribute('data-height');
                gridSize.width = gridContainer.current.getAttribute('data-width');
            }
            else{
                gridContainer.current.setAttribute('data-height', gridSize.height);
                gridContainer.current.setAttribute('data-width', gridSize.width);
            }   
            
            let sx = targetSize.x+target.scroll.x;
            let sy = targetSize.y+target.scroll.y;

            if(sx+x+targetSize.width > parseFloat(gridSize.width)) gridContainer.current.style.width = (sx+x+targetSize.width+150)+'px'
            if(sy+y+targetSize.height+150 > parseFloat(gridSize.height)) gridContainer.current.style.height = (sy+y+targetSize.height+150)+'px'

            target.elem.style.left = x + target.pos.x +'px'
            target.elem.style.top = y + target.pos.y +'px';
            
            gridContainer.current.parentNode.style.overflow = 'hidden'
        }
    }

    const End = e => {
        const target = mailer.block.movable.active ? mailer.block.movable : mailer.platform.movable;
        const elem = target.elem;
        let event = { x: e.clientX, y: e.clientY };
        
        gridContainer.current.parentNode.style.overflow = 'auto';

        if(e.changedTouches != undefined) event = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        if(target.active == false) return;        

        if(target.type == 'block'){
            let pos = elem.getBoundingClientRect();
            let parent = elem.parentNode.parentNode.getBoundingClientRect();

            elem.style.removeProperty('transition');
            elem.style.removeProperty('position');
            elem.style.removeProperty('left');
            elem.style.removeProperty('top');
            elem.style.removeProperty('z-index');
            elem.style.removeProperty('transform');
            
            if(parent.y < event.y) mailer.block.open({key: 'block', id: target.id}) //open panel
            else mailer.platform.add(gridContainer.current.parentNode.scrollLeft+pos.x, gridContainer.current.parentNode.scrollTop+pos.y, target.id);
            
            mailer.block.update();
        }
        if(target.type == 'platform-pos' || target.type == 'platform-size'){
            const props = elem.getBoundingClientRect();    
            const data = Object.assign({}, mailer);

            gridContainer.current.removeAttribute('data-height');
            gridContainer.current.removeAttribute('data-width');

            data.grid.w = parseFloat(gridContainer.current.style.width);
            data.grid.h = parseFloat(gridContainer.current.style.height);

            if(JSON.stringify(mailer.platform.movable.event) == JSON.stringify(event)){
                mailer.block.open({key: 'platform', id: mailer.platform.movable.id}, event)
            }

            mailer.platform.update(
                mailer.platform.movable.id,
                parseFloat(elem.style.left),
                parseFloat(elem.style.top),
                parseFloat(elem.style.width.length == 0 ? elem.getBoundingClientRect().width : elem.style.width),
                parseFloat(elem.style.height.length == 0 ? elem.getBoundingClientRect().height : elem.style.height)
            )

            elem.style.removeProperty('left');
            elem.style.removeProperty('top');
            elem.style.removeProperty('width');
            elem.style.removeProperty('height');
        
            setMailer(data);
        }
    };

    return <Wrapper onMouseMove={Move} onTouchMove={Move} onMouseUp={End} onTouchEnd={End}>
        <Container>
            <GridManager divisions={mailer.grid.divisions == undefined ? 20 : mailer.grid.divisions} mailer={mailer} setMailer={setMailer} gridContainer={gridContainer}>
                <PlatformManager mailer={mailer} setMailer={setMailer} />
            </GridManager>
        </Container>
        <BlockPanel mailer={mailer} setMailer={setMailer} />
    </Wrapper>;
}