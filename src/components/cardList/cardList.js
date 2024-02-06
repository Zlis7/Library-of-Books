import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import './CardList.css';

export class CardList extends DivComponent{
    constructor(appState, parentState){
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    render(){

        if(this.parentState.loading){
            this.element.innerHTML = `<div class='cardListLoader'>Загрузка...</div>`;
            return this.element;
        }

        const cardGrid = document.createElement('div');
        cardGrid.classList.add('cardGrid');
        this.element.append(cardGrid);
        
        for(const card of this.parentState.list){
            cardGrid.append(new Card(this.appState, card).render());
        }
        return this.element;
    }
}