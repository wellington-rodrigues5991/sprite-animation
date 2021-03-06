import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';

const Picture = styled.canvas`
    position: fixed;
    top: -10000px;
    left: -10000px;
    opacity: 0;
`;

export default function Canvas({data, set, view}){
    const canvas = useRef();
    
    if(data.generate == undefined){
        window.breaks = [];
        data.generate = (d, select, s) => {

            let max = 0;
            const keys = Object.keys(d.animations);
            for(let i = 0; i < keys.length; i++){
                let size = d.animations[keys[i]].frames.length;
                if(size > max) max = size;
            }
            canvas.current.width = max * (d.frame.width + (d.frame.padding * 2));
            canvas.current.height = keys.length * (d.frame.height + (d.frame.padding * 2));

            //draw images
            const context = canvas.current.getContext("2d");   
            let count = 0;

            for(let i = 0; i < keys.length; i++){
                let target = d.animations[keys[i]].frames;
                for(let e = 0; e < target.length; e++){
                    let img = new Image();   
                    img.crossOrigin="anonymous"; 
                    img.onload = function() {
                        let width = this.width;
                        let height = this.height;
                        let y = 0;
                        let x = 0;

                        if(width > height){
                            height = d.frame.width * (height/width);
                            width = d.frame.width;
                            y = (d.frame.height-height)/2;
                        }
                        else{
                            width = d.frame.height * (width/height);
                            height = d.frame.height;
                            x = d.frame.width-width;
                            x = x > 0 ? x / 2 : x;
                        }
                        context.drawImage(
                            this, 
                            ((d.frame.width + (d.frame.padding * 2)) * e) + d.frame.padding + x, 
                            ((d.frame.height + (d.frame.padding * 2)) * i) + d.frame.padding + y, 
                            width, 
                            height
                        );
                        
                        if(target.length-1 == e) window.breaks[i] = {start: i * max, end: i * max + target.length};
                        if((i == keys.length-1 || keys.length == 1) && target.length-1 == e) generate(select, d, s)
                    };   
                    img.src = target[e];      
                }
            }
            
        };
    }

    const generate = (select, d, s) => {
        if(canvas.current != undefined && window.breaks.length > 0){
            d.image = URL.createObjectURL(dataURItoBlob(canvas.current.toDataURL()));
            s(d);
            
            const keys = Object.keys(d.animations);
            const animations = [];
            let start = 0

            for(let i = 0; i < keys.length; i++){
                animations.push({
                    name: keys[i],
                    start: window.breaks[i].start,
                    end: window.breaks[i].end-1,
                    frameRate: d.animations[keys[i]].fps
                });

                start += d.animations[keys[i]].frames.length;
            }
            
            view.start(
                d.image, 
                {width: d.frame.width+(d.frame.padding*2), height: d.frame.height+(d.frame.padding*2)},
                animations,
                select
            );
        }
    }
    return <Picture className="canvas" ref={canvas}/>;
}

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }