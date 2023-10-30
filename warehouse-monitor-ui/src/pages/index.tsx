import DefaultLayout from "../layouts/default.layout";

const Home = () => {
  return (
    <DefaultLayout>
      <div className="container py-4">
        <h1 className="mb-4">Welcome to Warehouse Management App</h1>
        <p>This is the landing page.</p>
      </div>
    </DefaultLayout>
  );
};

export default Home;
