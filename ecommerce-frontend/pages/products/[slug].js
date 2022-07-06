import Head from 'next/head';
import { API_URL, fromImageToUrl } from '../../utils/urls';
import { twoDecimals } from '../../utils/format';

const Product = ({ product }) => {
    return (
        <div>
            <Head>
                {product.attributes.meta_title && 
                    <title>{product.attributes.meta_title}</title>
                }
                {product.attributes.meta_description &&
                    <meta name="description" content={product.attributes.meta_description}/>
                }
            </Head>
            <h3>{product.attributes.name}</h3>
            <img src={fromImageToUrl(product.attributes.image)} />
            <h3>{product.attributes.name}</h3>
            <p>${twoDecimals(product.attributes.price)}</p>
            <p>{product.attributes.content}</p>
        </div>
    )
}



export async function getStaticPaths() {
    // Retrieve all possible paths
        const products_res = await fetch(`http://localhost:1337/api/products?[populate]=deep`);
        const products = await products_res.json();
    // Return them to NextJS context
    return {
        paths: products.data.map(product => ({
            params: { slug: String(product.attributes.slug) }
        })),
        fallback: false //Tells next.js to show 404 if params are not matched
    }
}

export async function getStaticProps({ params }){
    const { slug } = params;
    console.log("slug here", slug, "slug end")
    const product_res = await fetch(`http://localhost:1337/api/products?filters[slug][$eq]=${slug}&[populate]=deep`)
    const found = await product_res.json();
    return {
        props: {
            product: found.data[0] // api response for filters is in array
        }
    }
}


export default Product;