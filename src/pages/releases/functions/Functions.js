import { getAllReleases, getArchivedReleases, getUnarchivedReleases, searchAllReleases,
    searchArchivedReleases, searchUnarchivedReleases
  } from "../../../services/releaseService";


export const getSelectedTableReleases = async (selectedTable, numberPage, searchTerm) => {
    if(selectedTable == 'Active Releases') {
        if(searchTerm == null || searchTerm === "") {
            const response = await getUnarchivedReleases(numberPage);
            return response;
        } else{
            const response = await searchUnarchivedReleases(numberPage, searchTerm);
            return response;
        }
        
    } else if(selectedTable == 'Inactive Releases'){

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getArchivedReleases(numberPage);
            return response;
        } else{
            const response = await searchArchivedReleases(numberPage, searchTerm);
            return response;
        }
    } else if(selectedTable == 'All Releases'){
        
        if(searchTerm == null || searchTerm === "" ) {
            const response = await getAllReleases(numberPage);
            return response;
        } else{
            const response = await searchAllReleases(numberPage, searchTerm);
            return response;
        }
        
    }
}