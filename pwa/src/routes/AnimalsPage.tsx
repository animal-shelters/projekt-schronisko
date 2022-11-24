import { useEffect, useRef, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import Spinner from "../components/Spinner";
import Animal from "../models/animal.dto";
import axiosInstance from "../utils/axiosInstance";

function AnimalsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<Array<Animal>>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get("animals", { params: { page: 1 } }).then((response) => {
            setAnimals(response.data["hydra:member"]);
            setTotalCount(response.data["hydra:totalCount"]);
            setIsLoading(false);
        })
    }, [pageIndex])



    return (
        <>
            {isLoading
                ? <Spinner />
                :
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-3">
                        {animals.map((animal: Animal) => {
                            return (
                                <AnimalCard {...animal} key={animal.id} />
                            )
                        })}
                    </div>
                </div>
            }
        </>

    )
}

export default AnimalsPage;
