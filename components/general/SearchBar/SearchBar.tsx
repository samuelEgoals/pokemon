import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import style from "./style.module.scss"

const SearchBar = ({onSubmit, placeholder}: { onSubmit: SubmitHandler<FieldValues>, placeholder?: string }) => {
    const {register, handleSubmit} = useForm({shouldUnregister: true});

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <input className={style.search_bar} {...register("name")} placeholder={placeholder}/>
                <button type="submit" className={style.search_button}>
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchBar;