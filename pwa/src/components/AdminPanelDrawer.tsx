import { Link } from "react-router-dom";

function render(props: any){
    return (
        <div className="flex flex-col h-100 min-h-screen bg-gray-700 text-white">
            <Link to="edit_landing_page" className="p-3">Edytuj stronę główną</Link>
            <Link to="add_animal" className="p-3">Dodaj zwierzę</Link>
            <Link to="adoptions" className="p-3">Lista adopcji</Link>
            <Link to="add_adoption" className="p-3">Dodaj adopcję</Link>
            <Link to="create_form" className="p-3">Dodaj formularz</Link>
        </div>
    )
}

export default render;