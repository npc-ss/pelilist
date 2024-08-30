import {useState} from "react";


const FormSearch =()=>{
    const [title, setTitle] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log("title: ", title);
    }
    return(
        <div className="form-search">
            <p class="subtitulo">Buscador de películas</p>
            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder="Título película" onChange={e =>setTitle(e.target.value)}/>
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}
export default FormSearch;

