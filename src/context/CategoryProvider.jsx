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
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { Category } from '@mui/icons-material';
import FormUpdateCategory from '../component/Form/FormUpdateCategory/FormUpdateCategory';




export const CategoryContext = createContext();




export default function CategoryProvider({ children }) {

    const navigate = useNavigate();
    let [searchParamsCategory, setSearchParamsCategory] = useSearchParams();
    let location = useLocation();

    const [categories, setCategories] = useState([]);

    const queryParam = queryString.parse(location.search)
    const [filter, setFilter] = useState({



        ...queryParam,
        page: parseInt(queryParam.page) || 1



    })



    const [totalPage, setTotalPage] = useState(0);

    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const [isDrawer, setIsDrawer] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState(null);
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



    }, [filter])




    useEffect(() => {

        navigate(location.pathname + "?" + queryString.stringify(filter));

    }, [navigate, filter])



    useEffect(() => {
        if (isDrawer == true) {
            setCategoryUpdate(null);
        }


    }, [isDrawer])



    const handleChangePage = (e, newPage) => {


        setFilter((prev) => {
            return {
                ...prev,
                page: newPage


            }
        })
    }

    const handleSortChange = (value) => {

        setFilter((prev) => {
            return {
                ...prev,
                sort: value

            }
        })



    }


    const handleSearch = (e) => {

        let length = e.target.value.trim().length;


        setFilter((prev) => {
            return {
                ...prev,
                page: 1,
                search: e.target.value,
            }
        })


    }


    const deleteCategory = (id) => {
        setIsOpenRemove(id);
        // handleOnYesRemove(id);
    }
    const updateCategory = (id) => {


        setIsDrawer(true);

        (async () => {
            try {
                const response = await CategoryApi.showCategory(id)
                // console.log(response.data);
                // setCategory(response.data);
                setCategoryUpdate(response.data)

            } catch (error) {

            }
        })();



    }



    const handleOnYesRemove = async (id) => {




        try {

            const ItemRemove = categories.findIndex((category) => category.id === id);
            let newItems = [...categories];
            newItems.splice(ItemRemove, 1);
            setCategories(newItems);
            setIsOpenRemove(false);
            enqueueSnackbar('Xóa danh mục thành công.', { variant: "success" });
            const response = await CategoryApi.deleteCategory(id)
        } catch (error) {
            enqueueSnackbar('Xóa danh mục thất bại.', { variant: "error" });
        }




    }

    const handleOnNoRemove = () => {

        setIsOpenRemove(false);
    }


    const handleCloseAlert = () => {
        setIsAlert(false);
    }

    const handleOnSubmitCreate = async (data, idUpdate = -1) => {



        console.log("data create", data);

        try {
            const newData = {
                name: data.name,
                slug: data.slug,
                active: data.active,
            }

            const newCategories = [...categories];
            newCategories.unshift(newData);
            setCategories(newCategories);
            const response = await CategoryApi.addCategory(newData)

            enqueueSnackbar('Thêm Danh Mục Thành Công.', { variant: "success" });
        } catch (error) {
            enqueueSnackbar('Thêm Danh Mục Thất Bại.', { variant: "error" });

        }


    }

    const handleOnSubmitUpdate = async (data) => {



        console.log("update category", data.id);

        try {
            const newData = {
                name: data.name,
                slug: data.slug,

            }

            const findCategoryId = categories.findIndex((category) => category.id == data.id);

            categories[findCategoryId] = {
                ...categories[findCategoryId],
                ...newData
            }


            // setCategories((prev) => {


            //     return [
            //         ...prev,
            //         prev[findCategoryId] = {
            //             ...categories[findCategoryId],
            //             ...newData
            //         }
            //     ]
            // });
            const response = await CategoryApi.updateCategory(data.id, data)

            enqueueSnackbar('Sửa Danh Mục Thành Công.', { variant: "success" });
        } catch (error) {
            enqueueSnackbar('Sủa Danh Mục Thất Bại.', { variant: "error" });

        }


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
            handleSearch,
            categoryUpdate, setCategoryUpdate


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
                component={<DrawerCreate component={

                    categoryUpdate == null ?
                        <FormCreateCategory

                            onSubmitCreate={handleOnSubmitCreate} />
                        : <FormUpdateCategory
                            categoryUpdate={categoryUpdate}

                            onSubmitUpdate={handleOnSubmitUpdate} />





                }



                />}
            />









        </CategoryContext.Provider>
    );
}

