import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { fromImageToUrl, API_URL } from '../utils/urls'
import Link from 'next/link';
import { twoDecimals } from '../utils/format';


export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {products && products.data.map((product) => {
        return (
            <div key={product.id} className={styles.product}>
              <Link href={`/products/${product.attributes.slug}`}>
                <a>
                  <div className={styles.product__Row}>
                    <div className={styles.product__ColImg}>
                      <img src={fromImageToUrl(product.attributes.image)}/>
                    </div>
                    <div className={styles.product__Col}>
                      {product.attributes.name} ${twoDecimals(product.attributes.price)}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/products?[populate]=deep`);

  const products = await res.json();
  return {
    props: { products },
  };
}

// export async function getStaticProps() {
//   // Fetch products
//   const product_res = await fetch(`${API_URL}/products/`)
//   const products = await product_res.json();

//   console.log(products);
//   return {
//     props: {products},
//   }
// }
