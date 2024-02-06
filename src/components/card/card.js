import { DivComponent } from "../../common/div-component";
import './card.css';

export class Card extends DivComponent{
    constructor(appState, cardState){
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #addToFavorites(){
        this.appState.favorites.push(this.cardState);
    }

    #deleteFromFavorites(){
        this.appState.favorites = this.appState.favorites.filter(
            b => b.key !== this.cardState.key
        );
    }

    render(){

        this.element.classList.add('card');
        const existInFavorites = this.appState.favorites.find(
            b => b.key == this.cardState.key);
        this.element.innerHTML = `
            <div class="cardImage">
                <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Обложка" /> 
            </div>
            <div class="cardInfo">
                <div class='cardTag'>
                    ${this.cardState.subject ? this.cardState.subject[0]: 'Не заданно'}
                </div>
                <div class='cardName'>
                    ${this.cardState.title}
                </div>
                <div class='cardAuthor'>
                    ${this.cardState.author_name ? this.cardState.author_name[0]: 'Не заданно'}
                </div>
                <div class='cardFooter'>
                    <button class='buttonAdd ${existInFavorites ? 'buttonActive': ''}'>
                        ${ existInFavorites
                            ? '<img src="/static/images/favorites.svg" />'
                            : '<img src="/static/images/favoritesWhite.svg" />'

                        }
                    </button>
                </div>
            </div>

        `;

        if(existInFavorites){
            this.element
                .querySelector('button')
                .addEventListener('click',this.#deleteFromFavorites.bind(this));
        }
        else{
            this.element
            .querySelector('button')
            .addEventListener('click',this.#addToFavorites.bind(this));
        }

        return this.element;
    }
}