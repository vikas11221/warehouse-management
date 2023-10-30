import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <div className="navbar-brand">Warehouse Management</div>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item p-3">
              <Link href="/products">Products Management</Link>
            </li>
            <li className="nav-item p-3">
              <Link href="/warehouse">Warehouse Management</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
