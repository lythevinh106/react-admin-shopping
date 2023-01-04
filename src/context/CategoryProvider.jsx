import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import AlertModal from '../component/ALertModal/AlertModal';

import { useSnackbar } from 'notistack';
import ModalMain from '../component/ModalComp/ModalMain';
import ModalRemoveProduct from '../component/ModalComp/ModalRemove/ModalRemove';

import DrawerMain from '../component/DrawerComp/DrawerMain';
import ModalRemove from '../component/ModalComp/ModalRemove/ModalRemove';
import DrawerMainProduct from '../component/DrawerComp/DrawerMainProduct';
import DrawerCreate from '../component/DrawerComp/DrawerCreate/DrawerCreate';

import DrawerMainCategory from '../component/DrawerComp/DrawerMainCategory';
import FormCreateCategory from '../component/Form/FormCreateCategory/FormCreateCategory';
import axios from 'axios';
import CategoryApi from '../ApiServices/CategoryApi';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';



export const CategoryContext = createContext();




export default function CategoryProvider({ children }) {


    let [searchParamsCategory, setSearchParamsCategory] = useSearchParams();
    let location = useLocation();

    const [categories, setCategories] = useState([]);


    const queryParam = queryString.parse(location.search)
    const [query, setQuery] = useState({})
    // console.log(queryParam);
    const [filter, setFilter] = useState({
        page: 1,
        limit: 5,
        ...queryParam,
    })

    // console.log("filter", filter);
    // console.log("query", query);

    const [totalPage, setTotalPage] = useState(0);

    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const [isDrawer, setIsDrawer] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState();
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {

        (async () => {
            try {

                const response = await CategoryApi.getAllCategory(filter);

                setCategories(response.data)
                setTotalPage(response.last_page)


            } catch (error) {


            }
        })();



    }, [filter, query])

    useEffect(() => {

        // setFilter((prev) => {
        //     return {
        //         ...prev,
        //         ...query
        //     }
        // })

        setSearchParamsCategory({
            ...query
        })


    }, [query])





    const handleChangePage = (e, newPage) => {
        // console.log(newPage);
        // console.log(allParam);
        setQuery((prev) => {
            return {
                ...prev,
                page: newPage

            }
        })


        setFilter((prev) => {
            return {
                ...prev,
                page: newPage


            }
        })
    }

    const handleSortChange = (value) => {
        console.log(value);

        setQuery((prev) => {
            return {
                ...prev,
                sort: value

            }
        })
        setFilter((prev) => {
            return {
                ...prev,
                sort: value

            }
        })



    }


    const handleSearch = (e) => {
        // console.log(e.target.value);
        let length = e.target.value.trim().length;
        setQuery((prev) => {

            return {
                ...prev,
                search: e.target.value
            }
        })


        setFilter((prev) => {
            return {
                ...prev,
                page: 1,
                search: e.target.value,
            }
        })
        // if (e.target.value.trim() != "" && length > 0) {

        //     setQuery((prev) => {
        //         return {
        //             ...prev,
        //             search: e.target.value,
        //         }
        //     })
        // }
        // else {
        //     console.log("bang 0")
        //     setQuery((prev) => {
        //         delete prev.search;
        //         return {
        //             ...prev,



        //         }
        //     })
        // }

    }


    const deleteCategory = (id) => {
        setIsOpenRemove(id);
        // handleOnYesRemove(id);
    }
    const updateCategory = (id) => {

        console.log("category", id)

        setIsDrawer(true);

        const data = categories.find((item) => {
            return item.id === id;
        })

        setCategoryUpdate(data)



    }



    const handleOnYesRemove = async (id) => {


        // console.log(newItems);

        try {
            const response = await CategoryApi.deleteCategory(id)
            // const ItemRemove = categories.findIndex((category) => category.id === id);
            // let newItems = [...categories];

            // newItems.splice(ItemRemove, 1);
            setFilter(filter);
            setIsOpenRemove(false);

        } catch (error) {
            enqueueSnackbar('Xóa danh mục thất bại.', { variant: "error" });
        }



        enqueueSnackbar('Xóa danh mục thành công.', { variant: "success" });
    }

    const handleOnNoRemove = () => {

        setIsOpenRemove(false);
    }


    const handleCloseAlert = () => {
        setIsAlert(false);
    }

    const handleOnSubmit = () => {

    }


    return (
        <CategoryContext.Provider value={{
            categories,
            deleteCategory,
            updateCategory,
            filter,
            setFilter,
            isOpenRemove, handleOnYesRemove, handleOnNoRemove,
            isDrawer,
            setIsDrawer,
            categoryUpdate,
            setCategoryUpdate,
            totalPage,
            handleChangePage,
            handleSortChange,
            handleSearch


        }}>
            {children}


            {isOpenRemove !== false ? <ModalMain
                component={<ModalRemove onYEsRemove={() => handleOnYesRemove(isOpenRemove)}
                    onNoRemove={handleOnNoRemove}
                />}
                oncloseRemoveBtn={() => {
                    setIsOpenRemove(false)
                }} /> : <></>
            }

            <DrawerMainCategory
                component={<DrawerCreate component={<FormCreateCategory
                    // productUpdate={ }
                    onSubmit={handleOnSubmit} />} />}
            />









        </CategoryContext.Provider>
    );
}

