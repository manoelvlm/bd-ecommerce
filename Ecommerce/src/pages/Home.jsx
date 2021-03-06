import Header from "../componets/Header";
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../componets/NavBar";
import Footer from "../componets/Footer";
import BreadCrumb from "../componets/BreadCrumb";
import Produto from "../componets/Produto";
import { set } from 'express/lib/application';
import Slider from "../componets/Slider";
import Banner from "../componets/Banner";
const axios = require('axios').default;
const url = 'http://localhost:3001';

const Home = () => {

    const [produtos, setProdutos] = useState([]);
    
    const getProduto = async () => {
        try {
            const response = await fetch('http://localhost:3001',
                { method: 'GET', headers: {'Content-Type': 'aplication/json'} } );
            const data = await response.json();
            setProdutos(data);
        } catch (ex) {
            console.log(ex);
        }
    }

    const renderProduto = (produtos) => {
        return (
            produtos.map(({ id_produto, nome_produto, preco, link_img}) => {
                return <Produto title={nome_produto} id={id_produto} preco={preco} 
                            img={link_img} />
            })
        )
    }
      
    useEffect(() => {
        getProduto()
    }, [])

    return (
        <div>
            <Header /> {/*chamada da function Header*/}
            <NavBar /> {/*chamada da function NavBar*/}
            <main>
                <Slider/>
                <Banner />
                {/*Mais populares*/}
                <section className="container produtos">
                    <h1 className="text-center">Todos Produtos</h1>
                    {/*Listagem dos produtos*/}
                    <article className="row">
                        {renderProduto(produtos)}
                    </article>
                    {/*fim listagem de produtos*/}
                </section>
            </main>
            <Footer /> {/*chamada da function Footer*/}
        </div>
    );
}

export default Home;

