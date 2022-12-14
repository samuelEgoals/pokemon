import styles from 'styles/Home.module.css'
import {useState} from "react";
import {api} from "api";
import {E_POKEMON} from "api/endpoints";
import {PokemonType} from "types";
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

    const searchPokemon: SubmitHandler<FieldValues> = (data: any) => {
        async function fetchData() {
            const test = new RegExp(`^.*${data.name}.*$`)
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
