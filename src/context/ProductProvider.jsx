import React, { createContext, useContext, useState } from 'react';
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

ProductProvider.propTypes = {

};

export const ProductContext = createContext();


export default function ProductProvider({ children }) {

    const Listproducts = [
        {
            id: 1,
            name: "san pham 1",
            oldPrice: 5000000,
            salePrice: 9000000,
            img: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/09/07/image-removebg-preview-10.png"

        },

        {
            id: 2,
            name: "san pham 2",
            description: "nnoi dung san pham 1",
            oldPrice: 5000000,
            salePrice: 9000000,
            img: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/07/11/image-removebg-preview-31.png"

        },
        {
            id: 3,
            name: "san pham 3",
            description: "nnoi dung san pham 1",
            oldPrice: 5000000,
            salePrice: 9000000,
            img: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/10/18/image-removebg-preview-53.png"
        },
        {
            id: 4,
            name: "san pham 4",
            description: "nnoi dung san pham 1",
            oldPrice: 5000000,
            salePrice: 9000000,
            img: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/04/10/image-removebg-preview.png"
        }

    ]

    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [products, setProducts] = useState(Listproducts);
    const [isDrawer, setIsDrawer] = useState(false);
    const [productUpdate, setProductUpdate] = useState();



    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();


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



    const handleOnYesRemove = (id) => {

        const ItemRemove = products.findIndex((product) => product.id === id);
        let newItems = [...products];
        newItems.splice(ItemRemove, 1);
        // console.log(newItems);

        setProducts(newItems);
        setIsOpenRemove(false);

        enqueueSnackbar('Xóa Sản Phẩm Thành Công', { variant: "success" });
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
        setTimeout(() => {
            console.log(data)
            dispatch(activeMenu(false));

        }, 3000)

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
            setProductUpdate


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

