import { DivComponent } from "../../common/div-component";
import './search.css';

export class Search extends DivComponent{
    constructor(state){
        super();
        this.state = state;
    }

    search(){
        const value = this.element.querySelector('input').value;
        this.state.searchQuery = value;
    }

    render(){
        this.element.classList.add('search');
        this.element.innerHTML = `
            <div class="searchWrapper">
                <input 
                    type="text"
                    placeholder="Найти книгу или автора...."
                    value="${this.state.searchQuery ? this.state.searchQuery: ""}"
                />

                <img src="./static/images/search.svg" alt="search" />
            
            </div>

                <button aria-label="Искать" class="searchButton">
                    <img src="./static/images/searchWhite.svg" alt="search"/>
                </button>
        `;

        this.element.querySelector('button').addEventListener('click', this.search.bind(this));
        this.element.querySelector('input').addEventListener('keydown', (event)=>{
            if(event.code === 'Enter'){
                this.search();
            }
        })

        return this.element;
    }
}