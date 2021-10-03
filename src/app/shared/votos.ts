export interface VotosInterface {
    id?: string;
    idComentario: string; 
    idOwnerComentario:string;
    voto:[ idUser:string]
}

export interface VotosInterfacePubli {
    id?: string;
    idPublicacion: string; 
    idOwnerPublic:string;
    voto:[ idUser:string]
}