
export default class Platform{
    constructor(props){
        this.content = document.createElement('div');
        this.type = props.type;
        this.name = props.name;
        this.points = [
            new Point({type: "width", parent: this.content}),
            new Point({type: "height", parent: this.content}),
            new Point({type: "size", parent: this.content}),
            new Point({type: "position", parent: this.content}),
        ]

        this.configure(props)
    }
    configure(props){       
        this.content.style.position = "absolute";
        this.content.style.background = this.type;
        this.content.style.width = props.width+'px';
        this.content.style.height = props.height+'px';
        this.content.style.minWidth = '50px';
        this.content.style.minHeight = '50px';
        this.content.style.top = props.top+'px';
        this.content.style.left = props.left+'px';
        this.content.className = 'stage'
        this.content.setAttribute('data-type', this.name)

        props.parent.appendChild(this.content)
    }
}

class Point{
    constructor(props){
        this.content = document.createElement('div');
        this.parent = props.parent;
        this.type = props.type;

        this.content.style.position = 'absolute';
        this.content.setAttribute('cursor', this.type);

        if(props.type === 'position' || props.type === 'height') {
            this.content.style.left = '0px';
            this.content.style.width = 'calc(100% - 25px)'
        }
        if(props.type === 'position' || props.type === 'width') {
            this.content.style.top = '0px';
            this.content.style.height = 'calc(100% - 25px)';
        }
        if(props.type === 'height' || props.type === 'size') {
            this.content.style.bottom = '0px';
            this.content.style.height = '25px';
        }
        if(props.type === 'size' || props.type === 'width') {
            this.content.style.right = '0px';
            this.content.style.width = '25px';
        }
        

        this.content.addEventListener('mousedown', event => window.config.start(this.parent, this.type, [event.clientX, event.clientY]));
        this.content.addEventListener('touchstart', event => window.config.start(this.parent, this.type, [event.targetTouches[0].clientX, event.targetTouches[0].clientY]));

        this.parent.appendChild(this.content)
    }
}