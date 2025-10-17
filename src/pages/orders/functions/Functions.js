import { getOrders, 
    getOrdersInformation} from "../../../services/orderService";



export const getSelectedTableOrders = async (selectedTable, numberPage, searchTerm) => {
    console.log('getSelectedTableOrders('+selectedTable+')')
    if(selectedTable == 'Active Orders') {
        if(searchTerm == null || searchTerm === "") {
            const response = await getOrders(numberPage, 50, false);
            return response;
        } else{
            const response = await getOrders(numberPage, 50, false, searchTerm);
            return response;
        }
        
    } else if(selectedTable == 'Inactive Orders'){

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getOrders(numberPage, 50, true);
            return response;
        } else{
            const response = await getOrders(numberPage, 50, true, searchTerm);
            return response;
        }
    } else if(selectedTable == 'All Orders'){
        

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getOrders(numberPage, 50);
            return response;
        } else{
            const response = await getOrders(numberPage, 50, null, searchTerm);
            return response;
        }
        
    }
}

export const getLastUpdateDiscogs = async () => {
    const response = await getOrdersInformation();
    return response;      
}