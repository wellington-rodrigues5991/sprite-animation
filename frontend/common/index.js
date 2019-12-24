import React from 'react';
import ReactDOM from 'react-dom';
import App from '././navigation/App';
import Platform from '././navigation/Platform';
import ContextMenu from '././navigation/ContextMenu';
import {customVcc} from './VCC';

console.log(customVcc);

window.config = {
    children: [],
    selection: {
        target: null,
        type: null,
        pos: [0, 0],
        old: ''
    },
    parent: document.getElementById("platform"),
    start(parent, type, pos){
        console.log(parent, type, pos)
        this.selection.type = type;
        this.selection.pos = pos;        
        document.body.className = '';

        if(parent !== null) {
            this.selection.old = JSON.parse(JSON.stringify(parent.style));
            this.selection.target = parent;
            window.config.selection.onSelect(parent.getBoundingClientRect())
        }

        if(type === null){
            document.body.style.removeProperty('cursor');
            document.body.className = 'dont'
        }
        if(type === 'position') document.body.style.cursor = 'move'
        if(type === 'width') document.body.style.cursor = 'w-resize'
        if(type === 'height') document.body.style.cursor = 'n-resize'
        if(type === 'size') document.body.style.cursor = 'nw-resize'

        
    },
    move(event){
        const config = window.config.selection;
        const sizes = [0,0];

        if(config.type == null) return;

        const target = config.target.getBoundingClientRect();

        document.getElementsByClassName('tip')[0].style.left = (target.x + (target.width/2 - 36.25))+'px'
        document.getElementsByClassName('tip')[0].style.top = (target.bottom + 5)+'px'
        
        sizes[0] = event.clientX - config.pos[0];
        sizes[1] = event.clientY - config.pos[1];

        if(config.type === 'width' || config.type === 'size') 
            config.target.style.width = (parseFloat(config.old.width) + sizes[0]) + 'px';
        if(config.type === 'height' || config.type === 'size') 
            config.target.style.height = (parseFloat(config.old.height) + sizes[1]) + 'px';
        if(config.type === 'position'){
            config.target.style.left = (parseFloat(config.old.left) + sizes[0]) + 'px';
            config.target.style.top = (parseFloat(config.old.top) + sizes[1]) + 'px';
        }
    },
    add(type, name){
        window.config.children.push(new Platform({
            width: 50, 
            height: 80, 
            left: window.config.parent.scrollLeft + (window.innerWidth/2 - 25), 
            top: window.innerHeight/2, 
            type: type,
            name: name,
            parent: window.config.parent
        }));
    },
    delete(){
        const index = Array.from(window.config.parent.children).indexOf(window.config.selection.target);

        window.arrayRemove(window.config.children, window.config.children[index]);
        window.config.selection.target.remove();
        window.config.selection.onDeslect();
    },
    save(){
        const position = [];
        const center = {x: window.innerWidth/2, y: window.innerHeight/2};
        //{x: 0, y:0, width: 50, height: 20, type: 'player', angle: 0}

        Array.from(window.config.parent.children).forEach(block => {
            position.push({
                x: block.getBoundingClientRect().x / center.x,
                y: block.getBoundingClientRect().y / center.y,
                width: block.getBoundingClientRect().width / window.config.grid.value,
                height: block.getBoundingClientRect().height / window.config.grid.value,
                angle: /* fazer */ 0,
                type: block.getAttribute('data-type'),
            })
        });

        
        console.log(position)

    },
    grid: {
        value: 1,
        step: 15,
        calculate(){
            if(window.innerWidth > window.innerHeight) this.value = window.innerWidth/this.step;
            else this.value = window.innerHeight/this.step;
        }
    }
}
window.arrayRemove = function(arr, value) {
    return arr.filter(function(ele){
        return ele !== value;
    });
}

window.config.parent.addEventListener('mousemove', window.config.move);
window.config.parent.addEventListener('touchmove', event => window.config.move({buttons: 1, clientX: event.targetTouches[0].clientX, clientY: event.targetTouches[0].clientY}));

window.config.parent.addEventListener('mouseup', () => window.config.start(null, null, null));
window.config.parent.addEventListener('touchend', () => window.config.start(null, null, null));
document.body.addEventListener("mouseleave", () => window.config.start(null, null, null));

window.config.grid.calculate()

ReactDOM.render(<App />, document.getElementById('blocks'));
ReactDOM.render(<ContextMenu />, document.getElementById('overlay'));