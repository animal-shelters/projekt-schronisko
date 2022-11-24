import { useEffect, useRef, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import Animal from "../models/animal.dto";
import axiosInstance from "../utils/axiosInstance";

function AnimalsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<Array<Animal>>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(9);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get("animals", { params: { page: pageIndex, itemsPerPage: pageSize } }).then((response) => {
            setAnimals(response.data["hydra:member"]);
            setTotalCount(response.data["hydra:totalItems"]);
            setIsLoading(false);
        })
    }, [pageIndex, pageSize])

    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-16">Lista zwierząt</h1>
            {isLoading
                ? <Spinner />
                :
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-3 mt-16">
                        {animals.map((animal: Animal) => {
                            return (
                                <AnimalCard {...animal} key={animal.id} />
                            )
                        })}
                    </div>
                    <Pagination pageIndex={pageIndex} totalItems={totalCount} pageSize={pageSize} onPageSizeChange={setPageSize} setPageIndex={setPageIndex} />
                </div>
            }
        </>

    )
}

export default AnimalsPage;
