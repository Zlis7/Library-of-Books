import { AbstractView } from "../../common/views.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/cardList/cardList.js";

export class FavoritesView extends AbstractView{

    constructor(appState){
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('Мои книги');
    }

    saveFavoritesInStorаge(){
        console.log(this.appState.favorites[0].key);
    }


    destroy(){
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path){
        if(path === 'favorites'){
            this.render();
            this.saveFavoritesInStorаge();
        }
    }

    render(){
        const main = document.createElement('div');

        main.innerHTML = `
        <h1>Избранные книги</h1>`;

        main.prepend(new Header(this.appState).render());
        main.append(new CardList(this.appState, {list: this.appState.favorites}).render());
        
        this.app.innerHTML = '';
        this.app.append(main);
    }
}