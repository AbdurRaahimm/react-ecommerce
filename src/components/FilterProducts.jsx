import { formatPrice } from "../libs/formatPrice"


export default function FilterProducts({ state, products, setState }) {
    return (
        <div className="space-y-8 overflow-y-scroll h-screen">
            {/* search product */}
            <div className="space-y-2">
                <h6 className="text-sky-600 font-bold text-xl">Search Products</h6>
                <input
                    onChange={(e) => setState({ ...state, search: e.target.value })}
                    type="search" placeholder="Search Products" className="w-full p-2 rounded-md focus:outline-none" />
            </div>

            {/* categories */}
            <div className="space-y-2">
                <h6 className="text-sky-600 font-bold text-xl">Categories</h6>
                <ul className="space-y-2">
                    <li><button
                        onClick={() => setState({ ...state, category: 'All Products' })}
                        className="text-gray-500">All Products</button></li>

                    {/* unique categories */}

                    {
                        [...new Set(products.map((product) => product.category))].map((category) => {
                            return <li key={category}>
                                <button
                                    onClick={() => setState({ ...state, category })}
                                    className="text-gray-500 capitalize">
                                    {category}
                                    ({products.filter((product) => product.category === category).length})
                                    {state.category === category && <span className="text-sky-500"> &#10003;</span>}
                                </button></li>
                        })
                    }
                </ul>
            </div>



            {/* brands */}
            <div className="space-y-2">
                <h6 className="text-sky-600 font-bold text-xl">Brands</h6>
                <ul className="space-y-2">
                    <li><button
                        onClick={() => setState({ ...state, brand: 'All Brands' })}
                        className="text-gray-500">All Brands</button>
                    </li>

                    {/* unique company */}
                    {
                        products.map((product) => product.company).filter((value, index, self) => self.indexOf(value) === index).map((company) => {
                            return <li key={company}>
                                <button
                                    onClick={() => setState({ ...state, brand: company })}
                                    className="text-gray-500 capitalize">
                                    {company}
                                    ({products.filter((product) => product.company === company).length})
                                    {state.brand === company && <span className="text-sky-500"> &#10003;</span>}
                                </button></li>
                        })
                    }
                </ul>
            </div>

            {/* colors */}
            <div className="space-y-2">
                <h6 className="text-sky-600 font-bold text-xl">Colors</h6>
                <ul className=" flex space-x-4">
                    <li><button onClick={() => setState({ ...state, color: 'All' })} className="size-4 rounded-full">All</button></li>
                    {
                        products.map((product) => product.colors).flat().filter((value, index, self) => self.indexOf(value) === index).map((color) => {
                            return <li key={color}>
                                <button
                                    onClick={() => setState({ ...state, color })}
                                    style={{ backgroundColor: color }}
                                    className="size-4 rounded-full">
                                    {state.color === color && <span className="text-sky-500"> &#10003;</span>}
                                </button>
                            </li>
                        })
                    }
                </ul>
            </div>

            {/* price range */}
            <div className="space-y-2">
                <h6 className="text-sky-600 font-bold text-xl">Price Range</h6>
                {/* range */}
                <input
                    onChange={(e) => setState({ ...state, price: e.target.value })}
                    type="range" max={10000} className="w-full" />
                <div className="flex justify-between">
                    {
                        state.price === 0 ? <span>0</span> : <span>{formatPrice(state.price)}</span>
                    }
                </div>

            </div>

            {/* clear */}
            <button
                onClick={() => setState({
                    search: '',
                    category: 'All Products',
                    brand: 'All Brands',
                    color: 'All',
                    price: 0,
                    stars: 0,
                    sortCriteria: '',
                })}
                className="w-full bg-sky-500 text-white rounded-md py-2 mt-3">Clear All</button>


        </div>
    )
}
