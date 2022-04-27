import '../styles/globals.css'
import 'regenerator-runtime/runtime'
import { DotBg, generateRandom } from "../components/dotbg";
import App from "next/app"
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavLink({ href, exact, children,classac, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
      props.className += classac;
  }

  return (
      <Link href={href}>
          <a {...props}>
              {children}
          </a>
      </Link>
  );
}
const Navbar = ()=>{
  const navs = [{title:"Home",Link:"/"},{title:"About Us",Link:"/about"},{title:"Contact Us",Link:"/contact"}]
  return <div className='row px-4  py-2 justify-center md:justify-end items-center space-x-6'>{navs.map((i,e)=> <NavLink key={e} exact href={i.Link} className="text-base font-mono mt-5 pr-6 font-semibold text-white hover:text-teal-300" classac={" text-teal-300"}>{i.title}</NavLink>)}</div>
}

function MyApp({ Component, pageProps,data }) {

  return <DotBg random={data}><Navbar /><Component {...pageProps} /></DotBg>
    
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps, data: generateRandom(), }
}

export default MyApp
