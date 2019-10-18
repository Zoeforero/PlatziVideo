import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import userInitialState from '../hooks/useInitialState';
import '../assets/styles/App.scss';
import { constants } from 'zlib';

const Home = ({ mylist, trends, originals}) => {
    return (
        <React.Fragment>
            <Search isHome />
            {mylist.length > 0 && 
                <Categories title="Mi lista">
                    <Carousel>
                        {mylist.map(item =>
                            <CarouselItem 
                                key={item.id} 
                                {...item}
                                isList
                            />
                        )}
                    </Carousel>
                </Categories>
            }
            <Categories title="Tendencias">
                <Carousel>
                    {trends.map(item =>
                        <CarouselItem key={item.id} {...item}/>
                    )}
                </Carousel>
            </Categories>

            <Categories title="Originales de platzi video">
                <Carousel>
                    {originals.map(item =>
                        <CarouselItem key={item.id} {...item}/>
                    )}
                </Carousel>
            </Categories>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        mylist: state.mylist,
        trends: state.trends,
        originals: state.originals,
    };
};

export default connect(mapStateToProps, null)(Home);