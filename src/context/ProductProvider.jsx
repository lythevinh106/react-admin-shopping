import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import AlertModal from '../component/ALertModal/AlertModal';

import { useSnackbar } from 'notistack';
import ModalMain from '../component/ModalComp/ModalMain';


import DrawerMain from '../component/DrawerComp/DrawerMain';
import ModalRemove from '../component/ModalComp/ModalRemove/ModalRemove';
import DrawerCreate from '../component/DrawerComp/DrawerCreate/DrawerCreate';
import DrawerMainProduct from '../component/DrawerComp/DrawerMainProduct';

import { useDispatch } from 'react-redux';

import { activeMenu } from '../features/progress/progressSlice';
import FormCreateProduct from '../component/Form/FormCreateProduct/FormCreateProduct';
import ProductApi from '../ApiServices/ProductApi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

ProductProvider.propTypes = {

};

export const ProductContext = createContext();


export default function ProductProvider({ children }) {




    const navigate = useNavigate();
    let [searchParamsProduct, setSearchParamsProduct] = useSearchParams();
    let location = useLocation();


    const queryParam = queryString.parse(location.search)

    const [query, setQuery] = useState({})
    // console.log(queryParam);

    const [filter, setFilter] = useState({



        ...queryParam,
        page: parseInt(queryParam.page) || 1



    })

    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);



    const [isDrawer, setIsDrawer] = useState(false);
    const [productUpdate, setProductUpdate] = useState();
    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();


    useEffect(() => {

        (async () => {
            try {

                const response = await ProductApi.getAllProduct(filter);

                // console.log(response.data);
                setProducts(response.data)

                setTotalPage(response.last_page)


            } catch (error) {


            }
        })();



    }, [filter]);

    useEffect(() => {

        navigate(location.pathname + "?" + queryString.stringify(filter));

    }, [navigate, filter])



    const handleChangePage = (e, newPage) => {


        setFilter((prev) => {
            return {
                ...prev,
                page: newPage


            }
        })
    }



    const handleSortChange = (value) => {
        console.log(value);


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





    const deleteProduct = (id) => {
        setIsOpenRemove(id);
        // handleOnYesRemove(id);
    }
    const updateProduct = (id) => {


        setIsDrawer(true);

        const data = products.find((item) => {
            return item.id === id;
        })

        setProductUpdate(data)


    }
    // console.log(isDrawer)



    const handleOnYesRemove = async (id) => {


        // console.log(newItems);

        try {

            const ItemRemove = products.findIndex((product) => product.id === id);

            let newItems = [...products];
            newItems.splice(ItemRemove, 1);
            setProducts(newItems);
            setIsOpenRemove(false);
            enqueueSnackbar('Xóa sản phẩm thành công.', { variant: "success" });
            const response = await ProductApi.deleteProduct(id)




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

    const handleOnSubmit = (data) => {

        dispatch(activeMenu(true));
        ////doan nay nen gui len provider cua  tuwngf loai

        console.log(data)
        dispatch(activeMenu(false));



    }


    return (
        <ProductContext.Provider value={{
            products,
            deleteProduct,
            updateProduct,
            isOpenRemove,
            isDrawer,
            setIsDrawer,
            productUpdate,
            setProductUpdate,
            searchParamsProduct,
            setSearchParamsProduct,
            handleChangePage,
            handleSortChange,
            handleSearch,



            filter,
            totalPage



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
            <DrawerMainProduct
                component={<DrawerCreate component={<FormCreateProduct
                    productUpdate={productUpdate}
                    onSubmit={handleOnSubmit} />} />}
            />



        </ProductContext.Provider>
    );
}

