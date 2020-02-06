import React, { useState } from 'react';
import Line from './line';

export default function Grid({get, set}){
    const Change = (value)=> {
        const data = Object.assign({}, get);

        if(!isNaN(value)) {
            if(value < 2) value = 2;
            data.grid.divisions= value;

            set(data);
        }
    };

    return <div style={{paddingTop: '48px', paddingBottom: '20px'}}>
        <Line title="Change divisions number" type="number" value={get.grid.divisions} blur={v => Change(parseInt(v))} opt={{min: 2, max: 100, step: 1}} />
    </div>;
}

/*
    <Line title="Change divisions number" type="text" change={v => Change(v, 'texto')} />
    <Line title="Change divisions number" type="number" value={values.number} change={v => Change(parseInt(v), 'number')} opt={{min: 4, max: 100, step: 1}} />
    <Line title="Change divisions number" type="select" value={values.opt} opt={['meu nome', 'seu nome', 'nosse nome']} change={v => Change(v, 'select')} />
    <Line title="Change divisions number" type="bool" value={values.bool} change={v => Change(v, 'bool')} />
*/