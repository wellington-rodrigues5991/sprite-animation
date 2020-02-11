import GameObject from '../config/gameObject';

export const Sprite = new GameObject({
	preload(){
        this.load.spritesheet('sprite', 'https://superprix.vteximg.com.br/arquivos/ids/178064-600-600/Sprite_2litros.png', {frameWidth: 300, frameHeight: 300});		
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
    },

    create(){
        this.view = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'sprite');
    },

    update(){
    }
})