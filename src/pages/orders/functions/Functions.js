import { getUnarchivedOrders, getArchivedOrders, 
    getAllOrders, searchUnarchivedOrders, 
    searchArchivedOrders, searchAllOrders, getOrders, 
    getOrdersInformation, getOrdersByArchived} from "../../../services/orderService";



export const getSelectedTableOrders = async (selectedTable, numberPage, searchTerm) => {
    console.log('getSelectedTableOrders('+selectedTable+')')
    if(selectedTable == 'Active Orders') {
        if(searchTerm == null || searchTerm === "") {
            const response = await getOrdersByArchived(numberPage, false);
            return response;
        } else{
            const response = await searchUnarchivedOrders(numberPage, searchTerm);
            return response;
        }
        
    } else if(selectedTable == 'Inactive Orders'){

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getOrdersByArchived(numberPage, true);
            return response;
        } else{
            const response = await searchArchivedOrders(numberPage, searchTerm);
            return response;
        }
    } else if(selectedTable == 'All Orders'){
        

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getOrders(numberPage);
            return response;
        } else{
            const response = await searchAllOrders(numberPage, searchTerm);
            return response;
        }
        
    }
}

export const getLastUpdateDiscogs = async () => {
    const response = await getOrdersInformation();
    return response;      
}