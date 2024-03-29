import { AbstractView } from "../../common/views.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/cardList/cardList.js";
import { Offset } from "../../components/offset/offset.js";

export class MainView extends AbstractView{
    
    state ={
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    }

    constructor(appState){
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск книг');
    }

    destroy(){
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path){
        if(path === 'favorites'){
            this.render();
        }
    }

    async stateHook(path){

        if(path === 'searchQuery' || path === 'offset'){
            if(path === 'searchQuery') {this.state.offset = 0;}
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
        }

        if(path === 'list' || path === 'loading'){
            this.render();
        }
    }

    async loadList(q, offset){
        try {
            const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);

            if(!res.ok){throw Error(res.status);}

            return res.json();

        } catch (error) {
            console.error(error);
        }
    }

    render(){
        const main = document.createElement('div');

        main.innerHTML = `
        <h1>Найденно книг - ${this.state.numFound}</h1>`;

        main.prepend(new Search(this.state).render());
        main.prepend(new Header(this.appState).render());
        main.append(new CardList(this.appState,this.state).render());
        main.append(new Offset(this.state).render());
        this.app.innerHTML = '';
        this.app.append(main);
    }

    
}