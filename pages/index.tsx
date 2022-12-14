import styles from 'styles/Home.module.css'
import {useState} from "react";
import {api} from "api";
import {E_POKEMON} from "api/endpoints";
import {PokemonType} from "types/pokemon-types";
import {Pokedex, PokemonCard, SearchBar} from "components";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {pokemonNames} from "../components/pokemon-names";

function PokemonList(props: { pokemonList: PokemonType[] | null, callbackfn: (pokemon: PokemonType, index: number) => JSX.Element }) {
    return <>
        {
            props.pokemonList ?
                <>
                    {props.pokemonList?.map(props.callbackfn)}
                </>
                :
                null
        }
    </>;
}

export default function Home() {

    const [pokemonList, setpokemonList] = useState<PokemonType[] | null>(null)
    const [pokedex, setPokemondex] = useState([])

    /**
     * When the form is submitted this function will create a list of Pokemon names that contain the inserted phrase.
     * A new list of promises will be generated using the list name. After all the promises are resolved the data
     * attribute is extracted and returned in an array.
     * @param data
     */
    const searchPokemon: SubmitHandler<FieldValues> = (data: any) => {
        async function fetchData() {
            const test = new RegExp(`^.*${data.name.toLowerCase()}.*$`)
            const promiseList: any = []
            const answers: any = []
            pokemonNames.forEach((e: string) => test.test(e) ? answers.push(e) : null)
            answers.forEach((answer: string) => {
                promiseList.push(api.get(E_POKEMON.replace(":name", answer)))
            })

            return await Promise.all(promiseList).then((values) => {
                return values.map((value: any) => {
                    return value.data
                })
            })
        }

        // The minimum length for the phrase to be searched is 3
        if (data.name.length >= 3) {
            fetchData().then((res: any) => setpokemonList(res))
        }

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <SearchBar placeholder="Pokemon name" onSubmit={searchPokemon}/>
                <div className={styles.card}>
                    <PokemonList pokemonList={pokemonList} callbackfn={(pokemon: PokemonType, index: number) => {
                        return (
                            <PokemonCard pokemon={pokemon} pokedex={pokedex} key={index}
                                         setPokedex={setPokemondex}/>
                        )
                    }}/>
                </div>
            </div>
            <Pokedex pokedex={pokedex}/>
        </div>
    )
}
