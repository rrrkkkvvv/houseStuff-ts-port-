import { useContext, useState } from 'react'

import { ThemeContext } from '../../contexts/theme-context'
import { ICategoriesProps } from './ICategories';

export default function Categories({ chooseCategory }: ICategoriesProps) {

    let themeData = useContext(ThemeContext);
    if (!themeData) {
        return <div>failed...</div>;
    }

    let [categories] = useState([
        {
            key: 'all',
            name: "All"
        },
        {
            key: 'chairs',
            name: "Chairs"
        },
        {
            key: 'tables',
            name: "Tables"
        },
        {
            key: 'sofa',
            name: "Sofa"
        },])

    return (
        <div className='categories' style={{ borderColor: themeData.reversedCurrentTheme.background }}>
            <div className="category category-choose" style={{ background: themeData.reversedCurrentTheme.background, color: themeData.reversedCurrentTheme.color }} onClick={() => showCategories()}>Choose Category </div>
            {categories.map(el => (
                <div className="category" style={{ background: "#eee", color: "#000" }} onClick={() => chooseCategory(el.key)} key={el.key}>{el.name}</div>
            ))}
        </div>
    )
    function showCategories() {
        document.querySelector('.categories')?.classList.toggle('visible');

        // if (window.screen.width <= 645) {

        //     if (document.querySelector('.categories')?.classList.contains('visible')) {
        //         document.querySelector('.categories')?.classList.remove('height-transition');

        //         setTimeout(() => {
        //             document.querySelector('.categories')?.classList.remove('visible');
        //         }, 500)
        //     } else {
        //         document.querySelector('.categories')?.classList.add('visible');
        //         setTimeout(() => {
        //             document.querySelector('.categories')?.classList.add('height-transition');
        //         }, 500);
        //     }
        // } else {
        //     document.querySelector('.categories')?.classList.remove('height-transition');
        //     document.querySelector('.categories')?.classList.toggle('visible');

        // }
    }
}



