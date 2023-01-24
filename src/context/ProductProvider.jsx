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
import FormUpdateProduct from '../component/Form/FormUpdateProduct/FormUpdateProduct';

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



        // ...queryParam,
        // page: parseInt(queryParam.page) 



    })

    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);



    const [isDrawer, setIsDrawer] = useState(false);
    const [productUpdate, setProductUpdate] = useState(null);
    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
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

    // useEffect(() => {

    //     navigate(location.pathname + "?" + queryString.stringify(filter));

    // }, [navigate, filter])


    useEffect(() => {
        if (isDrawer == true) {
            setProductUpdate(null);
        }


    }, [isDrawer])


    const handleChangePage = (e, newPage) => {

        setCurrentPage(newPage);
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



    const handleFilterCategoryChange = (value) => {
        // console.log(value);


        setFilter((prev) => {

            return {
                ...prev,
                page: 1,
                cat: value

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
    const updateProduct = async (id) => {


        setIsDrawer(true);

        const data = products.find((item) => {
            return item.id === id;
        })

        let productImages = []

        try {

            const response = await ProductApi.getAllProductImages(id);

            if (response?.code == 200) {
                response.data.forEach(image => {
                    productImages.push(image.name);
                });
            }

        } catch (error) {
            console.log(error);
        }
        // console.log(productImages);
        const newData = {
            ...data,
            product_images: productImages

        }

        setProductUpdate(newData)


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

    const handleOnCreateSubmit = async (data) => {
        dispatch(activeMenu(true));
        const dataRequest = {
            ...data,
            name: data.name,
            title: data.title,
            origin_price: data.origin_price,
            sale_price: data.sale_price,
            category_id: Number(data.category_id),
            description: data.description

        }


        console.log(dataRequest)

        try {

            const response = await ProductApi.addProduct(dataRequest);
            // const responseData = await response.data;

            if (response.original.status == 200) {
                enqueueSnackbar('Thêm sản phẩm thành công.', { variant: "success" });

                const dataResponse = response?.original?.data;

                setProducts((prev) => {

                    return [
                        dataResponse,
                        ...prev

                    ]

                })
                console.log(dataResponse);




            } else {
                enqueueSnackbar(`Thêm sản phẩm thất bại. ${response?.original?.message} `, { variant: "error" });

            }







        } catch (error) {

            enqueueSnackbar('Thêm sản phẩm thất bại.', { variant: "error" });
            dispatch(activeMenu(false));
            throw new Error(error.message);

        }




        dispatch(activeMenu(false));


    }



    const handleOnUpdateSubmit = async (data) => {

        // return;

        dispatch(activeMenu(true));
        const dataRequest = {
            ...data,
            name: data.name,
            title: data.title,
            origin_price: data.origin_price,
            sale_price: data.sale_price,
            category_id: Number(data.category_id),
            description: data.description

        }

        if (data.product_images.length <= 0) {
            delete dataRequest.product_images
        }
        if (data.image.length <= 0) {
            delete dataRequest.image
        }




        // console.log(dataRequest)

        try {

            const response = await ProductApi.updateProduct(data.id, dataRequest);
            // const responseData = await response.data;

            if (response.original.status == 200) {
                enqueueSnackbar('Cập nhật sản phẩm thành công.', { variant: "success" });

                const dataResponse = response?.original?.data;


                const findProductId = products.findIndex((product) => product.id == data.id);

                products[findProductId] = {
                    ...dataResponse
                }
                console.log(dataResponse);




            } else {
                enqueueSnackbar(`Cập nhật sản phẩm thất bại. ${response?.original?.message} `, { variant: "error" });

            }


        } catch (error) {

            enqueueSnackbar('Thêm sản phẩm thất bại.', { variant: "error" });
            throw new Error(error.message);
            dispatch(activeMenu(false));
        }




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
            handleFilterCategoryChange,
            currentPage,



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


            {/* {console.log()} */}
            <DrawerMainProduct
                component={<DrawerCreate


                    component={
                        productUpdate == null ?
                            <FormCreateProduct

                                onSubmit={handleOnCreateSubmit} />
                            :
                            <FormUpdateProduct
                                productUpdate={productUpdate}
                                onSubmit={handleOnUpdateSubmit} />



                    } />}
            />







        </ProductContext.Provider>
    );
}

