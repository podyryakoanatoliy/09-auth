import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="Home">
        NoteHub
      </Link>

      <nav className={css.nav} aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" className={css.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/notes/filter/all" className={css.navLink}>
              Notes
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
