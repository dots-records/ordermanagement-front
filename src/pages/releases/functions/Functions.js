import { getReleases
  } from "../../../services/releaseService";


export const getSelectedTableReleases = async (selectedTable, numberPage, searchTerm) => {
    if(selectedTable == 'Active Releases') {
        if(searchTerm == null || searchTerm === "") {
            const response = await getReleases(numberPage, 50, false);
            return response;
        } else{
            const response = await getReleases(numberPage, 50, false, searchTerm);
            return response;
        }
        
    } else if(selectedTable == 'Inactive Releases'){

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getReleases(numberPage, 50, true);
            return response;
        } else{
            const response = await getReleases(numberPage, 50, true, searchTerm);
            return response;
        }
    } else if(selectedTable == 'All Releases'){
        
        if(searchTerm == null || searchTerm === "" ) {
            const response = await getReleases(numberPage, 50);
            return response;
        } else{
            const response = await getReleases(numberPage, 50, null, searchTerm);
            return response;
        }
        
    }
}