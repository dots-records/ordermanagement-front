import { getReleases } from "../../../services/releaseService";

export const getReleasesAndSearch = async ( numberPage, searchTerm) => {
        if(searchTerm == null || searchTerm === "") {
            const response = await getReleases(numberPage);
            return response;
        } else{
            const response = "Not done"
            return response;
        } 
}