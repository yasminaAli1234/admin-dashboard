import { Route, Routes } from "react-router-dom";
import Page_selection_category from "./Pages/Category/Page_selection_category";
import ShareCategory from "./Pages/Category/Share_category";
import Add_category from "./Pages/Category/Add_category";


const NewPage =() =>{

    return(
        <>
        <Routes>
        <Route path="/category/add" element={<Add_category />} />
        <Route path="/page_selection/:type" element={<Page_selection_category />} />
        <Route path="/share_category" element={<ShareCategory />} />
        </Routes>
        </>
    )
}

export default NewPage;