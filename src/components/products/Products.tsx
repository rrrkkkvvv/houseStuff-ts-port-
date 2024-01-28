import Product from './Product'
import { IProductsProps } from './IProducts'

export default function Products({ onShowItem, items }: IProductsProps) {
    return (
        <main >
            {items.map((el) => (
                <Product onShowItem={onShowItem} key={el.id} item={el} />
            ))}
        </main>
    )
}

