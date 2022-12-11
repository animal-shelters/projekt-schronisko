import Animal from "./animal.dto";
import User from "./user-type";

export default interface Adoption {
    adoptionId: string;
    userId: number;
    animalId: number;
    date: Date;
    user: User;
    animal: Animal;
}

export interface AdoptionDto {
    adoptionId: string;
    userId: string;
    animalId: string;
    date: Date;
    user: User;
    animal: Animal;
}

export interface AdoptionPostDto {
    adoption?: string;
    user: string;
    animal: string;
    date: string;
}

export function mapAdoptionToDto(data: AdoptionPostDto): AdoptionPostDto {
    return{
        adoption: data.adoption ? `/adoptions/${data.adoption}` : undefined,
        user: `/users/${data.user}`,
        animal: `/animals/${data.animal}`,
        date: data.date,
    };
}

export function mapAdoption(data: AdoptionDto): Adoption {
    return {
        adoptionId: data.adoptionId.replace("/adoptions/", ""),
        userId: parseInt(data.userId.replace( /^\D+/g, '')),
        animalId: parseInt(data.animalId.replace( /^\D+/g, '')),
        date: data.date,
        user: data.user,
        animal: data.animal
    }
}
