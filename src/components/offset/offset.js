import { DivComponent } from "../../common/div-component";
import './offset.css';

export class Offset extends DivComponent{
    constructor(state){
        super();
        this.state = state;
    }

    render(){

        if (this.state.list.length <= 0 || this.state.loading === true){
            return " ";
        }

        this.element.classList.add('offset');
        this.element.innerHTML = `
            <button class='offsetLeft'><-- Предыдущая страница</button>
            <button class='offsetRight'>Следующая страница --></button>
        `;

        this.element.querySelector('.offsetLeft').addEventListener('click', ()=>{
            if(this.state.offset - 100 >= 0){
                this.state.offset -= 100;
            }
        });

        this.element.querySelector('.offsetRight').addEventListener('click', ()=>{
            if(this.state.numFound - this.state.offset >= 100){
                this.state.offset += 100;
            }
        });

        return this.element;
    }
}