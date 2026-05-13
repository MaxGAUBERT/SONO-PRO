





function Home({ products }) {
  return (
    <div>
      <h1>SONO PRO</h1>

      {products.map((product) => (
      <div key={product.id}>

        <img
          src={product.image_url}
          alt={product.name}
          width="200"
        />

        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <button onClick={() => console.log("added !")}>
          Add to cart
        </button>
      </div>
    ))}
    </div>
  );
}

export default Home;