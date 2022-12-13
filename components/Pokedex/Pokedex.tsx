import style from "./style.module.scss"
import {useMemo, useState} from "react";
import {PokemonType} from "../../types";
import {PokemonCard} from "../PokemonCard";

const Pokedex = ({pokedex}: {pokedex: PokemonType[]}) => {

    const [open, setOpen] = useState(false)
    const emptySlots = useMemo(() => {
        const arr = [];
        for(let i = 0; i < (10 - pokedex.length); i++){
            arr.push(null)
        }
        return arr;
    },[pokedex])
    const wrapperClass = useMemo(() => !open ? "wrapper_closed" : "wrapper_opened", [open])
    const pokedexClass = useMemo(() => !open ? "pokedex_button_closed" : "pokedex_button_opened", [open])
    const textClass = useMemo(() => !open ? "pokedex_text_closed" : "pokedex_text_opened", [open])

    return (
        <div className={style[wrapperClass]} >
            <div className={style[pokedexClass]} onClick={() => setOpen(!open)}>
                <div className={style[textClass]}>
                    Open
                </div>
            </div>
            <div className={style["pokemon_container"]}>
                <div className={style.pokemon_cards}>
                    {pokedex.map((pokemon: PokemonType, index: number) => {
                        return (
                            <div key={index} style={{height: "250px"}}>
                                <PokemonCard pokemon={pokemon}/>
                            </div>
                        )
                    })}
                    {emptySlots.map((empty: null, index: number) => {
                        return (
                            <div key={index} className={style.emptySlot}>
                                empty
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Pokedex;