import { DivComponent } from "../../common/div-component";
import './header.css';

export class Header extends DivComponent{
    constructor(appState){
        super();
        this.appState = appState;
    }

    render(){
        this.element.classList.add('header');
        this.element.innerHTML = `
            <div>
                <img src='./static/images/logoSite.svg' alt='logo' />
            </div>
            <div class='menu'>
                <a class='menuItem' href='#'>
                    <img src='./static/images/search.svg' alt='search' />
                    Поиск книг
                </a>
                <a class='menuItem' href='#favorites'>
                    <img src='./static/images/favorites.svg' alt='favorites' />
                    Избранное

                    <div class="favoritesCounter">
                        ${this.appState.favorites.length}
                    </div>
                </a>
            </div>
        `;

        return this.element;
    }
}