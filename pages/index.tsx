import styles from '../styles/Home.module.css'
import {useState} from "react";
import {api} from "../api";
import {E_POKEMON} from "../api/endpoints";
import {AxiosResponse} from "axios";
import {Ability, PokemonType, Type} from "../types";
import Image from "next/image";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState("")
    const [pokemon, setPokemon] = useState<PokemonType | null>(null)

    const searchPokemon = () => {
        api.get(E_POKEMON.replace(":name", searchTerm)).then((res: AxiosResponse) => setPokemon(res.data)).catch()
    }

    console.log(pokemon)

    return (
        <div className={styles.container}>
            <input onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={() => searchPokemon()}>
                Search
            </button>
            <div>
                <div>
                    {pokemon?.name}
                </div>
                <div>
                    {pokemon?.base_experience}
                </div>
                <div>
                    {
                        !!pokemon?.sprites ?
                            <Image src={pokemon.sprites.front_default} alt="pokemon"/>
                            :
                            null
                    }
                </div>
                <div>
                    {pokemon?.abilities.map((ability: Ability, index: number) => {
                        return (
                            <div key={index}>
                                {ability.ability.name}
                            </div>
                        )
                    })}
                </div>
                <div>
                    {pokemon?.types.map((type: Type, index: number) => {
                        return (
                            <div key={index}>
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
