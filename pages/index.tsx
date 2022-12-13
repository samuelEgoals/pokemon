import styles from 'styles/Home.module.css'
import {useState} from "react";
import {api} from "api";
import {E_POKEMON} from "api/endpoints";
import {AxiosResponse} from "axios";
import {PokemonType} from "types";
import {Pokedex, PokemonCard} from "components";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState("")
    const [pokemon, setPokemon] = useState<PokemonType | null>(null)
    const [pokedex, setPokemondex] = useState([])

    const searchPokemon = () => {
        api.get(E_POKEMON.replace(":name", searchTerm)).then((res: AxiosResponse) => setPokemon(res.data)).catch(() => console.log("err"))
    }

    return (
        <div className={styles.container}>
            <input onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={() => searchPokemon()}>
                Search
            </button>
            {
                pokemon ?
                    <PokemonCard pokemon={pokemon} pokedex={pokedex} setPokedex={setPokemondex}/>
                    :
                    null
            }
            <Pokedex pokedex={pokedex}/>
        </div>
    )
}
