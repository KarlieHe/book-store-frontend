import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

export const orderAdapter = createEntityAdapter()
export const initialState = orderAdapter.getInitialState()

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllOrders: builder.query({
            query: () => '/orders',
            transformResponse: (responseData) => {
                const loadedOrders = responseData.map((order) => {
                    order.id = order._id
                    return order
                })
                return orderAdapter.setAll(initialState, loadedOrders)
            },
            providesTags: (result) =>
                result?.ids
                    ? [...result.ids.map((id) => ({ type: "Orders", id })), "Orders"]
                    : ["Orders"],
        }),
        fetchOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            transformResponse: (responseData) => {
                const loadedOrder = {...responseData, id: responseData._id}
                loadedOrder.createdAt = new Date(loadedOrder.createdAt).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })
                console.log("loadedOrder", loadedOrder)

                return orderAdapter.setOne(initialState,loadedOrder)
            },
            providesTags: (result, error, id) => [{ type: "Orders", id }],
        }),
        AddAnOrder: builder.mutation({
            query: (orderData) => ({
                url: "/orders/submit-order",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["Orders"],
        }),
        getOrdersByUserId: builder.query({
            query: () => `/orders/get-orders-by-user-id`,
            transformResponse: (responseData) => {
                const loadedOrders = responseData.map((order) => {
                    order.createdAt = new Date(order.createdAt).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })
                    order.id = order._id
                    return order
                })
                return orderAdapter.setAll(initialState, loadedOrders)
            },
            providesTags: (result) =>
                result?.ids
                    ? [...result.ids.map((id) => ({ type: "Orders", id })), "Orders"]
                    : ["Orders"],
        }),
    })
})

export const {
    useFetchAllOrdersQuery,
    useFetchOrderByIdQuery,
    useAddAnOrderMutation,
    useGetOrdersByUserIdQuery
} = ordersApi
export const selectOrdersResult = ordersApi.endpoints.fetchAllOrders.select()
export const selectOrdersData = createSelector(
    selectOrdersResult,
    (ordersResult) => ordersResult.data
)
export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds
} = orderAdapter.getSelectors(state => selectOrdersData(state) ?? initialState)