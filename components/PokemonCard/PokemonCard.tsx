import Image from "next/image";
import {PokemonType, Type} from "../../types";
import style from "./style.module.scss"

const PokemonCard = ({pokemon}: {pokemon: PokemonType}) => {
    return (
        <div className={style.card}>
            <div className={style.title}>
                {pokemon.name}
            </div>
            <div className={style.sprite}>
                {
                    !!pokemon?.sprites ?
                        <Image width={100} height={100} loader={() => pokemon.sprites.front_default} src={pokemon.sprites.front_default} alt="pokemon"/>
                        :
                        null
                }
            </div>
            <div className={style.base_exp}>
                {`Base xp: ${pokemon.base_experience}`}
            </div>
            <div className={style.types}>
                {pokemon.types.map((type: Type, index: number) => {
                    return (
                        <div key={index}>
                            {`Type: ${type.type.name}`}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PokemonCard;


/*
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
                        <Image width={96} height={96} loader={() => pokemon.sprites.front_default} src={pokemon.sprites.front_default} alt="pokemon"/>
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
 */