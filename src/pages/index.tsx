import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import styles from "./home.module.scss";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

/*
  Existem três formas de realizar chamadas com nextJs:
  Client-side: Chamada comuns com react dentro da page
    * Forma padrão (lib React) de criar requisições via api 
  Server-side: utilizando GetServerSideProps e criando a funcão async getServerSideProps 
    * Irá realizar a requisição via server side de forma simuntânea
  Static:  utilizando GetStaticProps e criando a funcão async getStaticProps
    * Irá realizar a requisição via server side de forma cacheada, sendo definido a forma de cacheamento pelo {revalidate}    
*/

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          Hey, welcome
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IhQsXDx5a3eFAdJ5ezOwphS", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
