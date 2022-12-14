import Image from "next/image";
import {PokemonType, Type} from "../../../types/pokemon-types";
import style from "./style.module.scss"
import {Dispatch} from "react";

const PokemonCard = ({
                         pokemon,
                         pokedex,
                         setPokedex = null
                     }: { pokemon: PokemonType, pokedex?: PokemonType[], setPokedex?: Dispatch<any> | null }) => {

    const addToPokedex = () => {
        if ((!pokedex?.find(e => e.id === pokemon.id)) && !!setPokedex) {
            setPokedex((current: PokemonType[]) => current.length < 10 ? [...current, pokemon] : [pokemon, ...current].splice(0, 10))
        }
    }

    return (
        <div className={style.card}>
            <div className={style.title}>
                {pokemon.name}
            </div>
            <div className={style.sprite}>
                {
                    !!pokemon?.sprites ?
                        <Image width={100} height={100} loader={() => pokemon.sprites.front_default}
                               src={pokemon.sprites.front_default} alt="pokemon"/>
                        :
                        null
                }
            </div>
            <div className={style.base_exp}>
                {`Base xp: ${pokemon.base_experience}`}
            </div>
            <div className={style.types}>
                {pokemon.types?.map((type: Type, index: number) => {
                    return (
                        <div key={index}>
                            {`Type: ${type.type.name}`}
                        </div>
                    )
                })}
            </div>
            <div className={style.abilities}>
                <div>
                    <div className={style.abilities_title}>
                        Abilities:
                    </div>
                    {pokemon.abilities.map((ability, index: number) => {
                        return (
                            <div key={index} className={style.abilities_name}>
                                {ability.ability.name}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={style.add_to_pokedex}>
                {
                    !!setPokedex ?
                        <button onClick={() => addToPokedex()}>
                            Add to Pokedex
                        </button>
                        : null
                }
            </div>
        </div>
    )
}

export default PokemonCard;