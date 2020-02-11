import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';
import App from './data/app';

class VCC extends React.PureComponent {
    constructor(props) {
        super(props);

        this.customVcc = new CustomVcc();
        this.update = this.update.bind(this);
        this.showModal = this.showModal.bind(this);
        this.setVar = this.setVar.bind(this);
        const initialValue = {
            selection: 'walk',
            image: null,
            select: 0,
            frame: {width: 32, height: 32, padding: 5},
            animations: {
                walk: {
                    frames: [],
                    fps: 10,
                },
                run: {
                    frames: [],
                    fps: 5,
                },
            }        
        };
        this.state = {
            value: null,
            data: initialValue,
            theme: this.customVcc.theme,
        };

        this.customVcc.onUpdate((newProps) => {
            console.log(this.customVcc, newProps)
            let target = Object.keys(newProps).length > 0 ? newProps : {value: initialValue};
            const data = Object.assign({}, initialValue);
            const value = Object.assign({}, target.value);
            
            if(value.frame) data.frame = value.frame;
            if(value.animations){
                const animations = {};

                for(let i = 0; i < value.animations.length; i++){
                    animations[value.animations[i].name] = {
                        frames: value.animations[i].frames,
                        fps: value.animations[i].frameRate
                    };
                }
                data.animations = animations;
            }
            this.setState({data: data, value: target})   
        });

        this.customVcc.onTheme((theme) => {
            this.setState({
                theme
            });
        });
    }

    setVar(key, val){
        if(val != undefined) document.documentElement.style.setProperty(key, val)
    }

    componentDidMount() {
        this.customVcc.register('500px', '534px');

        let border = this.state.theme.colors['border.secondary'];
        let font = this.state.theme.mixins['font.defaultFamily'];

        if(border != undefined) border = border.replace(';', '');
        if(font != undefined) font = font.replace('font-family: ', '').replace(';', '');

        this.setVar('--text-color', this.state.theme.colors['foreground.default']);
        this.setVar('--color-primary', this.state.theme.colors['input.background']);
        this.setVar('--back-default', this.state.theme.colors['border.default']);
        this.setVar('--back-secundary', this.state.theme.colors['foreground.secondary']);
        this.setVar('--color-secundary', this.state.theme.colors['foreground.primary']);
        this.setVar('--border-color', border);
        this.setVar('--color-base', this.state.theme.colors['background.default']);
        this.setVar('--font-family', font);
        this.setVar('--color-default', this.state.theme.colors['background.default']);
    }

    componentWillUpdate(){
        let border = this.state.theme.colors['border.secondary'];
        let font = this.state.theme.mixins['font.defaultFamily'];

        window.Theme = this.state.theme;

        if(border != undefined) border = border.replace(';', '');
        if(font != undefined) font = font.replace('font-family: ', '').replace(';', '');

        this.setVar('--text-color', this.state.theme.colors['foreground.default']);
        this.setVar('--color-primary', this.state.theme.colors['input.background']);
        this.setVar('--back-default', this.state.theme.colors['border.default']);
        this.setVar('--back-secundary', this.state.theme.colors['foreground.secondary']);
        this.setVar('--color-secundary', this.state.theme.colors['foreground.primary']);
        this.setVar('--border-color', border);
        this.setVar('--color-base', this.state.theme.colors['background.default']);
        this.setVar('--font-family', font);
        this.setVar('--color-default', this.state.theme.colors['background.default']);
    }

    showModal(callback){
        this.customVcc.showModal('image', '', newUrl => callback(newUrl));
    }

    update(props){
        const keys = Object.keys(props.animations);
        const animations = [];
        let start = 0

        for(let i = 0; i < keys.length; i++){
            animations.push({
                name: keys[i],
                frames: props.animations[keys[i]].frames,
                start: start,
                end: start+props.animations[keys[i]].frames.length-1,
                frameRate: props.animations[keys[i]].fps
            });

            start += props.animations[keys[i]].frames.length;
        }
        this.customVcc.change({frame: props.frame, animations: animations});
        this.customVcc.save();
    }

    render() {
        return <App data={this.state.data} setData={this.update} addImage={this.showModal} />;
    }
}

export default VCC;
