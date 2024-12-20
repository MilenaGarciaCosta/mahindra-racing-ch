import "../css/nav.css"
import "../css/main.css"
import "../script/nav"
import Logo from "../img/Vigil Race logo-prata.svg"
import profileIcon from "../img/profile-icon.png"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'; // Correta importação de useNavigate
import { useEffect, useState } from 'react'; // Correta importação de useEffect e useState

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Formula E', href: '/formulae' },
  { name: 'Fórum', href: '/forum' },
  { name: 'Egame', href: '/egame' },
  { name: 'Loja', href: '/loja' },
]

const userNavigation = [
  { name: 'Meu perfil', href: '/perfil' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav = () => {
  const navigate = useNavigate(); // Inicializando o hook useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se o usuário está logado

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId'); // Verifica se há um usuário no localStorage
    setIsLoggedIn(!!usuarioId); // Atualiza o estado de login
  }, []);

  // Função para lidar com o clique no perfil
  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/perfil'); // Se o usuário estiver logado, redireciona para o perfil
    } else {
      navigate('/login'); // Se não estiver logado, redireciona para o login
    }
  };

  return (
    <>
      <div className="navbarFixed">
        <Disclosure as="nav" className="navBar-color">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 primary-navbar bordaNeon">
            <div className="flex h-16 items-center justify-between">
              <div className="nav-left bordaNeon">
                <img id="logo" alt="Logo" src={Logo} />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}

                  {/* Verificação de login para redirecionamento */}
                  <DisclosureButton as="button" onClick={handleProfileClick}>
                    <img src={profileIcon} className="h-8" alt="Profile" />
                  </DisclosureButton>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 text-right px-2 pb-3 pt-2 sm:px-3 mt-8">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="space-y-1 px-2 text-right">
                {/* Verificação de login para o menu móvel */}
                <DisclosureButton as="button" onClick={handleProfileClick} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                  <img src={profileIcon} className="h-8" alt="Profile" />
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  );
};

export default Nav;
