import Header from './components/header/Header'
import Footer from './components/Footer'
import { useState, useEffect, useContext } from 'react';
import Products from './components/products/Products';
import Categories from './components/Categories';
import Modal from './components/Modal';
import { PopUpContext } from './contexts/popUp-context';
import { ThemeContext } from './contexts/theme-context';
import OrdersContextProvider from './contexts/orders-context';
import Search from './components/Search';
import { IOrder } from './types/context types/IOrdersContext';
import Pagination from './components/Pagination';
//To deploy a gh pages use: npm run predeploy    npm run deploy

const urlWithProducts = "https://raw.githubusercontent.com/rrrkkkvvv/products.github.io/main/productsForHstuff.json"

export default function App() {



  const popUpContext = useContext(PopUpContext)

  const themeData = useContext(ThemeContext)


  if (!popUpContext || !themeData) {
    return <div>failed...</div>;
  }


  let [items, setItems] = useState<IOrder[]>([])
  let [currentItems, setCurrentItems] = useState<IOrder[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  useEffect(() => {


    async function fetchProductsData() {
      try {
        const promise = await fetch(urlWithProducts);

        if (!promise.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await promise.json();

        setCurrentItems(data)
        setItems(data)
      } catch (error) {
        console.error('Error here!:', error);
        setCurrentItems([])
        setItems([])
      }

    }
    fetchProductsData()
    let lastScroll = 0

    const header = document.querySelector('.header')
    const cart = document.querySelector('.shop-cart')

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop

    const containHide = () => header?.classList.contains('hideHeader') ? true : false

    function handleScroll() {
      if (!cart?.classList.contains('visible')) {
        if (scrollPosition() > lastScroll && !containHide()) {
          header?.classList.add('hideHeader')
        } else if (scrollPosition() < lastScroll && containHide()) {
          header?.classList.remove('hideHeader')

        }
        lastScroll = scrollPosition()
      }

    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [])
  useEffect(() => {

  }, [currentPage])
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentPageItems = currentItems.slice(firstItemIndex, lastItemIndex);



  const paginate = (pageNumber: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault()
    setCurrentPage(pageNumber);

  }

  const nextPage = (): void => {

    if (currentPage < Math.ceil(currentItems.length / itemsPerPage)) {
      setCurrentPage((prev) => prev += 1);

    } else {
      setCurrentPage(1)

    }

  }
  const prevPage = (): void => {
    if (currentPage > 1) {

      setCurrentPage((prev) => prev -= 1);

    } else {
      setCurrentPage(Math.ceil(currentItems.length / itemsPerPage));

    }
  }


  let [showFullItem, setShowFullItem] = useState(false)
  let [fullItem, setFullItem] = useState<IOrder>(Object)

  let [showModalAbout, setShowModalAbout] = useState(false)
  let [showModalContact, setShowModalContact] = useState(false)

  useEffect(() => {
    if (showModalContact === true || showModalAbout === true) {
      document.body.classList.add('lock')
    } else {
      document.body.classList.remove('lock')
    }
  }, [showModalAbout, showModalContact])

  return (


    <div className='wrapper' style={{ background: themeData.currentTheme.background, color: themeData.currentTheme.color }}>

      <OrdersContextProvider>

        <Header onShowModal={onShowModal} />
        <div className='presentation'></div>

        <Search searchFilter={searchFilter} />
        <Categories chooseCategory={chooseCategory} />
        <Products onShowItem={onShowItem} items={currentPageItems} />

        <div className={`notification ${popUpContext.showPopUp ? 'visible' : ''} ${popUpContext.popUpBgRed ? 'red' : 'green'}`}>
          <p>{popUpContext.popUpText}</p>
        </div>
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={currentPage}
          paginateFn={paginate}
          itemsPerPage={itemsPerPage}
          totalItems={currentItems.length}
        />
        <Modal
          type={"full-item"}
          item={fullItem}
          show={showFullItem}
          onShowItem={onShowItem}
        />
        <Modal
          type={"information"}

          show={showModalAbout}
          onShowModal={onShowModal}
          title={"About us"}
          textContent={
            <>
              <p>We are a home furniture store, and we are selling the best stuff for your home</p>
            </>} />
        <Modal
          type={"information"}

          show={showModalContact}
          onShowModal={onShowModal}
          title={"Contact with us"}
          textContent={<div className='modal-text-content'>
            <h3>Phone:  <a>+48000999222</a></h3>
            <h3>Instagram:  <a>@HouseStaffInst</a></h3>
            <h3>Facebook: <a>@HouseStaffFacebook</a></h3>
          </div>} />

        <Footer />
      </OrdersContextProvider>

    </div>


  )

  function chooseCategory(category: string) {
    setCurrentPage(1)
    if (category === "all") {
      return setCurrentItems(currentItems = items)
    }

    setCurrentItems(currentItems = items.filter(el => el.category === category))
  }
  function checkAllLetters(name: string, charArray: string[]) {

    const countMap: { [key: string]: number } = {}

    for (const letter of name) {
      countMap[letter] = (countMap[letter] || 0) + 1
    }

    return charArray.every((letter) => {


      const countNameChars = countMap[letter] || 0
      const countArrayChars = charArray.filter((el) => el === letter).length


      return countNameChars >= countArrayChars

    })

  }


  function searchFilter(value: string) {
    if (value != '') {
      setTimeout(() => {
        let inputValue = value.trim().toLowerCase()
        let splitValue = inputValue.split('')



        let newCurrItems = items.filter(el => checkAllLetters(el.title.toLowerCase(), splitValue))

        setCurrentItems(currentItems = newCurrItems)

      }, 300);

    } else {
      setCurrentItems(currentItems = items)

    }


  }

  function onShowItem(item: IOrder) {
    setFullItem(fullItem = item)
    setShowFullItem(showFullItem = !showFullItem)
    document.body.classList.toggle('lock')

  }

  function onShowModal(type: string) {

    if (type === "about") {
      setShowModalAbout(showModalAbout = !showModalAbout)
    } else if (type === "contacts") {
      setShowModalContact(showModalContact = !showModalContact)
    } else if (type === "cabinet") {
    } else {
      setShowModalAbout(showModalAbout = false)
      setShowModalContact(showModalContact = false)

    }


  }





}

