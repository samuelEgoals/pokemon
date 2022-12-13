import Image from "next/image";
import {Ability, PokemonType, Type} from "../../types";

const PokemonCard = ({pokemon}: {pokemon: PokemonType}) => {
    return (
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
    )
}

export default PokemonCard;