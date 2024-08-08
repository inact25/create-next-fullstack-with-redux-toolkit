"use client"
import React from 'react';
import HomePage from "@/app/homepage/page";
import {Provider} from "react-redux";
import store from "@/store";

const Page = () => {
    return (
        <Provider store={store}>
          <HomePage/>
        </Provider>
    );
};

export default Page;
