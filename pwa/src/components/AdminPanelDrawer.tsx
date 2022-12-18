import Link from "next/link";

function render(props: any){
    return (
        <div className="flex flex-col h-100 min-h-screen bg-gray-700 text-white">
            <Link href="/admin_panel/edit_landing_page" className="p-3">Edytuj stronę główną</Link>
            <Link href="/admin_panel/add_animal" className="p-3">Dodaj zwierzę</Link>
            <Link href="/admin_panel/adoptions" className="p-3">Lista adopcji</Link>
            <Link href="/admin_panel/add_adoption" className="p-3">Dodaj adopcję</Link>
            <Link href="/admin_panel/form_creator" className="p-3">Dodaj formularz</Link>
        </div>
    )
}

export default render;