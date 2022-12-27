import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";


// export const postCart = createAsyncThunk('cart/postCart', async (cart) => {
//     const res = await fetch('http://localhost:5000/addcart', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cart)
//     });

// })


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        change: false

    },
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items || [];
            state.totalQuantity = action.payload.totalQuantity;
        },

        addItemToCart(state, action) {
            const newItem = action.payload;
            const exitingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++;
            state.change = true;
            if (!exitingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    name: newItem.title,
                    totalPrice: newItem.price
                })

            }
            else {
                exitingItem.quantity++;
                exitingItem.totalPrice = exitingItem.totalPrice + newItem.price

            }
        },
        removeItemToCart(state, action) {
            const id = action.payload;
            const exitingItem = state.items.find(item => item.id === id)
            state.totalQuantity--;
            state.change = true;
            if (exitingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            }
            else {
                exitingItem.quantity--;
                exitingItem.totalPrice = exitingItem.totalPrice - exitingItem.price;
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(postCart.pending, (state, payload) => {
    //             state.showNotifucation = {
    //                 status: "pending",
    //                 title: 'Sending...',
    //                 message: 'Sending cart data',

    //             }
    //         })
    //         .addCase(postCart.fulfilled, (state, payload) => { })
    //         .addCase(postCart.rejected, (state, payload) => { })
    // }

});

export const fatchCartData = () => {
    return async (dispatch) => {
        const fatchData = async () => {
            const responce = await fetch('https://redux-with-maximilia-default-rtdb.firebaseio.com/items.json')

            if (!responce.ok) {
                throw new Error('Could not fatch cart data!')
            }
            const data = responce.json();
            return data;
        }
        try {
            const cartData = await fatchData()
            // console.log(cartData)
            dispatch(cartActions.replaceCart(cartData))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fething cart data failed'
            }));
        }
    }
}


export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data'
        }));
        const sendRequest = async () => {
            const responce = await fetch('https://redux-with-maximilia-default-rtdb.firebaseio.com/items.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });

            if (!responce.ok) {
                throw new Error('Sending cart data failed');
            }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Send cart data successfully'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed'
            }));
        }

    }
}


export const cartActions = cartSlice.actions;
export default cartSlice;