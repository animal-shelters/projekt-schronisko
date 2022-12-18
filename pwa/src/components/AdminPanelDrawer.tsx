import Link from "next/link";

function render(props: any){
    return (
        <div className="flex flex-col h-100 min-h-screen bg-gray-700 text-white">
            <Link href="edit_landing_page" className="p-3">Edytuj stronę główną</Link>
            <Link href="add_animal" className="p-3">Dodaj zwierzę</Link>
            <Link href="adoptions" className="p-3">Lista adopcji</Link>
            <Link href="add_adoption" className="p-3">Dodaj adopcję</Link>
            <Link href="create_form" className="p-3">Dodaj formularz</Link>
        </div>
    )
}

export default render;