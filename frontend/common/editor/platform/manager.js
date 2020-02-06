import React, { useState } from 'react';
import Platform from './platform';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

export default function PlatformManager({mailer, setMailer}){
    const [movablePlatform, setMovablePlatform] = useState(mailer.platform.movable);

    const Add = (x, y, block) => {
        const data = Object.assign({}, movablePlatform);
        const grid = mailer.grid.size;

        x = x - (window.innerWidth/2);
        y = y - (window.innerHeight/2);

        data.platform.push({x: x/grid, y:y/grid, w: 1, h: 1, block: block, opt: {}});
        setMovablePlatform(data)
    }

    const Update = (id, x, y, w, h) => {
        const data = Object.assign({}, movablePlatform);
        const grid = mailer.grid.size;

        x = x - (window.innerWidth/2);
        y = y - (window.innerHeight/2);

        data.platform[id] = {x: x/grid, y:y/grid, w: w/grid, h: h/grid, block: data.platform[id].block, opt: data.platform[id].opt};
        data.active = false;
        data.elem = null;

        setMovablePlatform(data);
        updateMailer();
    }

    const Start = (e, type, id) => {
        const grid = mailer.grid.size;
        const pos = {
            x: (window.innerWidth/2) + movablePlatform.platform[id].x * grid,
            y: (window.innerHeight/2) + movablePlatform.platform[id].y * grid
        };

        let target = e.currentTarget;
        const size = (
            parseFloat(target.style.left.length == 0 ? target.getBoundingClientRect().x : target.style.left)+
            parseFloat(target.getBoundingClientRect().width)
        );

        if(e.type == 'touchstart') e = e.touches[0];
        let event = { x: e.clientX, y: e.clientY };

        target.style.left = pos.x+'px';
        target.style.top = pos.y+'px';

        mailer.block.open({key: undefined });
        
        updateMailer({
            active: true, 
            pos: {x: pos.x, y: pos.y},
            size: {w: movablePlatform.platform[id].w * grid, h: movablePlatform.platform[id].h * grid},
            scroll: {x: target.parentNode.parentNode.parentNode.scrollLeft, y: target.parentNode.parentNode.parentNode.scrollTop},
            event: event, 
            elem: target,
            type: (size-15 <= event.x && size >= event.x ? 'platform-size' : 'platform-pos'),
            id: id,
            platform: movablePlatform.platform
        });
    }

    const updateMailer = arg => {
        let data = Object.assign({}, mailer);

        if(data.platform == undefined) data.platform = {};
        data.platform.add = Add;
        data.platform.update = Update;
        data.platform.movable = (arg == undefined ? movablePlatform : arg);
        //data.platform.children = platform;

        setMailer(data);
    }

    if(mailer.platform.add == undefined) updateMailer();
    if(mailer.platform.add != undefined && mailer.platform.movable.platform != movablePlatform.platform) setMovablePlatform(mailer.platform.movable);

    return <Wrapper>
        {movablePlatform.platform.map((data, i) => {
            let id = data.block >= mailer.block.movable.blocks.length ? mailer.block.movable.blocks.length-1 : data.block;
            
            return <Platform 
                id={i} 
                key={i} 
                x={data.x} 
                y={data.y} 
                w={data.w} 
                h={data.h} 
                down={Start} 
                block={mailer.block.movable.blocks[id]}
                size={mailer.grid.size}
            />
        })}
    </Wrapper>;
}