import style from "./style.module.scss"
import {useMemo, useState} from "react";
import {PokemonType} from "../../../types/pokemon-types";
import {PokemonCard} from "../PokemonCard";

const Pokedex = ({pokedex}: { pokedex: PokemonType[] }) => {

    // Opens and closes the pokedex
    const [open, setOpen] = useState(false)

    /**
     * A list of empty slots for the  pokedex
     */
    const emptySlots = useMemo(() => {
        const arr = [];
        for (let i = 0; i < (10 - pokedex.length); i++) {
            arr.push(null)
        }
        return arr;
    }, [pokedex])

    /**
     * Dynamic class names that change when open state is updated
     */
    const wrapperClass = useMemo(() => !open ? "wrapper_closed" : "wrapper_opened", [open])
    const pokedexClass = useMemo(() => !open ? "pokedex_button_closed" : "pokedex_button_opened", [open])
    const textClass = useMemo(() => !open ? "pokedex_text_closed" : "pokedex_text_opened", [open])
    //The sum of all the pokemon's in the pokedex base_xp
    const collectiveBaseXp = useMemo(() => {
        let value = 0;
        pokedex.forEach((pokemon: PokemonType) => {
            value += pokemon.base_experience
        })
        return value
    }, [pokedex])

    return (
        <div className={style[wrapperClass]}>
            <div className={style[pokedexClass]} onClick={() => setOpen(!open)}>
                <div className={style[textClass]}>
                    {open ? "Close" : "Open"}
                </div>
            </div>
            <div className={style["pokemon_container"]}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    {`Collective base xp: ${collectiveBaseXp}`}
                </div>
                <div className={style.pokemon_cards}>
                    {pokedex.map((pokemon: PokemonType, index: number) => {
                        return (
                            <div key={index} className={style.center_cards}>
                                <PokemonCard pokemon={pokemon}/>
                            </div>
                        )
                    })}
                    {emptySlots.map((empty: null, index: number) => {
                        return (
                            <div className={style.center_cards} key={index}>
                                <div className={style.emptySlot}>
                                    empty
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Pokedex;