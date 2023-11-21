'use client'
import { CustomFilter, Hero, SearchBar } from '@/components'
import CarCard from '@/components/CarCard';
import { HomeProps } from '@/types';
import { fetchCars } from '@/utils'
import { fuels,yearsOfProduction  } from '@/constant';

import Image from 'next/image'
import ShowMore from '@/components/ShowMore';
import { useEffect, useState } from 'react';

export default  function  Home(){
  const [allCarts, setAllCarts] = useState([]);
  const [loadin, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState("");

  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2002);
  const [limit, setLimit] = useState(10);
  const getCarts = async() => {
    try {
      setLoading(true)
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit:limit || 10,
        model:model || "",
      });
    setAllCarts(result)
    }
    catch (error){
      console.log(error);
    }
    finally{
      setLoading(false)
    }
 
}
  useEffect(() => {
    getCarts();

  },[fuel,limit,model,manufacturer])

  const isDataEmpty = !Array.isArray(allCarts) || allCarts.length < 1 || !allCarts;
  console.log(isDataEmpty);
  return (
    <main className='overflow-hidden'>
    <Hero />

    <div className='mt-12 padding-x padding-y max-width' id='discover'>
      <div className='home__text-container'>
        <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
        <p>Explore out cars you might like</p>
      </div>

      <div className='home__filters'>
        <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

        <div className='home__filter-container'>
          <CustomFilter setFilter={setFuel} title='fuel' options={fuels} />
          <CustomFilter setFilter={setYear} title='year' options={yearsOfProduction} />
        </div>
      </div>

        {allCarts.length >0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCarts?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {
              loadin && <div className="mt-16 w-full flex-center">
                <Image src={'./loader.svg'} className='object-contain' height={50} width={50} alt='loader'/>
              </div>
            }

            <ShowMore
            pageNumber={limit / 10}
              
            isNext={limit > allCarts.length}
            setLimit={setLimit}

            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCarts?.message}</p>
          </div>
        )}

      </div>

  
    </main>
  )
}
