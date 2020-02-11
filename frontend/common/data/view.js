import Phaser from 'phaser';
import Scene from '../config/scene';
import { Sprite } from './sprite';

const View = {
    text: '',
    config:{
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        "render.transparent": true,
        "render.autoResize": true,
        scene: [new Scene([ Sprite ])],
        scale: {
            parent: 'phaser-game',
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        loader: {crossOrigin: 'anonymous'},
        autoRound: true,
        pixelArt: false
    },
    game: null,
    destroy(){
        document.getElementById('phaser-game').children[0].remove();

        //setTimeout(() => {this.start()}, 1000);
    },
    start(url, size, anims, selection){
        if(this.text.length > 0) this.next(url, size, anims, selection);
        else{
            fetch('phaser.txt')
            .then((r) => r.text())
            .then(text => {
                this.text = text;
                this.start(url, size, anims, selection)
            }) 
        }
    },
    next(url, size, anims, selection){
        const parent = document.getElementById('phaser-game');
        const iframe = document.createElement('iframe');
        const base = document.createElement('div');

        if(parent.children.length > 0) document.getElementById('phaser-game').children[0].remove();

        parent.appendChild(iframe);
        
        const target = iframe.contentDocument || iframe.contentWindow.document;
        base.id = 'phaser-content';
        base.style.position = 'fixed';
        base.style.top = '0px';
        base.style.left = '0px';
        base.style.width = '100vw';
        base.style.height = '100vh';
        target.body.appendChild(base)
        
        const phaser = document.createElement('script');
        phaser.innerHTML = this.text;
        target.body.appendChild(phaser);

        let anim = '';
        for(let i = 0; i < anims.length; i++){
            anim += `
                this.anims.create({
                    key: '${anims[i].name}',
                    repeat: -1,
                    frameRate: ${anims[i].frameRate},
                    frames: this.anims.generateFrameNames('sprite', {start: ${anims[i].start}, end: ${anims[i].end}})
                });
            `
        }

        const script = document.createElement('script');
        script.innerHTML = `
            const config = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                transparent: true,
                scene: {
                    preload: preload,
                    create: create,
                    update: update
                },
                scale: {
                    parent: 'phaser-content',
                    mode: Phaser.Scale.RESIZE,
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                loader: {crossOrigin: 'anonymous'},
                autoRound: true,
                pixelArt: false
            };
            const game = new Phaser.Game(config);

            function preload ()
            {
                this.load.spritesheet('sprite', '${url}', {frameWidth: ${size.width}, frameHeight: ${size.height}});		
                var progressBox = this.add.graphics();
                var progressBar = this.add.graphics();
                progressBox.fillStyle('0x00000', 0.5);
                progressBox.fillRect((window.innerWidth/2) - 105, (window.innerHeight/2) - 10, 210, 20);
        
                this.load.on('progress', function (value) {
                    progressBar.clear();
                    progressBar.fillStyle('0xffffff', 0.5);
                    progressBar.fillRect((window.innerWidth/2) - 100, (window.innerHeight/2) - 5, 200 * value, 10);
                });
                
                this.load.on('complete', function () {
                    progressBar.destroy();
                    progressBox.destroy();
                });
            }

            function create ()
            {
                this.view = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'sprite');
                this.view.setScale(2);
                ${anim}                

                this.view.play('${selection}')
                
                window.addEventListener('resize', () => {
                    this.view.x = window.innerWidth/2;
                    this.view.y = window.innerHeight/2;
                });
            }

            function update ()
            {
            }
        `;
        target.body.appendChild(script)
    }
};

window.Phaser = Phaser

//

export default View;