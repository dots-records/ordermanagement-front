import { getUnarchivedOrders, getArchivedOrders, getAllOrders, searchUnarchivedOrders, searchArchivedOrders, searchAllOrders } from "../../../services/orderService";



export const getSelectedTableOrders = async (selectedTable, numberPage, searchTerm) => {
    console.log('getSelectedTableOrders('+selectedTable+')')
    if(selectedTable == 'Active Orders') {
        if(searchTerm == null || searchTerm === "") {
            const response = await getUnarchivedOrders(numberPage);
            return response;
        } else{
            const response = await searchUnarchivedOrders(numberPage, searchTerm);
            return response;
        }
        
    } else if(selectedTable == 'Inactive Orders'){

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getArchivedOrders(numberPage);
            return response;
        } else{
            const response = await searchArchivedOrders(numberPage, searchTerm);
            return response;
        }
    } else if(selectedTable == 'All Orders'){
        

        if(searchTerm == null || searchTerm === "" ) {
            const response = await getAllOrders(numberPage);
            return response;
        } else{
            const response = await searchAllOrders(numberPage, searchTerm);
            return response;
        }
        
    }
}