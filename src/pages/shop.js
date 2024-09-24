import Productos from "../components/products";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';


export default function Shop(){
    return(
        <>

<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 100, opacity: 0 }}
  transition={{
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
    duration: 0.5,
  }}
>


            <div className="container" id="store-page">
                <div className="row">
              {/*<!-- Sidebar -->*/}
        <div className="col-md-2">
            <div className="bg-light p-3">
               {/*  <!-- Filter by Category --> */}
                <h5 className="mb-3">Categories</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input type="checkbox" id="category1"/>
                        <label for="category1">Category 1</label>
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" id="category2"/>
                        <label for="category2">Category 2</label>
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" id="category3"/>
                        <label for="category3">Category 3</label>
                    </li>
                </ul>

              {/*   <!-- Filter by Price --> */}
                <h5 className="mt-4 mb-3">Price</h5>
                <input type="range" className="form-range" min="0" max="1000" id="priceRange"/>
                <div className="d-flex justify-content-between">
                    <span>$0</span>
                    <span>$1000</span>
                </div>

               {/*  <!-- Filter by Brand --> */}
                <h5 className="mt-4 mb-3">Brand</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input type="checkbox" id="brand1"/>
                        <label for="brand1">Brand 1</label>
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" id="brand2"/>
                        <label for="brand2">Brand 2</label>
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" id="brand3"/>
                        <label for="brand3">Brand 3</label>
                    </li>
                </ul>

              {/*   <!-- Filter by Rating --> */}
                <h5 className="mt-4 mb-3">Rating</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input type="checkbox" id="rating5"/>
                        <label for="rating5">5 Stars</label>
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" id="rating4"/>
                        <label for="rating4">4 Stars & up</label>
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" id="rating3"/>
                        <label for="rating3">3 Stars & up</label>
                    </li>
                </ul>

                {/* <!-- Apply Filters Button --> */}
                <button className="btn btn-primary mt-4 w-100">Apply Filters</button>
            </div>
        </div>

                    <div className="col-md-10">
                        <div className="container-fluid">
                            <div className="row">
                        
                            <Productos/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </motion.div>
        </>
    )
}