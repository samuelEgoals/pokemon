import style from "./style.module.scss"
import {useMemo, useState} from "react";

const Pokedex = () => {

    const [open, setOpen] = useState(false)
    const wrapperClass = useMemo(() => !open ? "wrapper_closed" : "wrapper_opened",[open])
    const pokedexClass = useMemo(() => !open ? "pokedex_button_closed" : "pokedex_button_opened",[open])
    const textClass = useMemo(() => !open ? "pokedex_text_closed" : "pokedex_text_opened",[open])

    return (
        <div className={style[wrapperClass]} onClick={() => setOpen(!open)}>
            <div className={style[pokedexClass]}>
                <div className={style[textClass]}>
                    Open
                </div>
            </div>
                <div className={style["pokemon_cards"]}/>
        </div>
    )
}

export default Pokedex;